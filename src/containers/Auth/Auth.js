import React, { useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/userActions";

import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import MainHeader from "../../components/MainHeader/MainHeader";

import classes from "./Auth.module.css";

const Auth = (props) => {
  const [loginMode, setLoginMode] = useState(true);

  const [password, setPassword] = useState("");
  const [xpassword, setxPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleMode = (e) => {
    e.preventDefault();
    setPassword("");
    setxPassword("");
    setEmail("");
    setLoginMode(!loginMode);
  };

  const handleSendReq = (e) => {
    e.preventDefault();
    props.onAuth(email, password, loginMode);
  };

  let content;
  if (!loginMode) {
    content = (
      <>
        <MainHeader>Sign Up</MainHeader>
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          type="password"
          placeholder="repeat password"
          onChange={(e) => setxPassword(e.target.value)}
          value={xpassword}
        />
      </>
    );
  } else {
    content = (
      <>
        <MainHeader>Login</MainHeader>
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </>
    );
  }

  return (
    <div className={classes.Login}>
      <form className={classes.Form}>
        {content}
        <Button click={handleSendReq}>{loginMode ? "Login" : "Sign up"}</Button>
      </form>
      <Button click={handleMode} switch>
        {loginMode ? "Switch to sign up" : "Switch to login"}
      </Button>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {};
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login, email, password) =>
      dispatch(actions.auth(login, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
