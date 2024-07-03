import { useMutation } from '@tanstack/react-query';
import { apiClient } from './baseUrl';
import { setAuthToken } from './setToken';

const loginUser = async ({ username, password }) => {
	const response = await apiClient.post('/auth/login', {
		username,
		password,
	});
	return response.data;
};

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			console.log(data);
			localStorage.setItem('jwtToken', data.token);
			setAuthToken(data.token);
		},
		onError: (error) => {
			localStorage.removeItem('jwtToken');
			console.error(
				'Login failed:',
				error.response?.data?.message || error.message
			);
		},
	});
};
