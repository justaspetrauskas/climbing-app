import Image from "next/image";
import React from "react";

import headerImg from "../../public/images/rolf-blicher-godfrey.jpg";
import style from "./sidebar.module.css";
import SignUpForm from "../FormElements/SignUpForm";

const Sidebar = () => {
  return (
    <div className={style.wrapper}>
      <div className={style["sidebar-content"]}>
        <header className={style["sidebar-header"]}>
          <h1>Prepare to brush</h1>
        </header>
        <div className={style["sidebar-image-container"]}>
          <Image
            src={headerImg}
            alt="Picture of a Climber"
            // width="100%"
            // height="100%"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
