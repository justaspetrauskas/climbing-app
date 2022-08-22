import React from "react";
import style from "../../styles/mainContainer.module.css";

interface MainContainerProps {
  children: React.ReactNode;
  id: string;
}
const MainContainer = ({ children, id }: MainContainerProps) => {
  return (
    <section className={style["main-container"]} id={id}>
      {children}
    </section>
  );
};

export default MainContainer;
