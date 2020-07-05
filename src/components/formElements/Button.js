import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${props.switch ? classes.Switch : classes.Btn} ${
        props.delete ? classes.Delete : ""
      }`}
      onClick={props.click}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
