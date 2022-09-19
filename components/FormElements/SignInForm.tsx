import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

import style from "../../styles/signUpForm.module.css";
import IconButton from "../IconButton/IconButton";
import InputField from "./InputField";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";

export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
}

const validation = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm,
};

const SignInForm = () => {
  // const [providers, setProviders] = useState<Record<
  //   LiteralUnion<BuiltInProviderType, string>,
  //   ClientSafeProvider
  // > | null>();

  // useEffect(() => {
  //   const setTheProviders = async () => {
  //     const setupProviders = await getProviders();
  //     console.log(setupProviders);
  //     setProviders(setupProviders);
  //   };
  //   setTheProviders();
  // }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // "onChange"
  });

  const onSubmit = async (data: Record<string, any>) => {
    const { email, password } = data;
    console.log(data);
    // hash the password
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
    });
  };

  return (
    <div className={style.wrapper}>
      <nav className={style.formNav}>
        <p>Don't have an account?</p>
        <Link href="/signup/new">
          <a>Sign Up</a>
        </Link>
      </nav>
      <div className={style.content}>
        <div>
          <h2 className="text-urban_blue ">Sign in to Urban Crush</h2>
          <div className={style.authOptions}>
            {/* google auth */}
            <IconButton type="google" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* username */}
            <InputField
              inputType="text"
              required={true}
              label="email address"
              formfield={"email"}
              placeholderText={"what will you be"}
              registerField={register}
              validationRules={{ required: true, maxLength: 100 }}
              errorMessage={errors}
            />

            {/* password */}
            <InputField
              inputType="password"
              required={true}
              label="password"
              formfield={"password"}
              placeholderText={"Your password, dear"}
              registerField={register}
              validationRules={{ required: true, pattern: validation.password }}
              errorMessage={errors}
            />
            {/* checkbox */}
            {/* submit button */}
            <button className={style.submitButton} type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
