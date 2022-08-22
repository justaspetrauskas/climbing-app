import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import { useForm, UseFormRegister } from "react-hook-form";
import style from "../../styles/signUpForm.module.css";
import InputField from "./InputField";
import Error from "next/error";

export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
}

const validation = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm,
};

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // "onChange"
  });

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const res = await fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const postedData = await res.json();
      console.log("Posted data", postedData);
      // router.replace("/profile");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className={style.wrapper}>
      <nav className={style.formNav}>
        <p>Already have an account?</p>
        <Link href="/session/new">
          <a>Sign In</a>
        </Link>
      </nav>
      <div className={style.content}>
        <div>
          <h2 className="text-urban_blue ">Sign up to Urban Crush</h2>
          <div className={style.authOptions}>{/* google auth */}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <InputField
              inputType="text"
              required={true}
              label="name"
              formfield={"name"}
              placeholderText={"your name"}
              registerField={register}
              validationRules={{ required: true, maxLength: 100 }}
              errorMessage={errors}
            />

            {/* username */}
            <InputField
              inputType="text"
              required={true}
              label="username"
              formfield={"username"}
              placeholderText={"what will you be"}
              registerField={register}
              validationRules={{ required: true, maxLength: 100 }}
              errorMessage={errors}
            />
            {/* email */}
            <InputField
              inputType="text"
              required={true}
              label="email"
              formfield={"email"}
              placeholderText={"your email"}
              registerField={register}
              validationRules={{ required: true, pattern: validation.email }}
              errorMessage={errors}
            />
            {/* password */}
            <InputField
              inputType="password"
              required={true}
              label="password"
              formfield={"password"}
              placeholderText={
                "6+ characters, at least one digit and special character"
              }
              registerField={register}
              validationRules={{ required: true, pattern: validation.password }}
              errorMessage={errors}
            />
            {/* checkbox */}
            {/* submit button */}
            <button className={style.submitButton} type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
