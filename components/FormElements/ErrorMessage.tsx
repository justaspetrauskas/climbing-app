import React from "react";

interface ErrorMessageProps {
  error: Record<string, any>;
  label: string;
}

const ErrorMessage = ({ error, label }: ErrorMessageProps) => {
  switch (error.type) {
    case "required":
      return <span>{label} is required</span>;
    case "maxLength":
      return <span>{label} is a bit too long, make it shorter</span>;
    case "pattern":
      return <span>{label} is not following pattern</span>;
    default:
      return <span>{label} is required</span>;
  }
};

export default ErrorMessage;
