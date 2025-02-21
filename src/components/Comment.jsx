import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ c }) => {
  const [profile, setProfile] = useState({});

  const fetchId = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${c.userId}/get_id`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfile(data[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <div style={styles.commentContainer}>
      <Link to={`/${c.userId}/profile`} style={styles.profileLink}>
        <img src={profile.profilePic} alt="Leo" style={styles.profileImage} />
       
      </Link>
      <strong style={styles.userName}>{profile.first_name} {profile.last_name}</strong>
      <span style={styles.commentText}>{c.comment}</span>
    </div>
  );
};

const styles = {
  commentContainer: {
    padding: "8px 10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  profileImage: {
    width: "25px",
    height: "25px",
    objectFit: "cover",
    borderRadius: "50%",
    marginRight: "6px",
  },
  userName: {
    fontWeight: "bold",
  },
  commentText: {
    color: "#555",
    wordBreak: "break-word",
  },
};

export default Comment;