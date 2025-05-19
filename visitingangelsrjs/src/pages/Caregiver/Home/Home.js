import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './Home.css';
import {useNavigate} from "react-router-dom";

function Home() {
    const [availabilityList, setAvailabilityList] = useState([]);
    const [error, setError] = useState('');
    const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	useEffect(() => {
		function to12Hour(time24) {
			const [hStr, m] = time24.split(':');
			let h = parseInt(hStr, 10);
			const suffix = h >= 12 ? 'pm' : 'am';
			h = h % 12 || 12;           // map 0→12, 13→1, 12→12
			return `${h}:${m}${suffix}`;
			}

		const fetchAvailabilities = async () => {
			const token = localStorage.getItem('token');
			if (!token) return setError('Not logged in');
			const {username} = jwtDecode(token);

			// Delete all past availabilities
			try {
				await fetch(`${baseUrl}/api/db/past-availability`, {method: 'DELETE'});
			} catch (e) {
				console.error(e);
			}

			// Fetch current availabilities
			try {
				const response = await fetch(`${baseUrl}/api/db/filtered-availabilities/${username}`);
				if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
				let data = await response.json();
				data = data.availabilities;

				// parse data to reformat times
        		for (let i = 0; i < data.length; i++) {
					let date = data[i].available_date;
					date = date.split("T")[0];
					data[i].available_date = date;

					let startTime = data[i].start_time;
					startTime = startTime.slice(0, startTime.length - 3);
					data[i].start_time = to12Hour(startTime);

					let endTime = data[i].end_time;
					endTime = endTime.slice(0, endTime.length - 3);
					data[i].end_time = to12Hour(endTime);
				}
				setAvailabilityList(data);
			} catch (e) {
				console.error(e);
				setError('Failed to fetch your availabilities');
			}
		};
		fetchAvailabilities();
		document.title = "Home | SmartScheduler";
	}, [baseUrl]);

    async function handleDelete(id) {
        try {
            await fetch(`${baseUrl}/api/db/availability/${id}`, { method: 'DELETE' });
            window.location.reload();
        } catch (e) {
            console.error(e);
            setError('Failed to delete availability');
        }
    }

    if (error) return <div>{error}</div>;

    return (
        <div className="availabilites-list">
            <h1 className="page-header">Availability</h1>
            {availabilityList.length <= 0 ? (
				<div className={"no-availability"}>
					<label>
						No availability
					</label>
					<button onClick={() => navigate('/caregiver/availability')}>
						Add availability
					</button>
				</div>
			) : (
				<ul>
					{availabilityList.map((availability) => (
						<li key={availability.id} className="availability-card">
                            <span>
                                <div className="date-info">
                                    <div><b>Date: {availability.available_date}</b></div>
                                    <div>{availability.start_time} - {availability.end_time}</div>
                                </div>
                                <img
                                    onClick={() => handleDelete(availability.id)}
                                    className="delete-option"
                                    src="https://i.imgur.com/YilbdXD.png"
                                    alt="trash"
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;