import React, {useEffect, useState} from 'react';
import './FirstLogin.css';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		document.title = "Login | SmartScheduler";
	}, [error, loading]);

	const togglePasswordVisibility = () => {
		setShowPassword(prevState => !prevState);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		const response = await fetch(`${baseUrl}/api/auth/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ username, password }),
			});

		if (!response.ok) {
			setLoading(false);
			setError("Invalid credentials");
		} else {
			setError("");
			const data = await response.json();
			const token = data.token;
			localStorage.setItem('token', token);

			// decode role from JWT and redirect accordingly
			setLoading(false)
			const { role } = jwtDecode(token);
			if (role === 'caregiver') {
				navigate(`/caregiver/home`);
			} else {
				navigate('/scheduler/load-data');
			}
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
			<nav id="login-navbar">
				<img src="https://i.imgur.com/GSKsNA8.png" alt="logo" id={"navbar-logo"}></img>
			</nav>
			<div className={"mobile-container"}>
				<h1 className="page-header">Login</h1>
				<form  onSubmit={handleLogin} id={"login"}>

					<label htmlFor="username" >Username
						<input
							type="text"
							id="username"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>

					<div>
						<label htmlFor="password">
							Password
							<div id="password-input-container">
								<input
									type={getPasswordInputType()}
									id="password-input"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<button
									type="button"
									id="password-toggle-button"
									onClick={togglePasswordVisibility}
								>
									{getPasswordToggleLabel()}
								</button>
							</div>
						</label>

					</div>

					<button type="submit" className={"submit-button"}>Login</button>

					{error && (
						<p style={{color: 'red'}}>{error}</p>
					)}
				</form>
			</div>
			{loading && <div id={"loading"}>Loading...</div>}
		</div>
	);
};

export default LoginPage;