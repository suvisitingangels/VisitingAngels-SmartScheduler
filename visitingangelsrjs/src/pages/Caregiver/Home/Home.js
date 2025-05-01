import React, {useEffect, useState} from 'react';
import './Home.css';
import {jwtDecode} from "jwt-decode";

function Home() {
	const [availabilityList, setAvailabilityList] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchAvailabilities = async () => {
			const token = localStorage.getItem('token');
			if (!token) return setError('Not logged in');
			const {username} = jwtDecode(token);
			const baseUrl = process.env.REACT_APP_BASE_URL;

			try {
				const response = await fetch(`${baseUrl}/api/db/filtered-availabilities/${username}`);
				if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
				let data = await response.json();
				data = data.availabilities;
				for (let i = 0; i < data.length; i++) {
					let date = data[i].available_date;
					date = date.split("T")[0];
					data[i].available_date = date;

					let startTime = data[i].start_time;
					startTime = startTime.slice(0, startTime.length - 3);
					data[i].start_time = startTime;

					let endTime = data[i].end_time;
					endTime = endTime.slice(0, endTime.length - 3);
					data[i].end_time = endTime;

				}
				setAvailabilityList(data);

			} catch (e) {
				console.error(e);
				setError('Failed to fetch your availabilities');
			}
		};
		fetchAvailabilities();
		document.title = "Home | SmartScheduler";
	}, []);

	function handleDelete() {
		console.log("to be deleted");
	}

	if (error) {
		return (
			<div>
				{error}
			</div>
		)
	}
	return (
		<div className={"availabilites-list"}>
			<h1 className={"title"}>Availability</h1>
			{availabilityList.length <= 0 ? (<div>No availabilities</div>) : (
				<ul>
					{availabilityList.map((availability) => (
						<li key={availability.id} className={"availability-card"}>
						<span>
							<div className={"date-info"}>
								<div><b>Date: {availability.available_date}</b></div>
								<div>{availability.start_time} - {availability.end_time}</div>
							</div>
							{/*<button className={"delete-option"}>Trash</button>*/}
							<img onClick={handleDelete} className={"delete-option"}
								 src={"https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png"}
								 alt={"trash"}/>
						</span>

						</li>
					))}
				</ul>
			)}

		</div>
	)
}

export default Home;