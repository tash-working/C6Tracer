import React, { useState } from "react";
import { MdOutlineSettings, MdPermMedia } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { RiAdminFill, RiArticleFill } from "react-icons/ri";
import supabase from "../helper/SupabaseClient";
import { TiThMenu } from "react-icons/ti";
import "./Sidebar.css";
import leo from "./leo.png";
import c6t from "./c6tbnobg.png";

const Navbar = () => {
    const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userId = JSON.parse(localStorage.getItem("id")); // Get user ID from localStorage

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("An error occurred while logging out. Please try again.");
    }
  };
  const buttonStyle = {
    backgroundColor: "#6B46C1", // Purple-600
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    marginRight: "10px",
    transition: "background 0.3s",
  };

  return (
    <div>
      {/* First Navigation Bar */}
      <nav
        className="nav1"
        style={{
          backgroundColor: "#FAF9F6",
          color: "#829b48",
          padding: "10px 20px",
          border: "1px solid #829b48",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 0",
          }}
        >
          {/* Logo */}
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            <Link
              to={`/${userId}`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
              <img src={c6t} alt="Leo" style={{
                // width: "24px",
                height: "34px",
                objectFit: "cover",
                // borderRadius: "50%",
              }} />
            </Link>
          </div>

          {/* Settings Dropdown */}
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={toggleDropdown}
              >
                <MdOutlineSettings
                  style={{
                    color: "#829b48",
                    fontSize: "1.5rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                  onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: "#FAF9F6",
                      border: "1px solid #829b48",
                      borderRadius: "4px",
                      padding: "10px",
                      zIndex: 1000,
                      width: "120px",
                    }}
                  >
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li>
                        <Link
                          to={`/${userId}/profile`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <MdAccountCircle style={{ fontSize: "1.25rem" }} />
                          My Profile
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to={`/${userId}/admin`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <RiAdminFill style={{ fontSize: "1.25rem" }} />
                          Admin
                        </Link>
                      </li> */}
                      <li>
                        <button
                          onClick={handleLogout}
                          style={{ ...buttonStyle, backgroundColor: "#ff8a00" }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Second Navigation Bar */}
      <nav
        className="nav2"
        style={{
          backgroundColor: "#FAF9F6",
          color: "#829b48",
          padding: "10px 20px",
          border: "1px solid #829b48",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 0",
          }}
        >
          {/* Logo */}
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            <Link
              to={`/${userId}`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
              <img src={c6t} alt="Leo" style={{
                // width: "24px",
                height: "34px",
                objectFit: "cover",
                // borderRadius: "50%",
              }} />
            </Link>
          </div>

          {/* Menu Dropdown */}
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={toggleDropdown}
              >
                <TiThMenu
                  style={{
                    color: "#829b48",
                    fontSize: "1.5rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                  onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: "#FAF9F6",
                      border: "1px solid #829b48",
                      borderRadius: "4px",
                      padding: "10px",
                      zIndex: 1000,
                      width: "120px",
                    }}
                  >
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li>
                        <Link
                          to={`/${userId}/profile`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <MdAccountCircle style={{ fontSize: "1.25rem" }} />
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/${userId}/post`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <RiArticleFill style={{ fontSize: "1.25rem" }} />
                          Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/${userId}/myDrafts`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <MdPermMedia style={{ fontSize: "1.25rem" }} />
                          Drafts
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to={`/${userId}/admin`}
                          style={{
                            color: "#829b48",
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                          onMouseLeave={(e) => (e.target.style.color = "#829b48")}
                        >
                          <RiAdminFill style={{ fontSize: "1.25rem" }} />
                          Admin
                        </Link>
                      </li> */}
                      <li>
                        <button
                          onClick={handleLogout}
                          style={{ ...buttonStyle, backgroundColor: "#ff8a00" }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
