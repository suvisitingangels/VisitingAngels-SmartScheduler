import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import emailjs from "@emailjs/browser";
import {useNavigate} from "react-router-dom";
import './EditProfileForm.css'

function EditProfileForm() {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [oldProfile, setOldProfile] = useState({})
	const [updatedProfile, setUpdatedProfile] = useState({});

	emailjs.init({
		publicKey: 'GlWU8zI8vAFAiPn_m',
		// Do not allow headless browsers
		blockHeadless: true,
		blockList: {
			// Block the suspended emails
			// The variable contains the email address
			watchVariable: 'userEmail',
		},
		limitRate: {
			// Set the limit rate for the application
			id: 'app',
			// Allow 1 request per 10s
			throttle: 10000,
		},
	});



	useEffect(() => {
		async function fetchProfile() {
			// grab token & decode user_id
			const token = localStorage.getItem('token');
			if (!token) return setError('Not logged in');
			const { username } = jwtDecode(token);
			setUsername(username);
			const baseUrl = process.env.REACT_APP_BASE_URL;

			const response = await fetch(`${baseUrl}/api/db/${username}`);
			if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
			let data = await response.json();
			data = data.rows[0];
			setOldProfile(data);
			setUpdatedProfile(data);
			return data;
		}
		fetchProfile();
		document.title = "Edit Profile | SmartScheduler";
	}, []);

	function sendEmail (e, name, info, data) {
		e.preventDefault();
		emailjs.send("service_b8vkw8f","template_k5leyaa",{
			caregiver: `${name}`,
			info: `${info}`,
			data: `${data}`,
		}).then(() => {
				console.log("Success");
			}, (error) => {
				console.log('FAILED', error.text);
			},
		);
	}

	function handleChange(e) {
		const {name, value} = e.target;
		setUpdatedProfile({...updatedProfile, [name]: `${value}`});
		console.log(updatedProfile);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(updatedProfile);

		// Data validation
		for (let [key, value] of Object.entries(updatedProfile)) {
			if (key === "first_name" || key === "last_name") {
				value = value[0].toUpperCase() + value.slice(1);
			}
		}

		const submitForm = {}

		for (const [key, value] of Object.entries(updatedProfile)) {
			if (updatedProfile[key] !== oldProfile[key]) {
				submitForm[key] = value;
			}
		}

		// Update DB
		const baseUrl = process.env.REACT_APP_BASE_URL;

		const response = await fetch(`${baseUrl}/api/db/${username}/update-availability`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(submitForm)
		});
		console.log(response);
		if (!response.ok) {
			alert("Failed to update. Please try again.");
		} else {
			navigate(`/caregiver/profile/${username}`);
		}

		const caregiverName = `${updatedProfile.first_name} ${updatedProfile.last_name}`;
		for (const [key, value] of Object.entries(submitForm)) {
			sendEmail(e, caregiverName, key, value);
		}
	}

	return (
		<div className={"edit-profile-container"}>
				<h1 className={"page-header"}>Edit Profile</h1>

			<form onSubmit={handleSubmit} className={"edit-profile-form"}>
				<label>
					First Name:
					<input
						type={"text"}
						name={"first_name"}
						value={updatedProfile.first_name}
						placeholder={updatedProfile.first_name}
						onChange={handleChange}
					/>
				</label>

				<label>
					Last Name:
					<input
						type={"text"}
						name={"last_name"}
						value={updatedProfile.last_name}
						onChange={handleChange}
					/>
				</label>

				<label>
					Phone Number:
					<input
						type={"tel"}
						name={"mobile"}
						pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
						required
						value={updatedProfile.mobile}
						onChange={handleChange}
					/>
				</label>

				<label>
					Email:
					<input
						type={"text"}
						name={"email"}
						value={updatedProfile.email}
						onChange={handleChange}
					/>
				</label>

				<label>
					Address:
					<textarea
						type={"text"}
						name={"address"}
						value={updatedProfile.address}
						onChange={handleChange}
					/>
				</label>

				<div className={"form-buttons"}>
					<button type={"submit"}>Save</button>
					<button onClick={() => navigate(`/caregiver/profile/${username}`)}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default EditProfileForm;