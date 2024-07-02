import axios from 'axios';
import { server } from '../constants';
import { useMutation } from '@tanstack/react-query';

const loginUser = async ({ username, password }) => {
	const response = await axios.post(server + '/auth/login', {
		username,
		password,
	});
	return response.data;
};

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: loginUser,
		onSuccess: (token) => {
			console.log(token);
			localStorage.setItem('jwtToken', token);
		},
		onError: (error) => {
			console.error(
				'Login failed:',
				error.response?.data?.message || error.message
			);
		},
	});
};
