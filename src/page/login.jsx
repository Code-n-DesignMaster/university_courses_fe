import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../service/authService';

const Login = ({ setToken, setUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const loginMutation = useLoginMutation();

	const handleSubmit = (event) => {
		event.preventDefault();
		loginMutation.mutate({ username, password });
	};

	useEffect(() => {
		if (loginMutation.data) {
			setToken(loginMutation.data.token);
			setUser(loginMutation.data.user);
		}
	}, [loginMutation.data, setToken, setUser]);

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
				required
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
				required
			/>
			<button type='submit'>Log In</button>
		</form>
	);
};

export default Login;
