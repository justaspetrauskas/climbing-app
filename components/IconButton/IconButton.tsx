import { BuiltInProviderType, Provider } from "next-auth/providers";
import Link from "next/link";
import React, { useEffect } from "react";

import { FcGoogle } from "react-icons/fc";
import style from "../../styles/iconButton.module.css";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const IconButton = ({}) => {
  // useEffect(() => {
  //   const getProviders = async () => {
  //     let providers = await getProviders();
  //     console.log(providers);
  //   };
  //   getProviders();
  // }, []);

  return (
    <button className={style.IconButton} onClick={() => signIn("google")}>
      <FcGoogle size={24} />
    </button>
  );
};

export default IconButton;
