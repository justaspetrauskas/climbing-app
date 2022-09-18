import { features } from "process";
import React, { useState } from "react";

const useForm = () => {
  // Form values
  const [values, setValues] = useState<Record<string, any>>({});

  // Form errors
  const [errors, setErrors] = useState<Record<string, any>>({});

  // helpers
  const deleteValue = (objKey: string) => {
    let copyObj = errors;
    if (objKey in copyObj) {
      delete copyObj[objKey];
      setErrors(copyObj);
    }
    return false;
  };

  // validation
  const validate = (e: any, name: string, value: string) => {
    switch (name) {
      case "title":
        if (value.length <= 1 || value.length >= 30) {
          setErrors({
            ...errors,
            title: "must be between 1 and 30 characters",
          });
        } else {
          deleteValue("title");
        }
        break;
      case "description":
        if (value.length >= 300) {
          setErrors({
            ...errors,
            description: "must be less than 300 characters",
          });
        } else {
          deleteValue("description");
        }
        break;
      case "grade":
        if (+value < 1 || +value > 27) {
          setErrors({
            ...errors,
            value: "must be between 1 and 27",
          });
        } else {
          deleteValue("grade");
        }
        break;
      default:
        break;
    }
  };

  // method to handle form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const { name, value } = e.target;

    validate(e, name, value);

    setValues({ ...values, [name]: value });
  };

  // method to handle selection
  const handleSelect = (feature: string) => {
    // addSelectedValue
    const addSelectedValue = () => {
      if (!values.features.includes(feature))
        setValues((prevState) => ({
          features: [...prevState.features, feature],
        }));

      if (values.features.includes(feature)) {
        const tempFeatures = [...values.features];
        const filteredFeatures = tempFeatures.filter((f) => f !== feature);
        setValues((prevState) => ({ features: filteredFeatures }));
      }
    };

    // create key in the obj if does not exist
    if ("features" in values) {
      addSelectedValue();
    } else {
      setValues((prevState) => ({
        features: [feature],
      }));
    }
  };

  return { values, errors, handleChange, handleSelect };
};

export default useForm;
