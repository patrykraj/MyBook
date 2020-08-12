import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.module.css";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/userActions";
import { toast } from "react-toastify";

export const NavigationItems = ({ token, onLogout }) => {
  let navItems = [
    { to: "/", exact: true, name: "Search" },
    { to: "/saved", name: "My books" },
    { to: "/", exact: true, name: "Logout" },
  ];

  if (!token) {
    navItems = [
      { to: "/", exact: true, name: "Search" },
      { to: "/login", name: "Login" },
    ];
  }

  const handleLogout = (item) => {
    if (item.name.toLowerCase() === "logout") {
      onLogout();
      toast.info("You've been logged out.");
    }
  };

  const links = navItems.map((item) => (
    <li
      key={item.name}
      className={classes.ListElement}
      onClick={() => handleLogout(item)}
    >
      <NavLink
        exact={item.exact}
        to={item.to}
        className={classes.Link}
        activeClassName={
          item.name.toLowerCase() === "logout" ? "" : classes.ActiveLink
        }
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return <ul className={classes.List}>{links}</ul>;
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
