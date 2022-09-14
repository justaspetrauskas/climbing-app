import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import clientPromise from "../lib/dbConnect";
import Image from "next/image";
import Google from "next-auth/providers/google";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import HomePage from "../components/Homepage/HomePage";

interface HomeProps {
  isConnected: boolean;
}

const Home = ({ isConnected }: HomeProps) => {
  const router = useRouter();
  // const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      !session ? signIn() : setLoading(false);

      console.log(session);
    };

    securePage();
  }, []);

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

export async function getServerSideProps() {
  try {
    await clientPromise;
    console.log("db connected to server");
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default Home;
