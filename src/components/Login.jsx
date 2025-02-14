import React, { useEffect, useState } from "react";
import supabase from "../helper/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Import the external CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      console.log(data.user.id);
      localStorage.setItem("id", JSON.stringify(data.user.id));
      setMessage("Login successful!");
      navigate(`/${data.user.id}`);
    }
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    if (id) {
      navigate(`/${id}`);
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="form-title">Leos login here</h1>
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
          <button type="submit" className="login-button">Login</button>
        </div>
      </form>
      <h2 className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </h2>
    </div>
  );
};

export default Login;
