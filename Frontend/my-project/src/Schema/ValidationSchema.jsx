import React from "react";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("please enter valid email")
    .required("please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
});

export default ValidationSchema;
