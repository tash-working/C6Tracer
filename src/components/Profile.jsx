import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../helper/SupabaseClient";
import "./Sidebar.css"; // For styling
import OthersDrafts from "./OthersDrafts";

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); // Preview the image
  const [profile, setProfile] = useState({}); // User profile data
  const [profilePic, setProfilePic] = useState(""); // Profile picture URL
  const [uploadedUrl, setUploadedUrl] = useState(null); // Store Cloudinary URL

  // Fetch user profile data
  const fetchId = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${userId}/get_id`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfile(data[0]);
      setProfilePic(data[0].profilePic);
      console.log("Profile data fetched:", data[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchId();
  }, []);

  // Navbar styling
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

  // Button styling
  const buttonStyle = {
    backgroundColor: "#6B46C1", // Purple-600
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    marginRight: "10px",
    transition: "background 0.3s",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#E53E3E", // Red-500
  };

  return (
    <div>
      <div style={navbarStyle}>
        <Navbar />
      </div>

      <div>
        <Sidebar />
        <div className="content">
          {/* Profile Picture and User Info */}
          <div>
            <img
              src={profilePic}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #ff8a00",
              }}
            />
            <h1>{profile.first_name} {profile.last_name}</h1>
            <p>{profile.bio}</p>
            <br />
          </div>

          {/* Display OthersDrafts component */}
          <OthersDrafts userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;