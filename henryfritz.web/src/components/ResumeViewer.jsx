import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../styles/ResumeViewer.css'; // We'll create this for styling

// Set worker source (required by react-pdf) - Use local path
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.min.mjs';

const ResumeViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Start on first page
  const [scale, setScale] = useState(1.0); // Initial scale

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  // Note: Pinch-to-zoom is complex to implement manually here.
  // react-pdf itself doesn't have built-in pinch-zoom on the component level.
  // The underlying browser/PDF viewer might handle it, but it's inconsistent.
  // For better mobile zoom, consider libraries like react-zoom-pan-pinch 
  // wrapping the Document/Page, or rely on the download link for detailed viewing.

  return (
    <div className="resume-viewer-container">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error} // Log errors
        className="resume-document"
      >
        {/* Render all pages */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page 
            key={`page_${index + 1}`} 
            pageNumber={index + 1} 
            scale={scale}
            renderTextLayer={false} // Optional: improve performance if text selection isn't needed
            className="resume-page"
           />
        ))}
      </Document>
    </div>
  );
};

export default ResumeViewer; 