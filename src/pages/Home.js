import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [dots, setDots] = useState([]);

  const handleClick = (e) => {
    const newDot = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setDots((prevDots) => [...prevDots, newDot]);

    // Remove the dot after 2 seconds
    setTimeout(() => {
      setDots((prevDots) => prevDots.filter((dot) => dot.id !== newDot.id));
    }, 2000);
  };

  return (
    <div className="home" onClick={handleClick}>
      <h1 className="title">I’m Mohit Sharma</h1>
      <p className="subtitle">Computer Vision Enthusiast | AI & Data Science Student</p>

      <div className="home-content">
        <div className="intro">
          <h2>LET ME INTRODUCE MYSELF</h2>
          <p>
            Hello! I'm Mohit Sharma, a BTech student specializing in Artificial Intelligence and Data Science.
          </p>
          <p>
            I am fluent in classics like Python, JavaScript, and C++.
          </p>
          <p>
            My fields of interest include building new Web Technologies and Products, as well as delving into Artificial Intelligence and Data Science.
          </p>
          <p>
            I enjoy applying my passion for developing products with Node.js and modern JavaScript libraries and frameworks like React.js and Next.js.
          </p>
          <p>
            In my free time, I love talking and researching about space.
          </p>
        </div>

        <div className="avatar">
          <img src="your-avatar-url-here" alt="Mohit Sharma" />
        </div>

        <div className="find-me">
          <h3>FIND ME ON</h3>
          <p>Feel free to connect with me:</p>
          <ul>
            <li><a href="https://www.linkedin.com/in/mohitsharmas78/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/mohitsharma1214" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="mailto:ptms2525@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>

      {/* Render dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="dot"
          style={{
            left: `${dot.x - 5}px`, // Offset to center the dot on the click point
            top: `${dot.y - 5}px`, // Offset to center the dot on the click point
          }}
        ></div>
      ))}

      <div className="svg-placeholder">
        {/* Replace with your actual SVG */}
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="50" r="30" fill="brown" />
          <rect x="70" y="100" width="60" height="20" fill="green" />
          <rect x="90" y="120" width="20" height="30" fill="blue" />
          <rect x="80" y="130" width="40" height="20" fill="brown" />
        </svg>
        <p>Student sitting at a table</p>
      </div>
    </div>
  );
}

export default Home;
