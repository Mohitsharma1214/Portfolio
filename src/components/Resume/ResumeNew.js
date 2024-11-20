import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import pdf from '../../Assets/Mohit_resume.pdf';

const workerUrl = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

function ResumeNew() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        paddingTop: '110px', 
        paddingBottom: '30px', 
        backgroundImage: 'var(--section-background-color)', // Assuming the CSS variable is defined somewhere
        color: 'white', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    >
      <Worker workerUrl={workerUrl}>
        <div 
          style={{
            display: 'flex',               // Apply display flex here for Resume Viewer
            width: '90%',
            height: '80vh',
            maxWidth: '800px',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            margin: '0 auto',
            justifyContent: 'center',      // Center content horizontally
            alignItems: 'center',          // Center content vertically
            overflow: 'hidden',
          }}
        >
          <Viewer
            fileUrl={pdf}
            onLoadSuccess={onLoadSuccess}
            initialPage={pageNumber - 1}
            renderMode="svg"
            scale={0.8}
          />
        </div>
      </Worker>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a 
          role="button" 
          tabindex="0" 
          href="/static/media/Mohit_resume.9dceb983d0f2f3376bda.pdf" 
          target="_blank" 
          className="btn btn-primary"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            maxWidth: '250px',
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 1024 1024" 
            height="1.2em"
            width="1.2em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          >
            <path d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
          </svg>
          Download CV
        </a>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={goToPreviousPage} 
          disabled={pageNumber <= 1} 
          style={{ marginRight: '10px', fontSize: '14px' }}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button 
          onClick={goToNextPage} 
          disabled={pageNumber >= numPages} 
          style={{ marginLeft: '10px', fontSize: '14px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ResumeNew;
