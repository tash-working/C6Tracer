import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from "react-icons/fi";

const Comment = ({ c, postId, userId, onDelete, onEdit }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(c.comment);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const uhoscommenting = JSON.parse(localStorage.getItem("id"));

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (!isEditing) setActiveCommentId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleCopy = () => {
    navigator.clipboard.writeText(c.comment);
    alert("Comment copied to clipboard!");
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/api/posts/${postId}/comment/${c.commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editedComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      onEdit(c.commentId, editedComment);
      setIsEditing(false);
      setActiveCommentId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/api/posts/${postId}/comment/${c.commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      onDelete(c.commentId);
      setActiveCommentId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.commentContainer}>
      <Link to={`/${c.userId}/profile`} style={styles.profileLink}>
        <img src={profile.profilePic} alt="Leo" style={styles.profileImage} />
      </Link>
      <div style={styles.commentContent}>
        <strong style={styles.userName}>{profile.first_name} {profile.last_name}</strong>
        <span style={styles.commentTime}>{new Date(c.createdAt).toLocaleString()}</span>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            style={styles.editInput}
          />
        ) : (
          <span style={styles.commentText}>{c.comment}</span>
        )}
      </div>

      <div style={styles.actions} ref={dropdownRef}>
        <FiMoreVertical
          onClick={() => setActiveCommentId(activeCommentId === c.commentId ? null : c.commentId)}
          style={styles.moreIcon}
        />
        {activeCommentId === c.commentId && (
          <div style={styles.dropdownMenu}>
            <button onClick={handleCopy} style={styles.dropdownItem}>Copy</button>
            {uhoscommenting === c.userId && (
              isEditing ? (
                <>
                  <button onClick={handleEdit} style={styles.dropdownItem}>Save</button>
                  <button onClick={() => setIsEditing(false)} style={styles.dropdownItem}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} style={styles.dropdownItem}>Edit</button>
                  <button onClick={handleDelete} style={styles.dropdownItem}>Delete</button>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  commentContainer: {
    padding: "8px 10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  commentContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: "150px",
  },
  userName: {
    fontWeight: "bold",
  },
  commentTime: {
    fontSize: "12px",
    color: "#777",
  },
  commentText: {
    color: "#555",
    wordBreak: "break-word",
  },
  actions: {
    position: "relative",
    cursor: "pointer",
  },
  moreIcon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: "25px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
  },
  dropdownItem: {
    background: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "12px",
    width: "100px",
  },
  editInput: {
    padding: "4px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
};

export default Comment;
