import React, { useEffect, useState } from "react";

import MainContainer from "../../components/UILayout/MainContainer/MainContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import SignInForm from "../../components/FormElements/SignInForm";

const NewUser = () => {
  return (
    <MainContainer id={"auth-page"}>
      <Sidebar />
      <SignInForm />
    </MainContainer>
  );
};

export default NewUser;
