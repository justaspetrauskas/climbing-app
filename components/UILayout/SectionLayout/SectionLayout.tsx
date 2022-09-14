import React from "react";
import style from "./section.module.css";

interface SectionLayoutProps {
  children: React.ReactNode;
}

const SectionLayout = ({ children }: SectionLayoutProps) => {
  return (
    <section className={style.wrapper}>
      <div className={style.container}>{children}</div>
    </section>
  );
};

export default SectionLayout;
