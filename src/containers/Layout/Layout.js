import React from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Toolbar />
      <main className={classes.Main}>{props.children}</main>
    </>
  );
};

export default Layout;
