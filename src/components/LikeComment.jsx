import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaCommentAlt } from "react-icons/fa";
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
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "transparent",
            color: liked ? "#28a745" : "#007bff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={handleLike}
        >
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} ({likes})
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={() => setShowComment(!showComment)}
        >
          <FaCommentAlt /> ({comments.length})
        </button>
      </div>
      {showComment && (
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ccc" }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
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
              display: "block",
              width: "100%",
            }}
          >
            Post
          </button>
          <div style={{ marginTop: "10px", maxHeight: "200px", overflowY: "auto" }}>
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
