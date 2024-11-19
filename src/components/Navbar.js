import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobile(false)}>
          <img src={logo} alt="My Portfolio Logo" />
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="menu-icon" onClick={() => setIsMobile(!isMobile)}>
          <i className={isMobile ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Navigation links */}
        <ul className={`nav-menu ${isMobile ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsMobile(false)}>
              {/* Home SVG Icon */}
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={() => setIsMobile(false)}>
              {/* Person Icon for About */}
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" />
              </svg>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-links" onClick={() => setIsMobile(false)}>
              {/* TV with High Peak Graph SVG Icon for Projects */}
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M18 5h-2V3h-8v2H6c-1.1 0-1.99.9-1.99 2L4 17c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM6 3h12v2H6V3zm12 14H6v-8h12v8zM8 12h8v2H8z" />
              </svg>
              Projects
            </Link>
          </li>
          <li className="nav-item">
  <Link to="/resume" className="nav-links" onClick={() => setIsMobile(false)}>
    {/* Resume Icon with SVG */}
    <svg
      stroke="currentColor"
      fill="currentColor" // Ensure it uses the text color
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1.5em"  // Adjust the size of the icon as needed
      width="1.5em"   // Adjust the size of the icon as needed
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: "2px" }} // Adjust the alignment of the icon
    >
      <path d="M7 18H17V16H7V18Z"></path>
      <path d="M17 14H7V12H17V14Z"></path>
      <path d="M7 10H11V8H7V10Z"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
      ></path>
    </svg>
    Resume
  </Link>
</li>

    
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
