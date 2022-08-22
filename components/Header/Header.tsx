import React from "react";
import style from "../../styles/header.module.css";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className={style.wrapper}>
      <div className={style.navbar}>
        <div className={style.logo}>
          <span>Urban</span>
          <span>Crush</span>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
