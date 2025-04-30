// src/pages/Scheduler/Availability/Availability.js

/**
     * Availability Component
     * 
     * This component renders a form to update a caregiver's availability.
     * Users can add or remove availability for a caregiver by specifying the name, date, and time.
     * The form supports dynamic state updates and handles form submission.
*/

import React, {useEffect, useState} from 'react';
import './Availability.css';
import {useNavigate} from "react-router-dom";

function Availability() {
	// State to store form data
	const [formData, setFormData] = useState({
		user_id: '',
		date: '',
		start_time: '',
		end_time: ''
	});
	const [action, setAction] = useState('Add');
	const navigate = useNavigate();
	const today = new Date();
	let fullDate = `${today.getFullYear()}-`;
	let month = today.getMonth() + 1;
	if (month > 9) {
		fullDate += `${month}-`;
	} else {
		fullDate += `0${month}-`;
	}
	let day = today.getDate();
	if (day > 9) {
		fullDate += `${day}`;
	} else {
		fullDate += `0${day}`;
	}

	useEffect(() => {
		document.title = "Availability | SmartScheduler";

	}, []);
	
	/**
		 * Handle input changes in the form fields.
		 * Updates the corresponding field in the formData state.
		 * 
		 * @param {Object} e - The input change event.
	 */
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleActionChange = (e) => {
		setAction(e.target);
	}

	/**
		 * Handle form submission.
		 * Logs the current form data to the console.
		 * 
		 * @param {Object} e - The form submit event.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const baseUrl = process.env.REACT_APP_BASE_URL;
		console.log(formData);
		if (action === "Add") {
			const response = await fetch(`${baseUrl}/api/db/new-availability`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(formData),
			})
			if (!response.ok) {
				alert("Failed to submit. Please try again.");

			} else {
				navigate('/scheduler/find-caregiver');
			}
		}
		else if (action === "Delete") {
			console.log("To be deleted");
		}

	};

	return (
		<div className="availability-container">
		<div className="availability-header">
			<h2>Update Caregiver's Availability</h2>
		</div>
		
		{/* Form Section */}
			<form className="availability-form" onSubmit={handleSubmit}>

				<label>
					Caregiver Name:
					<input
						type="text"
						name="user_id"
						value={formData.user_id}
						onChange={handleFormChange}
						placeholder="Enter caregiver's username"
					/>
				</label>

				<label>
					Date:
					<input
						type="date"
						name="date"
						min={fullDate}
						value={formData.date}
						onChange={handleFormChange}
					/>
				</label>

				<label>
					From:
					<input
						type="time"
						name="start_time"
						value={formData.start_time}
						onChange={handleFormChange}
					/>
				</label>

				<label>
					To:
					<input
						type="time"
						name="end_time"
						value={formData.end_time}
						onChange={handleFormChange}
					/>
				</label>


				{/* Add/Remove Dropdown */}
				<label>
					Action:
					<select name="action" value={action} onChange={handleActionChange}>
						<option value="Add">Add</option>
						<option value="Remove">Remove</option>
					</select>
				</label>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Availability;
