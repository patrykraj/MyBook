import React from "react";

const ContentWrapper = (props) => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {props.children}
    </div>
  );
};

export default ContentWrapper;
