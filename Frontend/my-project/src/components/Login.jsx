import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:3000/login", user, {
        withCredentials: true,
      });

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-4 p-5 border-black max-w-xs"
      >
        <h2 className="text-center text-3xl mb-4">Login</h2>
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border-2 border-gray-400 px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="border-2 border-gray-400 px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login{" "}
        </button>
      </form>
    </div>
  );
}

export default Login;
