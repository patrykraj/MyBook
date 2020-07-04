import React from "react";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={classes.Loader}>
        <div className={classes.Page}></div>
        <div className={classes.BottomLeft}></div>
        <div className={classes.BottomRight}></div>
      </div>
    </>
  );
};

export default Loader;
