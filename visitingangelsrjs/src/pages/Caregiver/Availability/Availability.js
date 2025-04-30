// src/pages/Caregiver/Availability/Availability.js
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
import {jwtDecode} from "jwt-decode";

function Availability() {
	// State to store form data
	const [formData, setFormData] = useState({
		user_id: '',
		date: '',
		start_time: '',
		end_time: ''
	});
	const [error, setError] = useState(null);
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
		function fetchUsername() {
			const token = localStorage.getItem('token');
			if (!token) return setError('Not logged in');
			const {username} = jwtDecode(token);
			setFormData(prevData => ({...prevData, user_id: username}));
		}
		fetchUsername();
		document.title = "Availability | SmartScheduler";

	}, []);

	/**q
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		const baseUrl = process.env.REACT_APP_BASE_URL;

		// TODO: need to fetch to database once submitted and then we can send submission alert
		const response = await fetch(`${baseUrl}/api/db/new-availability`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData),
		})
		if (!response.ok) {
			alert("Failed to submit. Please try again.");
		} else {
			navigate('/caregiver/home');
		}

	};

	if (error) return <p>{error}</p>

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
						value={formData.user_id}
					/>
				</label>

				<label>
					Date:
					<input
						type="date"
						name="date"
						min={fullDate}
						value={formData.date}
						onChange={handleChange}
					/>
				</label>

				<label>
					From:
					<input
						type="time"
						name="start_time"
						value={formData.start_time}
						onChange={handleChange}
					/>
				</label>

				<label>
					To:
					<input
						type="time"
						name="end_time"
						value={formData.end_time}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default Availability;
