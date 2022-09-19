import React, { RefObject, useEffect, useRef, useState } from "react";
import style from "./header.module.css";

// icons
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";

import Dropdown from "./ProfileDropdown";
import { profile } from "console";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
const navigation = ["lines around", "discover lines", "profile"];

interface NavigationProps {
  session: Session | null;
}

interface User extends Session {
  avatar: string;
}

const Navigation = ({ session }: NavigationProps) => {
  const profileRef = useRef(null);
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    if (session) {
      console.log(session.user);
    }
  }, [session]);

  const handleOpenDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };
  const outsideClick = (e: any) => {
    if (!e.path.includes(profileRef.current)) {
      setDropDownOpen(false);
    }
  };

  return (
    <div className={style["nav-container"]}>
      <button
        className={style["nav-button"]}
        onClick={handleOpenDropdown}
        ref={profileRef}
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        {session && <span>Hello, {session.user.name}</span>}

        {/* {session ? (
            <img src={session.user!.avatar} alt="Profile image" />
          ) : (
            <CgProfile />
          )} */}
        <i>
          <FaHamburger size={24} />
        </i>
      </button>

      <Dropdown
        state={isDropDownOpen}
        outsideClickHandler={(e) => outsideClick(e)}
      />
    </div>
  );
};

export default Navigation;
