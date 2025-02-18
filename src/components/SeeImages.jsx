import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const SeeImages = () => {
  const { postId, imageIndex } = useParams(); // Get parameters from URL
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(parseInt(imageIndex, 10));

  // Fetch images from localStorage based on postId
  const images = JSON.parse(localStorage.getItem(`post-images-${postId}`)) || [];

  // Debugging: Log the images, postId, and currentIndex
  useEffect(() => {
    console.log("postId:", postId);
    console.log("imageIndex:", imageIndex);
    console.log("Images from localStorage:", images);
    console.log("Current Index:", currentIndex);
  }, [images, postId, imageIndex, currentIndex]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // If no images are found, show a message
  if (images.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000",
          color: "white",
        }}
      >
        <p>No images found for this post.</p>
      </div>
    );
  }

  return (
    <div
      {...handlers} // Apply swipe handlers to the container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        position: "relative",
        color: "white",
      }}
    >
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        style={{
          position: "absolute",
          left: "10px",
          fontSize: "24px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        ◀
      </button>

      {/* Current Image */}
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style={{ maxWidth: "90%", maxHeight: "90vh", borderRadius: "10px" }}
      />

      {/* Next Button */}
      <button
        onClick={goToNext}
        disabled={currentIndex === images.length - 1}
        style={{
          position: "absolute",
          right: "10px",
          fontSize: "24px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        ▶
      </button>

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "24px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        ❌
      </button>
    </div>
  );
};

export default SeeImages;
