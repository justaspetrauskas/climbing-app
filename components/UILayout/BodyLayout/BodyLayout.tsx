import React from "react";
import style from "../../styles/body.module.css";

interface BodyLayoutProps {
  children: React.ReactNode;
}

const BodyLayout = ({ children }: BodyLayoutProps) => {
  return <main className={style.wrapper}>{children}</main>;
};

export default BodyLayout;
