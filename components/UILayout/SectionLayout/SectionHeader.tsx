import React from "react";
import style from "./section.module.css";

interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
  return <header className={style["section-header"]}>{children}</header>;
};

export default SectionHeader;
