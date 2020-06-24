import React from "react";

import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <h1 className={props.center ? classes.Center : classes.Top}>
      {props.children}
    </h1>
  );
};

export default MainHeader;
