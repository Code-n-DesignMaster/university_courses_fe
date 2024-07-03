import axios from 'axios';
import { server } from '../constants';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from './baseUrl';

const getCourses = async () => {
	const response = await apiClient.get(server + '/course');
	return response.data;
};

export const useGetCoursesMutation = () => {
	return useMutation({
		mutationFn: getCourses,
		onSuccess: (data) => {
			console.log('data', data);
		},
		onError: (error) => {
			localStorage.removeItem('jwtToken');
			console.error(
				'Course failed:',
				error.response?.data?.message || error.message
			);
		},
	});
};
