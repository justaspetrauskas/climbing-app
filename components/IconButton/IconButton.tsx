import { BuiltInProviderType, Provider } from "next-auth/providers";
import Router from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import style from "./iconButton.module.css";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface IconButtonProps {
  type: "google" | "custom";
  children?: React.ReactNode;
  clickHandler?: (e?: any) => void;
}

const IconButton = ({
  type = "google",
  children,
  clickHandler,
}: IconButtonProps) => {
  const [redirectUrl, setRedirectUrl] = useState("http://location:3000");

  useEffect(() => {
    const callbackUrl = Router.query!.callbackUrl as string;
    if (callbackUrl) setRedirectUrl(callbackUrl);
  });

  // useEffect(() => {
  //   const getProviders = async () => {
  //     let providers = await getProviders();
  //     console.log(providers);
  //   };
  //   getProviders();
  // }, []);
  if (type === "google") {
    return (
      <button
        className={style.IconButton}
        onClick={() => signIn("google", { callbackUrl: redirectUrl })}
      >
        <FcGoogle size={24} />
      </button>
    );
  } else {
    return (
      <button
        className={style.IconButton}
        title="locate me"
        onClick={clickHandler}
      >
        {children}
      </button>
    );
  }
};

export default IconButton;
