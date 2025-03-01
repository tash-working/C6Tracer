import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../helper/SupabaseClient";
import "./Sidebar.css"; // For styling
import OthersDrafts from "./OthersDrafts";
import CarbonFootprint from "./CarbonFootPrint";

const Profile = ({ userId }) => {
  const navigate = useNavigate();
   const [preview, setPreview] = useState(null); // Preview the image
   const [profile, setProfile] = useState({}); // Profile data
   const [profilePic, setProfilePic] = useState(""); // Profile picture URL
   const [ecoPoint, setEcoPoint] = useState(0); // Profile picture URL
   const [showEditProfile, setShowEditProfile] = useState(false); // Show edit profile form
   const [uploadedUrl, setUploadedUrl] = useState(null); // Store Cloudinary URL
   const [editData, setEditData] = useState({}); // Store edited profile data
  //  const userId = JSON.parse(localStorage.getItem("id"));
   const [showPlasticInfo, setShowPlasticInfo] = useState(false);
   const [plasticData, SetPlasticData] = useState({});
 // Profile picture URL // Store Cloudinary URL

  // Fetch user profile data
  const fetchId = async () => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/get_id`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfile(data[0]);
      setProfilePic(data[0].profilePic);
      setEcoPoint(data[0].ecoPoint);
      SetPlasticData(data[0].plasticData || {});
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
                border: "2px solid #829b48",
              }}
            />
           <h1>
                  {profile.first_name} {profile.last_name}{" "}
                  {ecoPoint >= 300 && ecoPoint <= 499
                    ? "🥉"
                    : ecoPoint >= 500 && ecoPoint <= 999
                      ? "🥈"
                      : ecoPoint >= 1000
                        ? "🥇"
                        : ""}
                </h1>
                <h2>Eco Points: {ecoPoint}</h2>
            <p>{profile.bio}</p>
            <br />
          </div>
          <div>
            <CarbonFootprint plasticData={plasticData} />
          </div>

          {/* Display OthersDrafts component */}
          <OthersDrafts userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;