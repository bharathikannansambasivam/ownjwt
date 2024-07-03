import React, { useState } from "react";
import axios from "axios";
import ValidationSchema from "../Schema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
function Login() {
  const initialvalue = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/login", values, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.token) {
        navigate("/dashboard");
      } else {
        console.log(response);
        alert(response.data);
      }
      console.log(response);
    } catch (e) {
      console.error("Login error:", e);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-amber-100">
      <Formik
        initialValues={initialvalue}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col border-4 p-5 border-black max-w-xs">
            <h2 className="text-center text-3xl mb-4">Login</h2>
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="border-2 border-gray-400 px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
            ></Field>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 mb-3"
            />{" "}
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border-2 border-gray-400 px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
            ></Field>{" "}
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 mb-3"
            />{" "}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login{" "}
            </button>
          </Form>
        )}
      </Formik>
      <button>
        <a className="bg-green-500 p-5 flex text-white" href="/">
          Home
        </a>
      </button>
    </div>
  );
}

export default Login;
