/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import mongoose from 'mongoose';
// import { MongoClient } from 'mongodb';
import webpackConfig from '../webpack.config';
import config from './config/environment';
import schema from './appData/schema';

// const mongodb = MongoClient.connect(
//   'mongodb://localhost:27017/db'
// );


// Ugliest piece of code ever due to mongodb bug. More here: https://github.com/christkv/mongodb-core/issues/153
// Doesnt work still, prolly need to downgrade mongoose
mongoose.connect('mongodb://localhost/myapp',
  {
    server: {
      socketOptions: {
        socketTimeoutMS: 0,
        connectTimeoutMS: 600
      }
    }
  },
  (err) => {
    if (err) {
      console.dir(err); // failed to connect
    } else {
      console.log('Connected to MongoDB!');
    }
  }
);

if (config.env === 'development') {
  // Launch GraphQL
  const graphql = express();
  graphql.use('/', graphQLHTTP(async () => ({
    graphiql: true,
    pretty: true,
    schema,
    // context: {
    //   mongodb: await mongodb
    // }
  })));
  graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)));

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
  relayServer.use('/graphql', graphQLHTTP({ schema }));
  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
}
