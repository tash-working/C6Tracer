import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css"; // For styling
import OtherUsers from "./OtherUsers";

const Donate = () => {


  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: "#1a202c",
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const contentStyle = {
    marginLeft: "200px",
    marginTop: "50px",
    backgroundColor: "#FAF9F6",
    padding: "20px",
    color: "#ff8a00",
    height: "100vh",
  };

  return (
    <div>
      <div style={navbarStyle}>
        <Navbar />
      </div>

      <div>
        <Sidebar />
        <div className="content">
          <h1>Donate</h1>

        </div>
      </div>
    </div>
  );
};

export default Donate;
