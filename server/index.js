/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import webpackConfig from '../webpack.config';
import config from './config/environment';
import schema from './appData/schema';
import myMongoCredentials from './myMongoCredentials';
import seeder from './seeder';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('express-jwt');

// prolly got to replace it for env in config s, also gotta do npm un dotenv
dotenv.load();

const authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// This will be usefull in the future
// mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

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
  graphql.use('/', authenticate, graphQLHTTP({
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
  relayServer.use(historyApiFallback());
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/graphql', authenticate, graphQLHTTP({ schema }));
  relayServer.use(bodyParser.json({ type: '*/*' }));
  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
}
