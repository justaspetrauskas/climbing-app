import type { GetServerSideProps, NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import clientPromise from "../lib/dbConnect";
import Image from "next/image";
import Google from "next-auth/providers/google";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import HomePage from "../components/Homepage/HomePage";
import { Session } from "next-auth";

interface HomeProps {
  isConnected: boolean;
  lines: any[];
}

const Home = ({ isConnected, lines }: HomeProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(lines);
  }, [lines]);

  useEffect(() => {
    lines && setLoading(false);
  }, [lines]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Header />
        <HomePage isConnected={isConnected} />
        <footer className="flex h-24 w-full items-center justify-center border-t">
          <a
            className="flex items-center justify-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </footer>
      </div>
    );
  }

  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("http://localhost:3000/api/lines");
  if (response.ok) {
    const lines = await response.json();
    return {
      props: {
        lines,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }
  // if (serverSession) {

  //   // get /user/me
  //   const response = await fetch("http://localhost:3000/api/user/me");
  // }

  // if (!serverSession) {
  //   return {
  //     redirect: {
  //       destination: "/session/new?callbackUrl=http://localhost:3000/",
  //       permanent: false,
  //     },
  //   };
  // }

  // return {
  //   props: {
  //     serverSession,
  //   }, // will be passed to the page component as props
  // };
};

export default Home;
