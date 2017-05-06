/* eslint-disable no-console, no-shadow */
import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { config, auth } from './config/environment/';
import schema from './appData/schema';
import myMongoCredentials from './myMongoCredentials';
import seeder from './seeder';

const mongoose = require('mongoose');
const jwt = require('express-jwt');

const options = { server: { socketOptions: { keepAlive: 600000, connectTimeoutMS: 60000 } },
  replset: { socketOptions: { keepAlive: 600000, connectTimeoutMS: 60000 } } };
mongoose.Promise = global.Promise;
mongoose.connect(myMongoCredentials, options);
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log(chalk.blue('Connection with MongoLab established.'));
});

if (config.env === 'development') {
  seeder();
  // Launch GraphQL
  const graphql = express();
  graphql.use(expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }));

  graphql.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err instanceof Jwt401Error) {
      console.error('[express-jwt-error]', req.cookies.id_token);
      // `clearCookie`, otherwise user can't use web-app until cookie expires
      res.clearCookie('id_token');
    } else {
      next(err);
    }
  });

  graphql.use(passport.initialize());

  // authentication
  graphql.enable('trust proxy');
  graphql.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );
  graphql.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
  );

  // I should pass jwt here somewhere
  graphql.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema,
    context: {
      mongodb: conn
    }
  }));
  graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)));
  graphql.use(bodyParser.json({ type: '*/*' }));
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const productionServer = express();

  productionServer.use(expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }));

  productionServer.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err instanceof Jwt401Error) {
      console.error('[express-jwt-error]', req.cookies.id_token);
      // `clearCookie`, otherwise user can't use web-app until cookie expires
      res.clearCookie('id_token');
    } else {
      next(err);
    }
  });

  productionServer.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );
  productionServer.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
  );

  productionServer.use(historyApiFallback());
  productionServer.use('/', express.static(path.join(__dirname, '../build')));
  productionServer.use('/graphql', graphQLHTTP({ schema }));
  productionServer.use(bodyParser.json({ type: '*/*' }));
  productionServer.listen(config.port, () => console.log(chalk.green(`App is listening on port ${config.port}`)));
}
