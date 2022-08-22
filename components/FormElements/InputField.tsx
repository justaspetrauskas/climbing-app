import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import style from "../../styles/signUpForm.module.css";
import ErrorMessage from "./ErrorMessage";

export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
}

interface InputFieldProps {
  inputType: "textarea" | "text" | "checkbox" | "password";
  required: boolean;
  label: string;
  placeholderText: string;
  registerField: UseFormRegister<any>;
  formfield: keyof Record<string, any>;
  validationRules: ValidationRules;
  errorMessage: Record<string, any>;
}
const InputField = ({
  label,
  required = true,
  placeholderText = label,
  inputType = "text",
  registerField,
  formfield,
  validationRules,
  errorMessage,
}: InputFieldProps) => {
  return (
    <div className={style.formInputWrapper}>
      <label
        className={style.formInputLabel}
        htmlFor={`input-${label.toLocaleLowerCase()}`}
      >
        {label}
      </label>
      <input
        className={style.formInput}
        placeholder={placeholderText}
        id={`input-${label.toLocaleLowerCase().replaceAll(" ", "")}`}
        type={inputType}
        {...registerField(formfield, validationRules)}
      />

      {errorMessage[formfield] && (
        <ErrorMessage label={label} error={errorMessage[formfield]} />
      )}
    </div>
  );
};

export default InputField;
