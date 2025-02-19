import React, { useState } from "react";
import Comment from "./Comment"; // Import the Comment component

const LikeComment = ({ userId, post }) => {
  const [likes, setLikes] = useState(post.like || 0);
  const [liked, setLiked] = useState(post.likedBy?.includes(JSON.parse(localStorage.getItem("id"))) || false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.Comment || []);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${post._id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: JSON.parse(localStorage.getItem("id"))}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update like status");
      }

      const data = await response.json();
      console.log("Like status updated:", data);

      // Update local state
      setLikes(data.like);
      setLiked(data.liked); // Toggle the liked state
    } catch (error) {
      console.error("Error updating like status:", error);
      alert("Error updating like status: " + error.message);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment, id: JSON.parse(localStorage.getItem("id"))}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment");
      }

      const data = await response.json();
      console.log("Comment added:", data);

      // Update local state
      setComments([...comments, data.comment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment: " + error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          style={{
            backgroundColor: liked ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          onClick={handleLike}
        >
          {liked ? "Unlike" : "Like"} ({likes})
        </button>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          onClick={() => setShowComment(!showComment)}
        >
          Comment
        </button>
      </div>
      {showComment && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleCommentSubmit}
            style={{
              marginTop: "5px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Post
          </button>
          <div style={{ marginTop: "10px" }}>
            {comments.map((c, index) => (
              <Comment key={index} c={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeComment;