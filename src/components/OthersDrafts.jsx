import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import parse from "html-react-parser";

const OthersDrafts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://server-08ld.onrender.com/${userId}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleReadMoreClick = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const styles = {
    content: {
      padding: "20px",
    },
    postContainer: {
      backgroundColor: "#fff",
      marginBottom: "30px",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
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
    readLess: {
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
      <div style={styles.content}>
        <h1>Posts</h1>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} style={styles.postContainer}>
              <h3>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>

              <div style={styles.postContent}>
                {expandedPostId === post._id ? (
                  <>
                    {parse(post.content)}
                    <button
                      onClick={() => handleReadMoreClick(post._id)}
                      style={styles.readLess}
                    >
                      See Less
                    </button>
                  </>
                ) : (
                  <>
                    {parse(post.content.substring(0, 200))}...
                    <button
                      onClick={() => handleReadMoreClick(post._id)}
                      style={styles.readMore}
                    >
                      See More
                    </button>
                  </>
                )}
              </div>

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
            </div>
          ))
        )}
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

export default OthersDrafts;
