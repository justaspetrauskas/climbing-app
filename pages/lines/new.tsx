import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GetServerSideProps } from "next";

import { useDispatch, useSelector } from "react-redux";
import BodyLayout from "../../components/BodyLayout/BodyLayout";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageLayout from "../../components/UILayout/PageLayout/PageLayout";

import { selectNewRouteState } from "../../redux/store";
import { getSession, useSession } from "next-auth/react";
import SectionLayout from "../../components/UILayout/SectionLayout/SectionLayout";
import SectionHeader from "../../components/UILayout/SectionLayout/SectionHeader";
import SectionRow from "../../components/UILayout/SectionLayout/SectionRow";
import RouteComposer from "../../components/RouteComposer/RouteComposer";
import { setAuthor } from "../../redux/slices/newRouteReducer";

// const RouteCanvas = dynamic(
//   () => import("../../components/RouteCanvas/RouteCanvas"),
//   {
//     ssr: false,
//   }
// );

const NewLine = () => {
  const { status, data } = useSession({ required: true });

  const routeState = useSelector(selectNewRouteState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data!.user) {
      // @ts-ignore
      dispatch(setAuthor(data!.user.id));
    }
  }, [data]);
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
