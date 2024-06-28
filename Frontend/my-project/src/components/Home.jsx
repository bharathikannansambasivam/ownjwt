import React from "react";

function Home() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Successfully Added</h1>
      <div className="flex gap-5">
        <button className="bg-red-400 p-5 text-white rounded-lg shadow-md hover:bg-red-500 transition duration-300">
          <a href="/signup" className="no-underline text-white">
            Signup
          </a>
        </button>
        <button className="bg-red-400 p-5 text-white rounded-lg shadow-md hover:bg-red-500 transition duration-300">
          <a href="/login" className="no-underline text-white">
            Login
          </a>
        </button>
        <button className="bg-red-400 p-5 text-white rounded-lg shadow-md hover:bg-red-500 transition duration-300">
          <a href="/dashboard" className="no-underline text-white">
            Dashboard
          </a>
        </button>
      </div>
    </div>
  );
}

export default Home;
