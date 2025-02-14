import { useState } from "react";

const ImageUploader = ({ userId, setUploadedImages }) => {
  const [previews, setPreviews] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...filePreviews]);
  };

  const handleUploadFiles = async () => {
    if (previews.length === 0) {
      alert("Please select images first.");
      return;
    }
  
    const fileInput = document.querySelector('input[type="file"]');
    const files = Array.from(fileInput.files);
    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pictures");
  
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
    setUploadedUrls(urls);
  
    if (typeof setUploadedImages === "function") {
      setUploadedImages(urls);
    } else {
      console.warn("setUploadedImages is not a function");
    }
  
    console.log("Uploaded Images:", urls);
  };
  

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUploadFiles}>Upload</button>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
