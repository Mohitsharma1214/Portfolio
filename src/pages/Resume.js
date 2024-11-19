import React from "react";

function Resume() {
    return (
        <div>
            <h1>My Resume</h1>
            <p>Below is a summary of my professional experience and skills:</p>
            <ul>
                <li><strong>Education:</strong> BTech in AI & Data Science</li>
                <li><strong>Skills:</strong> Python, React, Machine Learning, Computer Vision</li>
                <li><strong>Experience:</strong> Junior Developer Intern at Skyline Meridian</li>
                {/* Add more sections as needed */}
            </ul>
            <p>
                <a href="path/to/your-resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download My Resume
                </a>
            </p>
        </div>
    );
}

export default Resume;
