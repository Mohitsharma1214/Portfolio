import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import driver from "../../Assets/Projects/driver.png";
import squash from "../../Assets/Projects/squash.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={driver}
              isBlog={false}
              title="Driver Drowsiness Detection System"
              description="This project is a driver drowsiness detection system that aims to prevent accidents caused by drowsy driving. It detects drowsiness in real-time by analyzing the driver's facial features and behavior using computer vision techniques."
              ghLink="https://github.com/Mohitsharma1214/Driver-Drowsiness-Detection-System"
             
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={squash}
              isBlog={false}
              title="Squash Game Player Detection"
              description="This project is a squash game player detection system that aims to detect the player in real-time by analyzing the player's facial features and behavior using computer vision techniques."
              ghLink="https://drive.google.com/drive/folders/1OnXBhIHmCQD9tugbaRfZTP93BRnuJZbB?usp=drive_link"
            />
          </Col>

        
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;