// src/pages/Caregiver/Profile/Profile.js
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { jwtDecode } from 'jwt-decode';    // corrected import
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
	  async function fetchProfile() {
		  // grab token & decode user_id
		  const token = localStorage.getItem('token');
		  if (!token) return setError('Not logged in');
		  const { username } = jwtDecode(token);

		  const baseUrl = process.env.REACT_APP_BASE_URL;
		  // axios.get(`${baseUrl}/api/db/caregiver/${username}`)
			//   .then(({ data }) => setProfile(data))
			//   .catch(err => {
			// 	  console.error('Error fetching profile:', err);
			// 	  setError('Could not load profile');
			//   });
		    const response = await fetch(`${baseUrl}/api/db/caregiver/${username}`);
		    if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
		  	let data = await response.json();
		  	data = data.rows[0];
		  	console.log(data);
		  	setProfile(data);
	  }
	  fetchProfile();
	  document.title = "Profile | SmartScheduler";


  }, []);

  if (error)   return <p style={{color:'red'}}>{error}</p>;
  if (!profile) return <p>Loading…</p>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-card">
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Role:</strong> {profile.status}</p>
        <p><strong>Phone:</strong> {profile.mobile}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Address:</strong> {profile.address}</p>
      </div>
    </div>
  );
}
// TODO: add an edit button

export default Profile;
