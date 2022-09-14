import React, { useEffect } from "react";
import Container from "../UILayout/Container/Container";
import PageLayout from "../UILayout/PageLayout/PageLayout";
import Filters from "./Filters/Filters";
interface HomePageProps {
  isConnected: boolean;
}
const HomePage = ({ isConnected }: HomePageProps) => {
  useEffect(() => {
    console.log(isConnected);
  }, []);

  return (
    <PageLayout>
      <Container>
        <main className="min-h-[calc(100vh-80px)] pt-24">
          <Filters />
          {isConnected ? (
            <h2 className="subtitle">You are connected to MongoDB</h2>
          ) : (
            <h2 className="subtitle">
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )}

          <p className="mt-3 text-2xl">
            Get started by editing{" "}
            <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
              pages/index.tsx
            </code>
          </p>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <a
              href="https://nextjs.org/docs"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
              <p className="mt-4 text-xl">
                Find in-depth information about Next.js features and its API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Learn &rarr;</h3>
              <p className="mt-4 text-xl">
                Learn about Next.js in an interactive course with quizzes!
              </p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Examples &rarr;</h3>
              <p className="mt-4 text-xl">
                Discover and deploy boilerplate example Next.js projects.
              </p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
              <p className="mt-4 text-xl">
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
