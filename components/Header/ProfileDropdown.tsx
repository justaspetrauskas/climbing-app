import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../lib/hooks/useOutsideClick";
import style from "./header.module.css";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
  state: boolean;
  outsideClickHandler: (e: any) => void;
}

const ProfileDropdown = ({
  state = false,
  outsideClickHandler,
}: ProfileDropdownProps) => {
  const dropdownRef = useRef(null);

  useOutsideClick({
    ref: dropdownRef,
    clickHandler: outsideClickHandler,
  });
  return (
    <div className={style["dropdown-container"]} id="user-dropdown">
      <ul
        ref={dropdownRef}
        className={[
          style.dropdownWrapper,
          state === true ? style["dropdownWrapper-avtive"] : "",
        ].join(" ")}
        aria-labelledby="user-menu-button"
      >
        <li className={style.dropdownItem}>
          <Link href="/lines/new">
            <a>Create New route</a>
          </Link>
        </li>
        <li className={style.dropdownItem}>Settings</li>
        <li className={style.dropdownItem}>
          <button onClick={() => signOut()}>Log out</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
