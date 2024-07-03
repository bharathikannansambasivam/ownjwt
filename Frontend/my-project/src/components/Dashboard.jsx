import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container h-screen w-screen bg-red-700">
      <button>
        <a className="flex bg-green-500 p-5 text-white" href="/">
          Home
        </a>
      </button>
    </div>
  );
}

export default Dashboard;
