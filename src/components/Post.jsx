import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import parse from "html-react-parser";
import LikeComment from "./LikeComment";
import { Link } from "react-router-dom";
import OtherUsers from "./OtherUsers";

const Post = ({ post, userId }) => {
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
            width: "150px",
            height: "150px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "2px solid #ddd",
            cursor: "pointer",
            objectFit: "cover",
        },
        imageContainer: {
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
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
        <div style={styles.postContainer}>
            <Link to={`/${userId}/profile`} className="collection-link">
                {/* <li key={index} className="collection-item">{collection}</li> */}
                <div >
                    <OtherUsers id={userId} />
                </div>

            </Link>
            <h3>
                {new Date(post.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Ensures AM/PM format
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
            <LikeComment userId={userId} post={post} />

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

export default Post;