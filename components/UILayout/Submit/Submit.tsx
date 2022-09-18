import React from "react";
import style from "./submit.module.css";
interface SubmitProps {
  children: React.ReactNode;
}
const Submit = ({ children }: SubmitProps) => {
  return <button className={`${style["submit-btn"]}`}>{children}</button>;
};

export default Submit;
