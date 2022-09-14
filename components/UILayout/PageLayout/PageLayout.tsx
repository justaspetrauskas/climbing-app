import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import style from "./pageLayout.module.css";
import Header from "../../Header/Header";

interface PageLayoutProp {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProp) => {
  const router = useRouter();

  //   make into a hook
  useEffect(() => {
    // depending on the route give a specific suffix
    // maybe slug

    console.log(router.pathname.split("/"));
  }, []);

  return (
    <div className={style.wrapper}>
      <Head>
        <title>Urban Crush--{router.pathname}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default PageLayout;
