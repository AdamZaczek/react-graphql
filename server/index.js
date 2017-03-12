/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import passport from 'passport';
import webpackConfig from '../webpack.config';
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

  // Launch Relay by using webpack.config.js
  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/graphql': `http://localhost:${config.graphql.port}`
    },
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });

  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const relayServer = express();

  relayServer.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );
  relayServer.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
  );

  relayServer.use(historyApiFallback());
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/graphql', graphQLHTTP({ schema }));
  relayServer.use(bodyParser.json({ type: '*/*' }));
  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
}
