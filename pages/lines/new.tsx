import React from "react";
import { useSelector } from "react-redux";
import BodyLayout from "../../components/BodyLayout/BodyLayout";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageLayout from "../../components/PageLayout/PageLayout";
import RouteComposer from "../../components/RouteComposer/RouteComposer";
import { selectNewRouteState } from "../../redux/store";

const NewLine = () => {
  const routeState = useSelector(selectNewRouteState);
  return (
    <PageLayout>
      <BodyLayout>
        <ImageUpload />
        {routeState.imagePreview && <RouteComposer />}
      </BodyLayout>
    </PageLayout>
  );
};

export default NewLine;
