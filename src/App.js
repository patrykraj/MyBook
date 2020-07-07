import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Search from "./containers/Search/Search";
import Saved from "./containers/Saved/Saved";
import Auth from "./containers/Auth/Auth";

import { connect } from "react-redux";

function App({ token }) {
  let routes = (
    <Switch>
      <Route path="/saved" component={Saved} />
      <Route path="/" exact component={Search} />
      <Redirect to="/" />
    </Switch>
  );

  if (!token) {
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
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(App);
