import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { MdFolderDelete, MdEdit } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LikeComment from "./LikeComment";

const MyDrafts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const userId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://server-08ld.onrender.com/${userId}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log("Posts fetched successfully:", data);
        
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDeletePost = async (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`https://server-08ld.onrender.com/${userId}/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleReadMoreClick = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  const handleEditClick = (postId, content) => {
    setEditingPostId(postId);
    setEditedContent(content);
  };

  const handleSaveClick = async (postId) => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const data = await response.json();
      console.log("Post updated successfully:", data);
      setEditingPostId(null);
      setPosts(posts.map((post) => (post._id === postId ? { ...post, content: editedContent } : post)));
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post: " + error.message);
    }
  };

  const handleCancelClick = () => {
    setEditingPostId(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const styles = {
    content: {
      marginLeft: "250px",
      padding: "20px",
    },
    postContainer: {
      backgroundColor: "#fff",
      marginBottom: "30px",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    postActions: {
      display: "flex",
      gap: "10px",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
    },
    readMore: {
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      fontWeight: "bold",
      textDecoration: "underline",
      marginTop: "10px",
    },
    postContent: {
      fontSize: "18px",
      color: "#333",
      fontFamily: "'Merriweather', serif",
      lineHeight: "1.8",
      textAlign: "justify",
      padding: "15px 20px",
      background: "#f9f9f9",
      borderRadius: "8px",
    },
    postImage: {
      width: "150px", // Fixed size for uniformity
      height: "150px", // Fixed size for uniformity
      marginTop: "15px",
      borderRadius: "10px",
      border: "2px solid #ddd", // Adding a border to images
      cursor: "pointer",
      objectFit: "cover", // Ensures the images don't stretch
    },
    imageContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      justifyContent: "center",
    },
    deleteButton: {
      color: "#d9534f",
    },
    editButton: {
      color: "#007bff",
    },
    saveButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "8px 12px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    cancelButton: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "8px 12px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    navbarContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1001,
    },
    modalImage: {
      maxWidth: "90%",
      maxHeight: "90vh",
      borderRadius: "10px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "36px",
      color: "white",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <div style={styles.navbarContainer}>
        <Navbar />
      </div>

      <div>
        <Sidebar />
        <div className="content">
          <h1>Posts</h1>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} style={styles.postContainer}>
                <div style={styles.postActions}>
                  <button
                    style={styles.button}
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <MdFolderDelete style={styles.deleteButton} />
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleEditClick(post._id, post.content)}
                  >
                    <MdEdit style={styles.editButton} />
                  </button>
                </div>

                <h3>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>

                {editingPostId === post._id ? (
                  <>
                    <ReactQuill value={editedContent} onChange={setEditedContent} />
                    <div style={styles.postActions}>
                      <button
                        style={styles.saveButton}
                        onClick={() => handleSaveClick(post._id)}
                      >
                        Save
                      </button>
                      <button
                        style={styles.cancelButton}
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={styles.postContent}>
                    {expandedPostId === post._id ? (
                      <>
                        {parse(post.content)} {/* Full content */}
                        <button onClick={() => handleReadMoreClick(post._id)} style={styles.readMore}>
                          See Less
                        </button>
                      </>
                    ) : (
                      <>
                        {parse(post.content.substring(0, 200))}... {/* Short content */}
                        <button onClick={() => handleReadMoreClick(post._id)} style={styles.readMore}>
                          See More
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div style={styles.imageContainer}>
                  {post.images.map((image, imgIndex) => (
                    <LazyLoadImage
                      key={imgIndex}
                      src={image}
                      alt="Post"
                      effect="blur"
                      style={styles.postImage}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
                <LikeComment userId={userId} post={post}/>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedImage && (
        <div style={styles.modal}>
          <img src={selectedImage} alt="Enlarged" style={styles.modalImage} />
          <button onClick={handleCloseImage} style={styles.closeButton}>
            ❌
          </button>
        </div>
      )}
   
     
    </div>
  );
};

export default MyDrafts;
