import React from "react";

import MainHeader from "../../MainHeader/MainHeader";

import classes from "./ContentWrapper.module.css";

const ContentWrapper = (props) => {
  return (
    <div className={props.container && classes.Container}>
      <MainHeader center={props.center}>{props.header}</MainHeader>
      {props.children}
    </div>
  );
};

export default ContentWrapper;
