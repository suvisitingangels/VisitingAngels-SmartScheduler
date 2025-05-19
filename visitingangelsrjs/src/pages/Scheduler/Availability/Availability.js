// visitingangelsrjs/src/pages/Scheduler/Availability/Availability.js

/**
     * Availability Component
     * 
     * This component renders a form to update a caregiver's availability.
     * Users can add or remove availability for a caregiver by specifying the name, date, and time.
     * The form supports dynamic state updates and handles form submission.
*/

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Availability.css';
import getFullDate from '../../../components/fetchDate';

function Availability() {
	const [action, setAction] = useState('Add');
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		user_id: '',
		date: '',
		start_time: '',
		end_time: '',
		recurring: "none",
		numRecurrences: 1
	});
	const minDate = getFullDate();

	useEffect(() => {
		document.title = "Availability | SmartScheduler";
	}, []);

	// Update the formData every time the user clicks out of a form box
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Update the action based on the user's choice to add or delete an availability
	const handleActionChange = (e) => {
		setAction(e.target.value);
	}

	// Verify the user_id is all lowercase and the end time is after the start time, else alert
	// Send form to dbController to insert into database
	// Add: redirect to scheduler/find-caregiver
	// Remove: alert confirmation
	const handleSubmit = async (e) => {
		e.preventDefault();
		const baseUrl = process.env.REACT_APP_BASE_URL;

		formData.user_id = formData.user_id.toLowerCase();
		// User error alerts
		if (formData.date === "" || formData.start_time === "" || formData.end_time === "") {
			alert("Please fill in all fields.");
			return;
		}
		if (formData.end_time < formData.start_time) {
			alert("End time needs to be after start time.");
			return;
		}

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
		else if (action === "Remove") {
			console.log("To be deleted");
			const response = await fetch(`${baseUrl}/api/db/availability`,
				{method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(formData)
				});
			if (response.status === 404 || response.status === 500) {
				alert("Availability not found.")
			} else {
				alert("Availability deleted.")
			}
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
						min={minDate}
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
