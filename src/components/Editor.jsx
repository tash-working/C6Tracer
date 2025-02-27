import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Sidebar.css"; // For styling

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const reactQuillRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem("id"));
  const [previews, setPreviews] = useState([]); // For image previews
  const [uploadedUrls, setUploadedUrls] = useState([]); // For uploaded image URLs
  const [files, setFiles] = useState([]); // Track actual files selected in the file input
  const fileInputRef = useRef(null); // Ref for the file input

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorHtml(savedContent);
    }
  }, []);

  // Handle content changes and save to localStorage automatically
  const handleChange = (html) => {
    setEditorHtml(html);
    localStorage.setItem("editorContent", html); // Save content to localStorage
  };

  // Handle file selection for image uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles); // Update the files state
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews); // Update the previews state
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index); // Remove the file from the files state
    const updatedPreviews = previews.filter((_, i) => i !== index); // Remove the preview from the previews state
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    // Clear the file input value to ensure it reflects the current state
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pictures"); // Replace with your Cloudinary upload preset

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dawmir745/image/upload", {
          method: "POST",
          body: data,
        });

        const cloudData = await res.json();
        if (cloudData.secure_url) {
          return cloudData.secure_url;
        } else {
          console.error("Upload failed:", cloudData);
          return null;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    });

    const urls = (await Promise.all(uploadPromises)).filter((url) => url !== null);
    return urls;
  };

  // Post content & images to Express server
  const handlePost = async () => {
    try {
      let imageUrls = [];

      // If there are files, upload them to Cloudinary first
      if (files.length > 0) {
        imageUrls = await uploadImagesToCloudinary(files);
        setUploadedUrls(imageUrls); // Save uploaded URLs to state
      }

      // Send content and image URLs to the backend
      const response = await fetch(`https://c6-tracer.vercel.app/${userId}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editorHtml, images: imageUrls }),
      });

      if (response.ok) {
        alert("Content posted successfully!");
        setEditorHtml(""); // Clear the editor
        setPreviews([]); // Clear image previews
        setUploadedUrls([]); // Clear uploaded URLs
        setFiles([]); // Clear files state
        localStorage.removeItem("editorContent"); // Clear localStorage
      } else {
        alert("Failed to post content");
      }
    } catch (error) {
      console.error("Error posting content:", error);
      alert("Error posting content");
    }
  };

  const styles = {
    uploadContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "16px",
      border: "2px dashed #829b48",
      borderRadius: "12px",
      backgroundColor: "#fffaf0",
      cursor: "pointer",
      transition: "border 0.3s ease",
    },
    uploadLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      backgroundColor: "#829b48",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    fileInput: {
      display: "none",
    },
    previewContainer: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    imageWrapper: {
      position: "relative",
      width: "100px",
      height: "100px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
    },
    removeButton: {
      position: "absolute",
      top: "5px",
      right: "5px",
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, backgroundColor: "#1a202c", color: "white", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>

      <div>
        <Sidebar style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px", backgroundColor: "white", marginBottom: "20px", color: "black" }} />

        <div className="content">
          <h1>Write and Post</h1>

          {/* Editor */}
          <ReactQuill
            ref={reactQuillRef}
            value={editorHtml}
            onChange={handleChange}
            theme="snow"
            style={{ minHeight: "25vh", marginBottom: "20px" }}
            placeholder="Write something awesome..."
          />

          {/* Preview */}
          <div>
            <h2>Preview:</h2>
            <div
              style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px", backgroundColor: "white", marginBottom: "20px", color: "black" }}
              dangerouslySetInnerHTML={{ __html: editorHtml }}
            />
          </div>

          {/* Image Upload */}
          <div style={styles.uploadContainer}>
            <label style={styles.uploadLabel}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={styles.fileInput}
                ref={fileInputRef}
              />
              <span>📷 Upload Images</span>
            </label>

            {previews.length > 0 && (
              <div style={styles.previewContainer}>
                {previews.map((preview, index) => (
                  <div key={index} style={styles.imageWrapper}>
                    <img src={preview} alt="Preview" style={styles.image} />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={styles.removeButton}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Button to Post */}
          <button
            onClick={handlePost}
            style={{
              backgroundColor: "#ff8a00",
              color: "#1A202C",
              padding: "8px 16px",
              borderRadius: "4px",
              fontWeight: "bold",
              transition: "background-color 0.3s, color 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#6B46C1";
              e.target.style.color = "#829b48";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ff8a00";
              e.target.style.color = "#1A202C";
            }}
          >
            Post Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;