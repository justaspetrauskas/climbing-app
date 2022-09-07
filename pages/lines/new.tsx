import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GetServerSideProps } from "next";

import { useSelector } from "react-redux";
import BodyLayout from "../../components/BodyLayout/BodyLayout";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageLayout from "../../components/PageLayout/PageLayout";
import RouteLocation from "../../components/RouteComposer/RouteLocation/RouteLocationEl";
import { selectNewRouteState } from "../../redux/store";
import { getSession, useSession } from "next-auth/react";
import SectionLayout from "../../components/SectionLayout/SectionLayout";
import SectionHeader from "../../components/SectionLayout/SectionHeader";
import SectionRow from "../../components/SectionLayout/SectionRow";
import RouteComposer from "../../components/RouteComposer/RouteComposer";

const RouteCanvas = dynamic(
  () => import("../../components/RouteCanvas/RouteCanvas"),
  {
    ssr: false,
  }
);

const NewLine = () => {
  const { status } = useSession({ required: true });
  const routeState = useSelector(selectNewRouteState);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    <PageLayout>
      <SectionLayout>
        <SectionHeader>
          <h2>Create a route</h2>
          <p>Create your route and share with others</p>
        </SectionHeader>

        <RouteComposer />

        {/* <ImageUpload /> */}
        {/* <RouteLocation /> */}
        {/* {routeState.imageUrl && <RouteCanvas imageUrl={routeState.imageUrl} />} */}
      </SectionLayout>
    </PageLayout>
  );
};

export default NewLine;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/session/new?callbackUrl=http://localhost:3000/lines/new",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
};
