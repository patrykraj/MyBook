import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Search from "./containers/Search/Search";
import Saved from "./containers/Saved/Saved";
import Auth from "./containers/Auth/Auth";

import { connect } from "react-redux";
import * as actions from "./store/actions";

function App({ isAuth, onTryAutoSignUp }) {
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/saved" component={Saved} />
      <Route path="/" exact component={Search} />
      <Redirect to="/" />
    </Switch>
  );

  if (!isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/login" component={Auth} />
        <Redirect to="/login" component={Auth} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Switch>{routes}</Switch>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
