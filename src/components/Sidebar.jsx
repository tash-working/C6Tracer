import React, { useState } from 'react';
import { RiArticleFill } from 'react-icons/ri';
import { MdPermMedia } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // For styling
import { BiSolidDonateHeart } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userId = JSON.parse(localStorage.getItem("id")); // Get user ID from localStorage

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav>
        <ul>
   
            <Link
              to={`/${userId}/post`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
             
             <li>  <RiArticleFill />{isOpen && <span>Submit Report</span>}</li>
            </Link>
        
   
            <Link
              to={`/${userId}/myDrafts`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
             
             <li>  <MdPermMedia />{isOpen && <span>My Draft</span>}</li>
            </Link>
            <hr style={{
                color: "#829b48",
                
              }}/>
              <Link
              to={`/${userId}/donate`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
             
             <li>  <BiSolidDonateHeart />{isOpen && <span>Donate</span>}</li>
            </Link>
            <Link
              to={`/${userId}/trade`}
              style={{
                color: "#829b48",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
              onMouseLeave={(e) => (e.target.style.color = "#829b48")}
            >
             
             <li>  <FaExchangeAlt />{isOpen && <span>Trade</span>}</li>
            </Link>
          
        
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
