import React from "react";
import Card from "react-bootstrap/Card";
import { AiFillHeart } from "react-icons/ai";
import { MdSchool } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Mohit Sharma </span>
            from <span className="purple"> India.</span>
            <br />I am a BTech student specializing in Artificial Intelligence and Data Science.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <AiFillHeart /> Researching about space
            </li>
            <li className="about-activity">
              <MdSchool /> Learning new technologies
            </li>
            <li className="about-activity">
              <BsFillBriefcaseFill /> Developing AI models
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;