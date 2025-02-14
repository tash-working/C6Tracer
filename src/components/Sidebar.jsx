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
                color: "#ff8a00",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#0096FF")}
              onMouseLeave={(e) => (e.target.style.color = "#ff8a00")}
            >
             
             <li>  <RiArticleFill />{isOpen && <span>Submit Report</span>}</li>
            </Link>
        
   
            <Link
              to={`/${userId}/myDrafts`}
              style={{
                color: "#ff8a00",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#0096FF")}
              onMouseLeave={(e) => (e.target.style.color = "#ff8a00")}
            >
             
             <li>  <MdPermMedia />{isOpen && <span>My Draft</span>}</li>
            </Link>
            <hr style={{
                color: "#ff8a00",
                
              }}/>
              <Link
              to={`/${userId}/donate`}
              style={{
                color: "#ff8a00",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#0096FF")}
              onMouseLeave={(e) => (e.target.style.color = "#ff8a00")}
            >
             
             <li>  <BiSolidDonateHeart />{isOpen && <span>Donate</span>}</li>
            </Link>
            <Link
              to={`/${userId}/trade`}
              style={{
                color: "#ff8a00",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#0096FF")}
              onMouseLeave={(e) => (e.target.style.color = "#ff8a00")}
            >
             
             <li>  <FaExchangeAlt />{isOpen && <span>Trade</span>}</li>
            </Link>
          
        
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
