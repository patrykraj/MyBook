import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./Toolbar.module.css";

const Toolbar = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.NavWrapper}>
        <div className="logo">LOGO</div>
        <nav className={classes.Nav}>
          <NavigationItems />
        </nav>
      </div>
    </header>
  );
};

export default Toolbar;
