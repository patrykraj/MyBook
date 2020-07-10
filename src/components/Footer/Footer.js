import React from "react";
import classes from "./Footer.module.css";

import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.FooterTop}>
        <div className={classes.LinkWrapper}>
          <span>My github: </span>
          <a
            href="https://github.com/patrykraj/myBook-app"
            className={classes.Link}
            target="blank"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div className={classes.FooterBottom}>
        <p>Made by patrykraj &copy;2020</p>
      </div>
    </footer>
  );
};

export default Footer;
