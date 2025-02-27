import React from "react";

const posts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  username: `User${i + 1}`,
  content: `This is post number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  timestamp: new Date().toLocaleString(),
}));

const SocialMediaPosts = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>Social Media Posts</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{post.username}</h2>
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>{post.content}</p>
            <span style={{ fontSize: "12px", color: "#888" }}>{post.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaPosts;
