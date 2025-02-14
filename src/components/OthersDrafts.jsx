import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { color } from "framer-motion";
import './Sidebar.css'; // For styling

const OthersDrafts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null); // State to track expanded post

  // Declare hover state for post and image
  const [hoveredPostIndex, setHoveredPostIndex] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${userId}/api/posts`
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
  }, [userId]); // Added userId dependency to refetch when it changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  const contentStyle = {
    marginTop: "50px",
    backgroundColor: "#FAF9F6",
    padding: "20px",
    color: "#829b48",
  };

  const postContainerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
  };

  const postContainerHoverStyle = {
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  };

  const postContentStyle = {
    fontSize: '18px',
    lineHeight: '1.75',
    color: '#444444',
    marginBottom: '20px',
    fontFamily: '"Roboto", sans-serif',
  };

  const imageContainerStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const imageStyle = {
    width: 'calc(33.33% - 16px)',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  };

  const imageHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  };

  const readMoreStyle = {
    color: '#829b48',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  const handleReadMoreClick = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  return (
    <div style={contentStyle}>
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
            <div
              style={postContentStyle}
              dangerouslySetInnerHTML={{
                __html: expandedPostId === post.id ? post.content : post.content.substring(0, 200) + '...',
              }}
            />
            {post.content.length > 200 && (
              <div
                style={readMoreStyle}
                onClick={() => handleReadMoreClick(post.id)}
              >
                {expandedPostId === post.id ? 'Read less' : 'Read more...'}
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
  );
};

export default OthersDrafts;