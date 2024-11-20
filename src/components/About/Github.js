import React, { useEffect } from "react";

// Import the library's default responsive CSS
import "github-calendar/dist/github-calendar-responsive.css";

function GithubCalendar() {
  useEffect(() => {
    // Dynamically import the GitHubCalendar library
    import("github-calendar").then((module) => {
      const GitHubCalendar = module.default;
      // Initialize the GitHub Calendar with your username and responsive settings
      GitHubCalendar(".calendar", "Mohitsharma1214", { responsive: true });
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a", // Dark black-gray background
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.8)",
      }}
    >
      <h1
        className="project-heading"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#cccccc", // Light gray for the text
          fontWeight: "bold",
        }}
      >
        Days I <strong style={{ color: "#5a5a5a" }}>Code</strong>
      </h1>
      {/* Calendar container */}
      <div className="calendar" style={{ textAlign: "center", color: "#888888" }}>
        Loading the data just for you...
      </div>
    </div>
  );
}

export default GithubCalendar;
