// src/pages/Scheduler/LoadData/LoadData.js

/**
     * LoadData Component
     * 
     * This component provides a drag-and-drop or file selection interface for uploading a CSV file.
     * The uploaded file is sent to the backend for processing, and the component displays
     * the status of the upload (success or error).
     * 
     * @returns {JSX.Element} - A styled file upload interface.
*/
import React, { useState } from 'react';
import axios from 'axios';
import './LoadData.css';

function LoadData() {
  // State to store the status message of the upload process
  const [uploadStatus, setUploadStatus] = useState('');
  // State to indicate whether a file is being dragged over the drop zone
  const [isDragging, setIsDragging] = useState(false);


  /**
       * Handles the file upload process.
       * Sends the selected file to the backend API using Axios.
       * 
       * @param {File} file - The file to be uploaded.
  */
  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('File uploaded and processed successfully!');
    } catch (error) {
      setUploadStatus('Error uploading file.');
      console.error('Upload error:', error);
    }
  };


  /**
       * Drag-and-Drop Event Handlers
       * 
       * These handlers manage the drag-and-drop behavior for file uploads.
  */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  /**
       * Handles file selection via the input element.
       * 
       * @param {Object} e - The input change event.
  */
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      <h1 className='load-data-h1'>Load Data</h1>
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{isDragging ? 'Drop the file here...' : 'Drag and drop a file here, or click to upload'}</p>
        <input type="file" accept=".csv" onChange={handleInputChange} style={{ display: 'none' }} id="fileInput" />
        <label htmlFor="fileInput" className="upload-btn">
          Select File
        </label>
      </div>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default LoadData;
