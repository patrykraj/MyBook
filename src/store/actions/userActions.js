import axios from "axios";

import * as actionTypes from "../constants";
import { signUpUrl } from "../../assets/constants";
import { signInUrl } from "../../assets/constants";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: authData.idToken,
      userId: authData.localId,
    },
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    payload: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, loginMode) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = signInUrl;
    if (!loginMode) url = signUpUrl;

    axios
      .post(url + "AIzaSyDJrEk8HJJQUdagjMk7GVK77lEd3WkrDQw", authData)
      .then((res) => {
        // console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);

        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch(authFailure(err.response.data.error.message));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        const data = { idToken: token, localId: userId };
        dispatch(authSuccess(data));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
