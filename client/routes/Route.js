import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

// import ViewerQuery from './ViewerQuery';

// this might not belong here so commented for now
//  import StoriesQuery from './StoriesQuery';

import AppContainer from '../components/App/AppContainer';
// import FeatureContainer from '../components/Feature/FeatureContainer';
import SignUpContainerComponent from '../components/SignUp/SignUpContainerComponent';
import LogInContainerComponent from '../components/Login/LogInContainerComponent';
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
    <Route path='/signup' component={SignUpContainerComponent} />
    <Route path='/login' component={LogInContainerComponent} />
    <Redirect from='*' to='/' />
  </Route>
);
