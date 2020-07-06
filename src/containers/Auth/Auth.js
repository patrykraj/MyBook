import React, { useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/userActions";

import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import MainHeader from "../../components/MainHeader/MainHeader";

import classes from "./Auth.module.css";

const Auth = ({ onAuth, error, loading }) => {
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
    onAuth(email, password, loginMode);
  };

  let content;
  if (!loginMode) {
    content = (
      <>
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
      {loginMode ? (
        <MainHeader>Login</MainHeader>
      ) : (
        <MainHeader>Sign Up</MainHeader>
      )}
      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          Error: {error}
        </p>
      )}
      <form className={classes.Form}>
        {content}
        <Button click={handleSendReq} disabled={loading}>
          {loading ? <LoadingSpinner /> : loginMode ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button click={handleMode} switch>
        {loginMode ? "Don't have an account?" : "Switch to login"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login, email, password) =>
      dispatch(actions.auth(login, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
