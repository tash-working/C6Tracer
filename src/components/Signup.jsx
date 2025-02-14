import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../helper/SupabaseClient";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const handleCreateId = async (userId, data) => {
      try {
        const response = await fetch(
          `http://localhost:5000/${userId}/create_id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (response.ok) {
          navigate("/login");
         
        
        } else {
          alert("Failed to post content");
        }
      } catch (error) {
        console.error("Error posting content:", error);
        alert("Error posting content");
      }
    };
    setMessage("");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log(error.message);
      setMessage("Error: " + error.message);
      return;
    }

    if (data?.user) {
        console.log(data.user.id);
        handleCreateId(data.user.id, data.user)

        
      
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Register</h1>
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
        <h1 className="form-title">Admin Authentication</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <div className="button-container">
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
      </form>
      <h2 className="login-text">
        Already have an account? <Link to="/login">Login</Link>
      </h2>
    </div>
  );
};

export default Signup;
