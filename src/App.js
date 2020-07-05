import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Search from "./containers/Search/Search";
import Saved from "./containers/Saved/Saved";
import Auth from "./containers/Auth/Auth";

function App() {
  let routes = (
    <Switch>
      <Route path="/saved" component={Saved} />
      <Route path="/login" component={Auth} />
      <Route path="/" exact component={Search} />
      <Redirect to="/" />
    </Switch>
  );

  // if (!props.logged) {
  //   routes = (
  //     <Switch>
  //       <Route to="/login" component={Auth} />
  //       <Redirect to="/login" component={Auth} />
  //     </Switch>
  //   );
  // }

  return (
    <Layout>
      <Switch>{routes}</Switch>
    </Layout>
  );
}

export default App;
