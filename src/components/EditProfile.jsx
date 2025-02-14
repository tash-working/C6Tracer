import React from "react";

const EditProfile = ({ editData, onInputChange, onSaveProfile, onCancel }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Profile</h2>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={editData.first_name || ""}
        onChange={onInputChange}
        style={styles.input}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={editData.last_name || ""}
        onChange={onInputChange}
        style={styles.input}
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={editData.bio || ""}
        onChange={onInputChange}
        style={styles.textarea}
      />
      <div style={styles.buttonContainer}>
        <button onClick={onSaveProfile} style={styles.saveButton}>Save</button>
        <button onClick={onCancel} style={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    resize: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default EditProfile;
