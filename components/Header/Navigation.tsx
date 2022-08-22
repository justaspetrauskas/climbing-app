import React, { RefObject, useRef, useState } from "react";
import style from "../../styles/header.module.css";

// icons
import { RiCompassDiscoverLine } from "react-icons/ri";
import { RiSearchEyeLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import Dropdown from "./ProfileDropdown";
import { profile } from "console";
import Link from "next/link";
const navigation = ["lines around", "discover lines", "profile"];

const Navigation = () => {
  const profileRef = useRef(null);
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const handleOpenDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };
  const outsideClick = (e: any) => {
    if (!e.path.includes(profileRef.current)) {
      setDropDownOpen(false);
    }
  };

  return (
    <ul className={style.navItems}>
      <li className={style.navItem}>
        <a className={style.navLink}>
          <RiCompassDiscoverLine size={20} />
          <span>lines around</span>
        </a>
      </li>
      <li className={style.navItem}>
        <a className={style.navLink}>
          <RiSearchEyeLine size={20} /> <span>discover lines</span>
        </a>
      </li>
      <li
        className={style.navItem}
        onClick={handleOpenDropdown}
        ref={profileRef}
      >
        <a className={style.navLink}>
          <CgProfile size={20} /> <span>profile</span>
        </a>

        <Dropdown
          state={isDropDownOpen}
          outsideClickHandler={(e) => outsideClick(e)}
        />
      </li>
    </ul>
  );
};

export default Navigation;
