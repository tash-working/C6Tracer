import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css"; // For styling
import Post from "./Post"; // Import the new Post component
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";
import OtherUsers from "./OtherUsers";

const Home = () => {
  const [collections, setCollections] = useState([]); // Stores user IDs
  const [posts, setPosts] = useState([]); // Stores all posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch collections (user IDs) from the backend
  const fetchCollections = async () => {
    try {
      const response = await fetch("https://c6-tracer.vercel.app/collections");
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError(error.message);
    }
  };

  // Fetch posts for a specific user ID
  const fetchPosts = async (collectionId) => {
    try {
      const response = await fetch(`https://c6-tracer.vercel.app/${collectionId}/api/posts`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts for collection ${collectionId}`);
      }
      const data = await response.json();
      return data.map(post => ({ ...post, collectionId })); // Attach collectionId to each post
    } catch (err) {
      console.error(`Error fetching posts for collection ${collectionId}:`, err);
      setError(err.message);
      return []; // Return an empty array if there's an error
    }
  };

  // Fetch posts for all user IDs in the collections array
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      let allPosts = [];
      for (const collectionId of collections) {
        const userPosts = await fetchPosts(collectionId);
        allPosts.push(...userPosts);
      }
      // Sort posts by createdAt in descending order (newest first)
      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(allPosts);
    } catch (error) {
      console.error("Error fetching all posts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch collections on component mount
  useEffect(() => {
    fetchCollections();
  }, []);

  // Fetch posts for all users after collections are fetched
  useEffect(() => {
    if (collections.length > 0) {
      fetchAllPosts();
    }
  }, [collections]);

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
    marginLeft: "200px",
    marginTop: "50px",
    backgroundColor: "#FAF9F6",
    padding: "20px",
    color: "#829b48",
    minHeight: "100vh",
  };

  return (
    <div>
      <div style={navbarStyle}>
        <Navbar />
      </div>

      <div>
        <Sidebar />
        <div className="content">
          <h1>Home</h1>

          <h2>All Posts:</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
               

              <Post key={index} post={post} userId={post.collectionId} />
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
