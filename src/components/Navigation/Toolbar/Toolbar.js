import React from "react";
import { Link } from "react-router-dom";

import Form from "../../formElements/Form";
import NavigationItems from "../NavigationItems/NavigationItems";
import { GoBook } from "react-icons/go";

import classes from "./Toolbar.module.css";

const Toolbar = () => {
  return (
    <div className={classes.ToolbarContainer}>
      <div className={classes.NavWrapper}>
        <div className={classes.Logo}>
          <Link to="/" className={classes.LogoLink}>
            <GoBook />
          </Link>
        </div>
        <nav className={classes.Nav}>
          <NavigationItems />
        </nav>
      </div>
      <Form />
    </div>
  );
};

export default Toolbar;
