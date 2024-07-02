import React, { useState } from 'react';
import { useLoginMutation } from '../service/authService';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const loginMutation = useLoginMutation();

	const handleSubmit = (event) => {
		event.preventDefault();
		loginMutation.mutate({ username, password });
	};

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
