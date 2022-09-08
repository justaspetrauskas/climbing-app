import React from "react";
import style from "./routeComposer.module.css";

interface FormLayoutProps {
  children: React.ReactNode;
}
const FormLayout = ({ children }: FormLayoutProps) => {
  return <div className={style["form-wrapper"]}>{children}</div>;
};

export default FormLayout;
