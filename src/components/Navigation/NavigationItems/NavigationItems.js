import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.module.css";

const NavigationItems = () => {
  const navItems = [
    { to: "/", exact: true, name: "Search" },
    { to: "/saved", name: "My books" },
    { to: "/login", name: "Login" },
    // { to: "/", exact: true, name: "Logout" },
  ];

  const links = navItems.map((item) => (
    <li key={item.name} className={classes.ListElement}>
      <NavLink
        exact={item.exact}
        to={item.to}
        className={classes.Link}
        activeClassName={classes.ActiveLink}
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return <ul className={classes.List}>{links}</ul>;
};

export default NavigationItems;
