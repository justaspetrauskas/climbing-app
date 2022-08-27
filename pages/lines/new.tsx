import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useSelector } from "react-redux";
import BodyLayout from "../../components/BodyLayout/BodyLayout";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageLayout from "../../components/PageLayout/PageLayout";
import RouteLocation from "../../components/RouteLocation/RouteLocation";
import { selectNewRouteState } from "../../redux/store";

const RouteCanvas = dynamic(
  () => import("../../components/RouteCanvas/RouteCanvas"),
  {
    suspense: true,
    ssr: false,
  }
);

const NewLine = () => {
  const routeState = useSelector(selectNewRouteState);
  return (
    <PageLayout>
      <BodyLayout>
        <ImageUpload />
        <RouteLocation />
        {routeState.imageUrl && (
          <Suspense fallback={`Loading...`}>
            <RouteCanvas imageUrl={routeState.imageUrl} />
          </Suspense>
        )}
      </BodyLayout>
    </PageLayout>
  );
};

export default NewLine;
