import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import Button from "../formElements/Button";
import LoadingSpinner from "../Loader/LoadingSpinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

import classes from "./Modal.module.css";

const Modal = (props) => {
  let content = (
    <>
      <Backdrop cancel={props.cancelModal} />
      <div className={classes.Modal}>
        {props.loading ? (
          <LoadingSpinner modal />
        ) : (
          <>
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
              {props.delete && (
                <>
                  <Button click={() => props.onDeleteBook(props.deleteId)}>
                    Confirm
                  </Button>
                  <Button click={props.cancelModal}>Cancel</Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  if (!props.show) content = null;

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => {
  return {
    deleteId: state.reducer.deleteId,
    loading: state.reducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteBook: (payload) => dispatch(actions.deleteBook(payload)),
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Modal));
