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
import {jwtDecode} from "jwt-decode";
import './Availability.css';
import getFullDate from '../../../components/fetchDate';

function Availability() {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const minDate = getFullDate();

	// State to store form data
	const [formData, setFormData] = useState({
		user_id: '',
		date: '',
		start_time: '',
		end_time: '',
		recurring: 'none',
		numRecurrences: 1
	});

	useEffect(() => {
		function fetchUsername() {
			const token = localStorage.getItem('token');
			if (!token) return setError('Not logged in');
			const {username} = jwtDecode(token);
			setFormData({ ...formData, user_id: username });
		}

		document.title = "Availability | SmartScheduler";
		fetchUsername();

	}, [formData]);

	// update the formData every time the user clicks out of a form box
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		//console.log(formData);
	};

	// Verify that the end time is after the start time, else alert
	// Send form to dbController to insert into database
	// Redirect to caregiver/home
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(formData);
		const baseUrl = process.env.REACT_APP_BASE_URL;

		// User error alerts
		if (formData.date === "" || formData.start_time === "" || formData.end_time === "") {
			alert("Please fill in all fields.");
			return;
		}
		if (formData.end_time < formData.start_time) {
			alert("End time needs to be after start time.");
			return;
		}

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
			<h1 className="page-header">Update Availability</h1>

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
						min={minDate}
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

				<label className={"recurring-list"}>
					Recurring:
					<select name={"recurring"} onChange={handleChange}>
						<option value={"none"}>None</option>
						<option value={"weekly"}>Weekly</option>
						<option value={"biweekly"}>Biweekly</option>
					</select>
				</label>

				<div className={"num-recurrences"}>
					<span>End after: </span>
					<input
						type={"text"}
						name={"numRecurrences"}
						value={formData.numRecurrences}
						onChange={handleChange}
					/>
					<span>occurrences</span>
				</div>

				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default Availability;