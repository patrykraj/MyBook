import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={classes.LoadingSpinner}
      style={{
        padding: props.padding ? "10px 0" : null,
      }}
    >
      <div className={classes.Wrapper}></div>
    </div>
  );
};

export default LoadingSpinner;
