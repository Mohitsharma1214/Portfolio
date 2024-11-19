import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Home.css";
import PortfolioSVG from "../assets/home-main (1).svg"; // Ensure the SVG file is in the correct location

function Home() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Titles for typewriter effect
  const titles = useMemo(() => [
    "Hi there! 👋🏻 I'm Mohit Sharma",
    "Full-Stack Developer",
    "AI Enthusiast",
    "Passionate Problem Solver",
  ], []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTitle = titles[loopIndex % titles.length];
      if (!isDeleting && charIndex < currentTitle.length) {
        setCurrentText((prev) => prev + currentTitle[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    }, 100);

    return () => clearInterval(interval); // Cleanup interval
  }, [charIndex, isDeleting, loopIndex, titles]);

  return (
    <Container fluid className="home">
      <Row className="align-items-center">
        {/* Left Column - Typewriter Text */}
        <Col md={6} className="right">
          <img src={PortfolioSVG} alt="Portfolio SVG" className="svg" />
          
        </Col>
        
        <Col md={6} className="left">
        
          <h1 className="title">{currentText}</h1>
        </Col>
        <br />
        <br />
        {/* Right Column - SVG Image */}
       
      </Row>
    </Container>
  );
}

export default Home;
