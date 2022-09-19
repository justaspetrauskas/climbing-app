import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import style from "./header.module.css";
import Navigation from "./Navigation";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <nav className={style.wrapper}>
      <div className={style.navbar}>
        <div className={style.logo}>
          <span>Urban</span>
          <span>Crush</span>
        </div>
        <Navigation session={session} />
      </div>
    </nav>
  );
};

export default Header;
