import React, { useEffect, useState } from "react";
import "./Sidebar.css"; // Ensure this contains necessary styles

const OtherUsers = ({ id }) => {
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://server-08ld.onrender.com/${id}/get_id`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfile(data[0]);
        setProfilePic(data[0].profilePic);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <img
        src={profilePic || "https://via.placeholder.com/80"}
        alt="Profile"
        style={styles.profilePic}
      />
      <p style={styles.name}>{profile.first_name}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "8px",
   
    backgroundColor: "#fff",
    width: "fit-content",
    gap: "12px",
    marginBottom: "10px",
  },
  profilePic: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #829b48",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default OtherUsers;
