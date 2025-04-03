// src/pages/Caregiver/Availability.js

/**
 * Availability Component
 *
 * This component renders a form to update a caregiver's availability.
 * Users can add or remove availability for a caregiver by specifying the name, date, and time.
 * The form supports dynamic state updates and handles form submission.
 */

import React, {useState} from 'react';
import './Availability.css';

function Availability() {
	// State to store form data
	const [formData, setFormData] = useState({
		caregiverName: '',
		date: '',
		time: '',
		action: 'Add',
	});
	const [caregiverName, setCaregiverName] = useState("FirstName LastName")
	//

	/**
	 * Handle input changes in the form fields.
	 * Updates the corresponding field in the formData state.
	 *
	 * @param {Object} e - The input change event.
	 */
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};


	/**
	 * Handle form submission.
	 * Logs the current form data to the console.
	 *
	 * @param {Object} e - The form submit event.
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="availability-container">
			<div className="availability-header">
				<h2>Enter Availability</h2>
			</div>

			{/* Form Section */}
			<form className="availability-form" onSubmit={handleSubmit}>
				{/*<h3>Enter Availability</h3>*/}

				<label>
					Caregiver Name:
					<div className={"caregiver-name"}><b>{caregiverName}</b></div>
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
					Time:
					<input
						type="time"
						name="time"
						value={formData.time}
						onChange={handleChange}
					/>
				</label>

				{/* Add/Remove Dropdown */}
				<label>
					Action:
					<select name="action" value={formData.action} onChange={handleChange}>
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
