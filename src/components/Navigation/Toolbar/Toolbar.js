import React from "react";

import Form from "../../formElements/Form";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./Toolbar.module.css";

const Toolbar = () => {
  return (
    <div className={classes.ToolbarContainer}>
      <div className={classes.NavWrapper}>
        <div className="logo">LOGO</div>
        <nav className={classes.Nav}>
          <NavigationItems />
        </nav>
      </div>
      <Form />
    </div>
  );
};

export default Toolbar;
