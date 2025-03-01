import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../helper/SupabaseClient";
import "./Sidebar.css"; // For styling
import leo from "./leo.png";
import PlasticInfo from "./PlasticInfo";
import EditProfile from "./EditProfile"; // Import the new component
import CarbonFootprintCalculator from "./CarbonFootprintCalculator";
import { GiCancel } from "react-icons/gi";
import { RiInformation2Fill, RiInformationOffFill } from "react-icons/ri";
import gold from "./gold-01.png";
import silver from "./silver-01.png";
import bronz from "./bronz-01.png";

const MyProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); // Preview the image
  const [profile, setProfile] = useState({}); // Profile data
  const [profilePic, setProfilePic] = useState(""); // Profile picture URL
  const [ecoPoint, setEcoPoint] = useState(0); // Profile picture URL
  const [showEditProfile, setShowEditProfile] = useState(false); // Show edit profile form
  const [uploadedUrl, setUploadedUrl] = useState(null); // Store Cloudinary URL
  const [editData, setEditData] = useState({}); // Store edited profile data
  const userId = JSON.parse(localStorage.getItem("id"));
  const [showPlasticInfo, setShowPlasticInfo] = useState(false);
  const [plasticData, SetPlasticData] = useState({});

  // Fetch profile data
  const fetchId = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/get_id`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      setProfile(data[0]);
      setProfilePic(data[0].profilePic);
      setEcoPoint(data[0].ecoPoint);
      setEditData(data[0]); // Initialize editData with fetched data
      SetPlasticData(data[0].plasticData || {});
      // Store in local storage
      localStorage.setItem("profileData", JSON.stringify(data[0]));
      localStorage.setItem("plasticsData", JSON.stringify(data[0].plasticData || [])); // Store empty array if undefined

    } catch (err) {
      console.log(err.message);
    }
  };


  // Load profile data from local storage on component mount
  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      const parsedData = JSON.parse(storedProfileData);
      setProfile(parsedData);
      setProfilePic(parsedData.profilePic);
      setEditData(parsedData);
      setEcoPoint(parsedData.ecoPoint);
    } else {
      fetchId(); // Fetch data if not in local storage
    }
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a URL for preview
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
  };

  // Remove image preview
  const handleCancelPreview = () => {
    setPreview(null);
    setUploadedUrl(null);
    document.querySelector('input[type="file"]').value = "";
  };

  // Upload image to Cloudinary
  const handleUploadFile = async () => {
    if (!preview) {
      alert("Please select an image first.");
      return;
    }

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pictures");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dawmir745/image/upload", {
        method: "POST",
        body: data,
      });

      const cloudData = await res.json();
      if (cloudData.secure_url) {
        setUploadedUrl(cloudData.secure_url);
        console.log("Uploaded Image URL:", cloudData.secure_url);
        sendUrlToBackend(cloudData.secure_url); // Send URL to backend
      } else {
        console.error("Upload failed:", cloudData);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Send the uploaded image URL to the backend
  const sendUrlToBackend = async (imageUrl) => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/uploadPP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      alert("Image uploaded and URL sent to backend!");
      setProfilePic(imageUrl);
      setPreview(null);
      setProfilePic(imageUrl); // Update profile picture state
      localStorage.setItem("profileData", JSON.stringify({ ...profile, profilePic: imageUrl })); // Update local storage
    } catch (error) {
      console.error("Error sending URL to backend:", error);
    }
  };

  // Handle input changes in edit profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Save edited profile data
  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: editData.first_name,
          last_name: editData.last_name,
          bio: editData.bio,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Response from backend:", data);
        setProfile(editData); // Update profile state
        localStorage.setItem("profileData", JSON.stringify(editData)); // Update local storage
        setShowEditProfile(false); // Hide edit form
        alert("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", data.message);
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };

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
          <div>
            {profile.profilePic === "" ? (
              <div>
                <img
                  src={leo}
                  alt="Leo"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <h1>{profile.first_name} {profile.last_name}</h1>
              </div>
            ) : (
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
                    ? <img
                    src={bronz}
                    alt="Leo"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid bronze",
                    }}
                  />
                    : ecoPoint >= 500 && ecoPoint <= 999
                      ? <img
                      src={silver}
                      alt="Leo"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid solver",
                      }}
                    />
                      : ecoPoint >= 1000
                        ? <img
                        src={gold}
                        alt="Leo"
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "2px solid gold",
                        }}
                      />
                        : ""}
                </h1>
                <h2>Eco Points: {ecoPoint}</h2>

              </div>
            )}
          </div>

          <div>
            <input
              type="file"
              id="file-input"
              className="file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input" className="file-label">
              {preview ? "Change Image" : "Choose an image"}
            </label>
            <button
              onClick={() => setShowEditProfile(!showEditProfile)}
              className="file-label"
              style={{ marginLeft: "10px" }}
            >
              Edit Profile
            </button>

            {showEditProfile && (
              <EditProfile
                editData={editData}
                onInputChange={handleInputChange}
                onSaveProfile={handleSaveProfile}
                onCancel={() => setShowEditProfile(false)}
              />
            )}

            {preview && (
              <div>
                <h3>Image Preview:</h3>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <br />
                <button onClick={handleCancelPreview} style={cancelButtonStyle}>
                  Cancel
                </button>
                <br />
                <button onClick={handleUploadFile} style={buttonStyle}>
                  Upload
                </button>
              </div>
            )}
          </div>

          <div>


            {/* Render Carbon Footprint Calculator only if userId exists */}

          </div>

          <br />

          <div>
            {
              !showPlasticInfo && (<spam onClick={() => setShowPlasticInfo(true)} ><span className="close" onClick={() => setShowPlasticInfo(false)}><RiInformation2Fill
              style={{
                color: "#829b48",
                fontSize: "1.5rem",
                transition: "color 0.3s",
                cursor: "pointer",
              }}
              // onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              // onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            /></span></spam>
              )
            }
            {showPlasticInfo && (
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={() => setShowPlasticInfo(false)}><RiInformationOffFill
                    style={{
                      color: "#829b48",
                      fontSize: "1.5rem",
                      transition: "color 0.3s",
                      cursor: "pointer",
                    }}
                    // onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                    // onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                  /></span>
                  <PlasticInfo />
                </div>
              </div>
            )}
          </div>

          {userId ? <CarbonFootprintCalculator plasticData={plasticData}/> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;