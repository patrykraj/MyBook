import React from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <header className={classes.Header}>
        <Toolbar />
      </header>
      <main className={classes.Main}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
