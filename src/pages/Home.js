import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../components/Particle";
import "./Home.css"; // Make sure to import your Particle component
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import homeLogo from "../assets/home-main.svg"; // Your home image
import myImg from "../assets/avatar.svg"; // Your avatar image

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Artificial Intelligence Enthusiast",
          "Machine Learning Engineer",
          "Web Developer",
          "Full-stack Developer",
          "Computer vision Enthusiast",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
      }}
    />
  );
}

function Home() {
  return (
    <section>
<Container fluid className="home-section" id="home">
  <Particle />
  <Container className="home-content">
    <Row>
      {/* Text Section */}
      <Col md={7} className="home-header">
        <h1 className="heading">
          Hi There!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋🏻
          </span>
        </h1>
        <h1 className="heading-name">
          I'M
          <strong className="main-name"> Mohit Sharma</strong>
        </h1>
        <div className="typewriter-container">
          <Type />
        </div>
      </Col>

      {/* Illustration Section */}
      <Col md={5} className="home-illustration">
        <img
          src={homeLogo}
          alt="home illustration"
          className="img-fluid"
        />
      </Col>
    </Row>
  </Container>
</Container>


      {/* About Section */}
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
              <p className="home-about-body">
                Hello! I'm Mohit Sharma, a BTech student specializing in
                Artificial Intelligence and Data Science.
                <br />
                <br />
                I am fluent in classics like
                <i>
                  <b className="purple"> Python, JavaScript, and C++. </b>
                </i>
                <br />
                <br />
                My fields of interest include building new &nbsp;
                <i>
                  <b className="purple">Web Technologies and Products </b> and
                  also delving into{" "}
                  <b className="purple">
                    Artificial Intelligence and Data Science.
                  </b>
                </i>
                <br />
                <br />
                I enjoy applying my passion for developing products with
                <b className="purple"> Node.js</b> and modern JavaScript libraries and frameworks like
                <i>
                  <b className="purple"> React.js and Next.js</b>
                </i>.
                <br />
                <br />
                In my free time, I love talking and researching about
                <i>
                  <b className="purple"> space</b>
                </i>.
              </p>
            </Col>
            <Col md={4} className="myAvtar">
              <Tilt>
                <img src={myImg} className="img-fluid" alt="avatar" />
              </Tilt>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="home-about-social">
              <h1>FIND ME ON</h1>
              <p>
                Feel free to <span className="purple">connect </span>with me
              </p>
              <ul className="home-about-social-links">
                <li className="social-icons">
                  <a
                    href="https://github.com/Mohitsharma1214"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://x.com/MohitSh39760354/"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiOutlineTwitter />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.linkedin.com/in/mohitsharmas78/"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.instagram.com/mohitsharmas_"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillInstagram />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
