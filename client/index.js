import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

// import Route from './routes/Route';
// import UsersRoute from './routes/StoriesQuery';


const rootNode = document.createElement('div');
document.body.appendChild(rootNode);


// ReactDOM.render(
//   <Router history={browserHistory} routes={UsersRoute} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />,
//   rootNode
// );
ReactDOM.render(
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />,
  rootNode
);
