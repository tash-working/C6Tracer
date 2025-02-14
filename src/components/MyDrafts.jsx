import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css"; // For styling
import { MdFolderDelete } from "react-icons/md";

const MyDrafts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null); // State to track expanded post
  const userId = JSON.parse(localStorage.getItem("id"));

  // Define state for hovered post and image index
  const [hoveredPostIndex, setHoveredPostIndex] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://server-08ld.onrender.com/${userId}/api/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  // Function to handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Function to handle "Read more" click
  const handleReadMoreClick = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    marginTop: "50px", // Adjusted to account for fixed navbar
    marginLeft: "200px",
    backgroundColor: "#FAF9F6",
    padding: "20px",
    color: "#ff8a00",
  };

  const postContainerStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    position: "relative", // For positioning the delete button
  };

  const postContainerHoverStyle = {
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  };

  const postContentStyle = {
    fontSize: "18px",
    lineHeight: "1.75",
    color: "#444444",
    marginBottom: "20px",
    fontFamily: '"Roboto", sans-serif',
  };

  const imageContainerStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "calc(33.33% - 16px)",
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  const imageHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  };

  const deleteButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#ff4d4d",
    fontSize: "40px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  const deleteButtonHoverStyle = {
    color: "#cc0000",
  };

  const readMoreStyle = {
    color: "#ff8a00",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <div>
      <div style={navbarStyle}>
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
              <div
                key={index}
                style={{
                  ...postContainerStyle,
                  ...(hoveredPostIndex === index && postContainerHoverStyle),
                }}
                onMouseEnter={() => setHoveredPostIndex(index)}
                onMouseLeave={() => setHoveredPostIndex(null)}
              >
                <button
                  style={{
                    ...deleteButtonStyle,
                    ...(hoveredPostIndex === index && deleteButtonHoverStyle),
                  }}
                  onClick={() => handleDeletePost(post._id)}
                >
                  <MdFolderDelete />
                </button>
                <h3>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {" - "}
                  {new Date(post.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h3>
                <div
                  style={postContentStyle}
                  dangerouslySetInnerHTML={{
                    __html:
                      expandedPostId === post._id
                        ? post.content
                        : post.content.substring(0, 200) + "...",
                  }}
                />
                {post.content.length > 200 && (
                  <div
                    style={readMoreStyle}
                    onClick={() => handleReadMoreClick(post._id)}
                  >
                    {expandedPostId === post._id ? "Read less" : "Read more..."}
                  </div>
                )}
                <div style={imageContainerStyle}>
                  {post.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt="Post"
                      style={{
                        ...imageStyle,
                        ...(hoveredImageIndex === imgIndex && imageHoverStyle),
                      }}
                      onMouseEnter={() => setHoveredImageIndex(imgIndex)}
                      onMouseLeave={() => setHoveredImageIndex(null)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDrafts;