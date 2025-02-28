import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../helper/SupabaseClient";
import "./signup.css";

// South Asia countries and their cities
const southAsiaCountries = {
  Afghanistan: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad", "Kunduz"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal"],
  Bhutan: ["Thimphu", "Punakha", "Paro", "Wangdue Phodrang", "Jakar", "Trashigang"],
  India: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Pune"],
  Maldives: ["Malé", "Addu City", "Fuvahmulah", "Hithadhoo", "Kulhudhuffushi", "Thinadhoo"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "Bharatpur", "Birgunj"],
  Pakistan: ["Islamabad", "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan"],
  Sri_Lanka: ["Colombo", "Kandy", "Galle", "Jaffna", "Trincomalee", "Anuradhapura"],
};

// Profession options
const professions = [
  "Student",
  "Housewife",
  "Software Developer",
  "Doctor",
  "Teacher",
  "Engineer",
  "Nurse",
  "Accountant",
  "Data Scientist",
  "Sales Manager",
  "Marketing Specialist",
  "Project Manager",
  "Graphic Designer",
  "Lawyer",
  "Electrician",
  "Chef",
  "Architect",
  "Psychologist",
  "Financial Analyst",
  "Human Resources Manager",
  "Civil Engineer",
  "Social Media Manager",
  "Unemployed",
];

// Gender options
const genders = ["Male", "Female", "Prefer not to say"];

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log(error.message);
      setMessage("Error: " + error.message);
      return;
    }

    if (data?.user) {
      console.log(data.user.id);
      handleCreateId(data.user.id, {
        email,
        country,
        city,
        profession,
        gender,
      });
    }

    setEmail("");
    setPassword("");
    setCountry("");
    setCity("");
    setProfession("");
    setGender("");
  };

  const handleCreateId = async (userId, data) => {
    try {
      const response = await fetch(
        `https://server-08ld.onrender.com/${userId}/create_id`,
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
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCity(""); // Reset city when country changes
          }}
          className="input-field"
        >
          <option value="">Select Country</option>
          {Object.keys(southAsiaCountries).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
          disabled={!country} // Disable if no country is selected
        >
          <option value="">Select City</option>
          {country &&
            southAsiaCountries[country].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="input-field"
        >
          <option value="">Select Profession</option>
          {professions.map((profession) => (
            <option key={profession} value={profession}>
              {profession}
            </option>
          ))}
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input-field"
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <div className="button-container">
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>
      </form>
      <h2 className="login-text">
        Already have an account? <Link to="/login">Login</Link>
      </h2>
    </div>
  );
};

export default Signup;