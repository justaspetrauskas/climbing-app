import React from "react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import SignUpForm from "../../components/FormElements/SignUpForm";

const NewUser = () => {
  return (
    <MainContainer id={"auth-page"}>
      <Sidebar />
      <SignUpForm />
    </MainContainer>
  );
};

export default NewUser;
