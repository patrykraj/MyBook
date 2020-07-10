import React, { useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import MainHeader from "../../components/MainHeader/MainHeader";

import classes from "./Auth.module.css";

const Auth = ({ onAuth, error, loading }) => {
  const [loginMode, setLoginMode] = useState(true);
  const [invalidData, setInvalidData] = useState([]);

  const initialFormValues = {
    email: {
      elementType: "email",
      placeholder: "Your E-Mail",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      message: "Invalid email.",
    },

    password: {
      elementType: "password",
      placeholder: "Password",
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      message: "Password at least 6 characters.",
    },

    repeatPassword: {
      signUpMode: true,
      elementType: "password",
      placeholder: "Repeat password",
      value: "",
      validation: {
        required: true,
        minLength: 6,
        repeat: true,
      },
      valid: false,
      message: "Passwords must be the same.",
    },
  };

  const [formConfig, setFormConfig] = useState(initialFormValues);

  const handleMode = (e) => {
    e.preventDefault();

    setLoginMode(!loginMode);
    setFormConfig(initialFormValues);
    setInvalidData([]);
  };

  const handleSendReq = (e) => {
    e.preventDefault();

    const errors = [];

    for (const el in formConfig) {
      if (formConfig[el].signUpMode && loginMode) continue;
      if (!formConfig[el].valid) errors.push(formConfig[el].message);
    }

    setInvalidData(errors);

    if (!errors.length)
      onAuth(formConfig.email.value, formConfig.password.value, loginMode);
  };

  const checkValidity = (val, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = val.trim() !== "";
    }

    if (rules.minLength) {
      isValid = val.trim().length >= rules.minLength;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(val);
    }

    if (rules.repeat) {
      isValid = formConfig.password.value === val;
    }

    return isValid;
  };

  const handleSetValue = (e, element) => {
    const formValues = {
      ...formConfig,
    };

    formValues[element.id].value = e.target.value;
    formValues[element.id].valid = checkValidity(
      formValues[element.id].value,
      formValues[element.id].validation
    );

    if (loginMode) formValues.repeatPassword.valid = true;

    setFormConfig(formValues);
  };

  let inputs = [];

  for (const el in formConfig) {
    const element = {
      id: el,
      config: formConfig[el],
    };
    inputs.push(element);
  }

  let content;

  content = inputs.map((el) => {
    if (loginMode && el.config.signUpMode) return null;
    else
      return (
        <Input
          key={el.id}
          type={el.config.elementType}
          placeholder={el.config.placeholder}
          value={el.config.value}
          onChange={(e) => handleSetValue(e, el)}
        />
      );
  });

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
      {invalidData.length ? (
        <ul className={classes.Invalid}>
          <p>Invalid data:</p>
          {invalidData.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      ) : null}
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
