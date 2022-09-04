import React from "react";
import style from "./section.module.css";

interface SectionRowProps {
  children: React.ReactNode;
}
const SectionRow = ({ children }: SectionRowProps) => {
  return <div className={style.row}>{children}</div>;
};

export default SectionRow;
