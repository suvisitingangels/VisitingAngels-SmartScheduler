// src/pages/Scheduler/LoadData/LoadData.js

/**
 * LoadData Component
 *
 * This component provides a drag-and-drop or file selection interface for uploading a CSV file.
 * The user can choose between uploading a schedule CSV or a classes CSV.
 * The uploaded file is sent to the backend for processing, and the component displays
 * the status of the upload (success or error).
 *
 * @returns {JSX.Element} - A styled file upload interface.
 */
import React, {useEffect, useState} from 'react';
import './LoadData.css';

function LoadData() {
	// State to store the status message of the upload process
	const [uploadStatus, setUploadStatus] = useState('');
	// State to indicate whether a file is being dragged over the drop zone
	const [isDragging, setIsDragging] = useState(false);
	// State to track the type of CSV file being uploaded ("schedule" or "classes")
	const [csvType, setCsvType] = useState('schedule');

	const baseUrl = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		document.title = "Load Data | SmartScheduler";
	}, []);

	/**
	 * Handles the file upload process.
	 * Sends the selected file to the appropriate backend API endpoint based on the CSV type.
	 *
	 * @param {File} file - The file to be uploaded.
	 */
	const handleFileUpload = async (file) => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		setUploadStatus("Uploading...");

		// Determine the endpoint based on the selected CSV type.
		let endpoint = '';
		if (csvType === 'schedule') {
			endpoint = `${baseUrl}/api/upload-schedule-csv`;
		} else if (csvType === 'classes') {
			endpoint = `${baseUrl}/api/upload-classes-csv`;
		}

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
			});
			const payload = await response.json();

			if (!response.ok) {
				setUploadStatus(payload.error || 'Unknown upload error');
				throw new Error(`Server responded ${response.status}: ${response.statusText}`);
			}

			setUploadStatus(payload.message);
		} catch (error) {
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

	/**
	 * Handles the CSV type selection change.
	 *
	 * @param {Object} e - The change event from the radio buttons.
	 */
	const handleCsvTypeChange = (e) => {
		setCsvType(e.target.value);
	};

	return (
		<div className={"mobile-container"}>
			<h1 className="page-header">Load Data</h1>

			{/* CSV Type Selector */}
			<div id="csv-type-selector">
				<label>
					<input
						type="radio"
						value="schedule"
						checked={csvType === 'schedule'}
						onChange={handleCsvTypeChange}
					/>
					Schedule CSV
				</label>

				<label>
					<input
						type="radio"
						value="classes"
						checked={csvType === 'classes'}
						onChange={handleCsvTypeChange}
					/>
					Classes CSV
				</label>
			</div>

			<div
				className={`drop-zone ${isDragging ? 'dragging' : ''}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<p>{isDragging ? 'Drop the file here...' : 'Drag and drop a file here, or click to upload'}</p>
				<input
					type="file"
					accept=".csv"
					onChange={handleInputChange}
					style={{display: 'none'}}
					id="fileInput"
				/>

				<label htmlFor="fileInput" id="upload-btn">
					Select File
				</label>
			</div>
			<p id={"upload-status"}>{uploadStatus}</p>
		</div>
	);
}

export default LoadData;
