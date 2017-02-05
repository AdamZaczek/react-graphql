import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

// import ViewerQuery from './ViewerQuery';

// this might not belong here
import StoriesQuery from './StoriesQuery';
import AppContainer from '../components/App/AppContainer';
// import FeatureContainer from '../components/Feature/FeatureContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import IndexContainer from '../components/Index/IndexContainer';

// export default (
//   <Route path='/' component={AppContainer} queries={ViewerQuery}>
//     <IndexRoute component={FeatureContainer} queries={ViewerQuery} />
//     <Route path='/signup' component={SignupComponent} />
//     <Route path='/login' component={LoginComponent} />
//     <Redirect from='*' to='/' />
//   </Route>
// );

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={IndexContainer} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Redirect from='*' to='/' />
  </Route>
);
