import React, { useState } from 'react';
import axios from 'axios';
import './LoadData.css';

function LoadData() {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/upload-csv', formData, {
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
