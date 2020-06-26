import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.Btn} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default Button;
