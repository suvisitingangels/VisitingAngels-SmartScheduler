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

const today = new Date();
function Availability() {
	// State to store form data
	const [formData, setFormData] = useState({
		caregiverName: '',
		date: '',
		startTime: '',
		endTime: ''
	});
	const [caregiverName, setCaregiverName] = useState('FirstName LastName');

	/**
	 * Handle input changes in the form fields.
	 * Updates the corresponding field in the formData state.
	 *
	 * @param {Object} e - The input change event.
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};


	/**
	 * Handle form submission.
	 * Logs the current form data to the console.
	 *
	 * @param {Object} e - The form submit event.
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Submission successful!")
		console.log(formData);
	};

	return (
		<div className="availability-container">
			<div className="availability-header">
				<h2>Update Availability</h2>
			</div>

			{/* Form Section */}
			<form className="availability-form" onSubmit={handleSubmit}>

				<label>
					Caregiver Name:
					<input
						type={"text"}
						id={"caregiver-name"}
						readOnly
						value={caregiverName}
					/>
				</label>

				<label>
					Date:
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
					/>
				</label>

				<label>
					From:
					<input
						type="time"
						name="startTime"
						value={formData.startTime}
						onChange={handleChange}
					/>
				</label>

				<label>
					To:
					<input
						type="time"
						name="endTime"
						value={formData.endTime}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default Availability;
