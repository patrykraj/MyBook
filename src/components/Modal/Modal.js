import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
  let content = (
    <>
      <Backdrop cancel={props.cancelModal} />
      <div className={classes.Modal}>
        <div className={classes.ModalTop}>
          <span>Notification</span>
          <button
            onClick={props.cancelModal}
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "2.5rem",
              color: "#ea3c53",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        <div className={classes.ModalBottom}>
          <p>{props.show}</p>
        </div>
      </div>
    </>
  );

  if (!props.show) content = null;

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default React.memo(Modal);
