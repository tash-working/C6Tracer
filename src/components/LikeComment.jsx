import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaCommentAlt } from "react-icons/fa";
import Comment from "./Comment";

const LikeComment = ({ userId, post }) => {
  const userLocalId = JSON.parse(localStorage.getItem("id"));
  const [likes, setLikes] = useState(post.like || 0);
  const [liked, setLiked] = useState(post.likedBy?.includes(userLocalId) || false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.Comment || []);

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${post._id}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userLocalId }),
        }
      );
      if (!response.ok) throw new Error("Failed to update like status");
      const data = await response.json();
      setLikes(data.like);
      setLiked(data.liked);
    } catch (error) {
      console.error("Error updating like status:", error);
      alert("Error updating like status: " + error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/api/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment, id: userLocalId }),
        }
      );
      if (!response.ok) throw new Error("Failed to add comment");
      const data = await response.json();
      setComments([...comments, data.comment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment: " + error.message);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.commentId !== commentId));
  };

  const handleEditComment = (commentId, newText) => {
    setComments(comments.map((c) => (c.commentId === commentId ? { ...c, comment: newText } : c)));
  };

  return (
    <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          style={{ background: "transparent", color: liked ? "#28a745" : "#007bff", border: "none", cursor: "pointer", fontSize: "18px" }}
          onClick={handleLike}
        >
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} ({likes})
        </button>
        <button
          style={{ background: "transparent", color: "#007bff", border: "none", cursor: "pointer", fontSize: "18px" }}
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
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <button
            onClick={handleCommentSubmit}
            style={{ marginTop: "5px", backgroundColor: "#28a745", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "5px", width: "100%" }}
          >
            Post
          </button>
          <div style={{ marginTop: "10px", height: "300px", overflowY: "auto" }}>
            {comments.map((c, index) => (
              <Comment key={index} c={c} postId={post._id} userId={userId} onDelete={handleDeleteComment} onEdit={handleEditComment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeComment;
