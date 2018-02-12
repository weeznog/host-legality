import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as actions from '../actions';

import Header from './Header';
import Landing from '../screens/Landing';
import Properties from '../screens/Properties';
import GetStarted from '../screens/GetStarted';
import PaymentPlan from '../screens/PaymentPlan';

// AUTH
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetPassword from '../screens/ResetPassword';
import ForgotPassword from '../screens/ForgotPassword';
import requireAuth from './auth/require_auth';

class App extends Component {
  // preferred location for intial ajax request w/ new react
  // componentDidMount() {
  componentWillMount() {
    console.log('fetch user');
    this.props.fetchUser(); // check auth...
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/get-started" component={GetStarted} />
            <Route path="/protected" component={requireAuth(Protected)} />
            <Route path="/properties" component={requireAuth(Properties)} />
            <Route path="/paymentPlan" component={requireAuth(PaymentPlan)} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// If no route is found default here...
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class Protected extends Component {
  render() {
    return (
      <div>
        <h3>Protected Route here...</h3>
      </div>
    );
  }
}

export default connect(null, actions)(App);
