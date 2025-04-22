import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import './FirstLogin.css';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		document.title = "Login | SmartScheduler";
	}, []);

	const togglePasswordVisibility = () => {
		setShowPassword(prevState => !prevState);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
	
		try {
		  // const response = await axios.post(`${baseUrl}/api/auth/login`,{ username, password });
		  // const token = response.data.token;
		  // localStorage.setItem('token', token);
		  // alert('Login successful!');
			const response = await fetch(`${baseUrl}/api/auth/login`,
				{
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({ username, password }),
				}
				);
			console.log(response);
			const data = await response.json();
			const token = data.token;
			localStorage.setItem('token', token);
			alert('Login successful!');
	
		  // decode role from JWT and redirect accordingly
		  const { role } = jwtDecode(token);
		  if (role === 'caregiver') {
			navigate(`/caregiver/home`);
		  } else {
			navigate('/scheduler/load-data');
		  }
		} catch (err) {
		  setError('Invalid credentials');
		}
	  };
	// Function to handle password input type
	const getPasswordInputType = () => {
		if (showPassword) {
			return 'text';
		}
		return 'password';
	};

	// Function to handle button label
	const getPasswordToggleLabel = () => {
		if (showPassword) {
			return 'Hide';
		}
		return 'Show';
	};

	return (
		<div>
			<nav className="navbar">
				<img src="https://i.imgur.com/GSKsNA8.png" alt="logo"></img>
			</nav>
			<div className="first-login-page-container">
				<form className="first-login-page-form" onSubmit={handleLogin}>
					<h2 className="first-login-page-title">Login</h2>

					<div className="first-login-page-form-group">
						<label htmlFor="username" className="first-login-page-label">Username</label>
						<input
							type="text"
							id="username"
							className="first-login-page-input"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="first-login-page-form-group">
						<label htmlFor="password" className="first-login-page-label">Password</label>
						<div className="password-input-container">
							<input
								type={getPasswordInputType()}
								id="password"
								className="first-login-page-input"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="password-toggle-button"
								onClick={togglePasswordVisibility}
							>
								{getPasswordToggleLabel()}
							</button>
						</div>
					</div>

					<button type="submit" className="first-login-page-button">Login</button>

					{error && (
						<p style={{color: 'red'}}>{error}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginPage;