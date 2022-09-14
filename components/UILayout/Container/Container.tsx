import React from "react";
import style from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
