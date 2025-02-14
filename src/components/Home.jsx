import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css"; // For styling
import OtherUsers from "./OtherUsers";

const Home = () => {
  const [collections, setCollections] = useState([]);

  // Fetch collections from the backend
  const fetchCollections = async () => {
    try {
      const response = await fetch("https://server-08ld.onrender.com/collections");
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

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
    color: "#829b48",
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
          <h1>Home</h1>

          {/* Display Collections */}
          <h2>Database Collections:</h2>
          <ul>
            {collections.length > 0 ? (
              collections.map((collection, index) => (
                <Link to={`/${collection}/profile`} className="collection-link">
                {/* <li key={index} className="collection-item">{collection}</li> */}
                <div key={index} >
                <OtherUsers id={collection} />
                </div>
               
              </Link>
              
                
              ))
            ) : (
              <p>Loading collections...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
