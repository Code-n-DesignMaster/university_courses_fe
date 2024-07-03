import { server } from '../constants';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from './baseUrl';

const getUserCourses = async (id) => {
	const response = await apiClient.get('/user/courses/' + id);
	return response.data;
};

export const useGetUserCoursesMutation = () => {
	return useMutation({
		mutationFn: getUserCourses,
		onSuccess: (data) => {
			console.log('data', data);
		},
		onError: (error) => {
			localStorage.removeItem('jwtToken');
			console.error(
				'User failed:',
				error.response?.data?.message || error.message
			);
		},
	});
};
const enrollUserToCourse = async ({ userId, courseId }) => {
	console.log('what:', userId, courseId);
	const response = await apiClient.post(
		'/user/' + courseId + '/enroll/' + userId
	);
	return response.data;
};

export const useEnrollUserToCourseMutation = () => {
	return useMutation({
		mutationFn: enrollUserToCourse,
		onSuccess: (data) => {
			console.log('data', data);
		},
		onError: (error) => {
			localStorage.removeItem('jwtToken');
			console.error(
				'User failed:',
				error.response?.data?.message || error.message
			);
		},
	});
};
