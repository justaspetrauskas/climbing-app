import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRouteDescription } from "../../../redux/slices/newRouteReducer";
import { setValidateStep } from "../../../redux/slices/routeComposerReducer";
import {
  selectNewRouteState,
  selectRouteComposerState,
} from "../../../redux/store";

import Submit from "../../UILayout/Submit/Submit";
import FormLayout from "../FormLayout";
import style from "./routeNotes.module.css";
import { useRouter } from "next/router";

const RouteNotes = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { steps, activeStep, currentStepIndex } = useSelector(
    selectRouteComposerState
  );
  const route = useSelector(selectNewRouteState);
  const dispatch = useDispatch();

  const [uploadStatus, setUploadStatus] = useState<
    "ready" | "uploading" | "completed"
  >("ready");

  // useEffect(() => {
  //   let objectEmpty = Object.values(route).some(
  //     (v) => v === null || v === "" || v.length < 1
  //   );
  //   if (objectEmpty) {
  //     dispatch(setValidateStep(false));
  //   } else {
  //     dispatch(setValidateStep(true));
  //     setUploadeStatus("ready");
  //   }
  // }, [route]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist();
    const { name, value } = e.target;
    dispatch(setRouteDescription(value));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist();
    const { user } = data!;
    // console.log("Route info", route);
    // console.log("user", user);

    const urlToFile = async (url: string, filename: string, mimeType: any) => {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename, { type: mimeType });
    };

    const file = await urlToFile(
      route.imageUrl,
      `${route.title}.jpg`,
      "image/jpg"
    );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rvnvud2z");

    try {
      // set state to loading()
      setUploadStatus("uploading");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_ClOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        console.log("image Uploaded");
        const uploadImage = await res.json();
        const uploadData = { ...route };
        uploadData.imageUrl = uploadImage.url;
        console.log("data with image", uploadData);
        const response = await fetch("/api/lines/new", {
          method: "POST",
          body: JSON.stringify(uploadData),
        });
        if (response.ok) {
          const reponseJson = await response.json();
          console.log(reponseJson);
          // setState(completed)
          setUploadStatus("completed");
          router.push("/");
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <FormLayout>
      <div className="flex flex-col justify-center gap-y-8 h-full">
        <span className="text-xl font-semibold text-center">
          Add any additional notes about the problem
        </span>
        <textarea
          className={style.formInput}
          placeholder={"Try to come up with descriptive name"}
          id={`routeDescription`}
          rows={10}
          name={"description"}
          autoFocus
          value={route.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <span className="mx-auto">
          <Submit
            label={uploadStatus === "completed" ? "Uploaded" : "Upload!"}
            uploadStatus={uploadStatus}
            clickHandler={handleSubmit}
          />
        </span>
      </div>
    </FormLayout>
  );
};

export default RouteNotes;
