import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../service/authService';
import { useGetCoursesMutation } from '../service/courseService';
import { Box, Button, Card, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
	useEnrollUserToCourseMutation,
	useGetUserCoursesMutation,
} from '../service/userService';

const CourseDisplay = ({ setToken, user }) => {
	const courseMutation = useGetCoursesMutation();
	const userCoursesMutation = useGetUserCoursesMutation();
	const enrollUserToCourseMutation = useEnrollUserToCourseMutation();

	useEffect(() => {
		if (
			courseMutation.isError ||
			userCoursesMutation.isError ||
			enrollUserToCourseMutation.isError
		) {
			console.log('error');
			setToken();
		}

		return () => {};
	}, [
		courseMutation.isError,
		enrollUserToCourseMutation.isError,
		setToken,
		userCoursesMutation.isError,
	]);

	useEffect(() => {
		if (enrollUserToCourseMutation.isSuccess) {
			courseMutation.mutate();
		}

		return () => {};
	}, [enrollUserToCourseMutation.isSuccess]);

	const handleGetCourses = async (event) => {
		event.preventDefault();
		courseMutation.mutate();
	};
	const handleEnroll = async (event, courseId) => {
		console.log('event::', courseId);
		event.preventDefault();
		enrollUserToCourseMutation.mutate({ userId: user._id, courseId });
	};
	const handleGetUserCourses = async (event) => {
		event.preventDefault();
		console.log(user);
		userCoursesMutation.mutate(user._id);
	};

	const CourseCard = ({ data }) => {
		return (
			<Card
				key={data._id}
				sx={{
					height: '200px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
				}}
			>
				<Typography variant='h5'>{data.title || 'No title'}</Typography>
				<Typography variant='caption'>
					{data.description || 'No description'}
				</Typography>
				<Typography variant='body1'>
					Number of enrolled students: {data.students.length || 0}
				</Typography>
				<Button onClick={(e) => handleEnroll(e, data._id)}>
					Subscribe
				</Button>
			</Card>
		);
	};

	return (
		<Box p={3}>
			<Grid2 container spacing={2} mb={3}>
				{courseMutation.data?.map((el, idx) => (
					<Grid2 key={idx} xs={3}>
						<CourseCard data={el} />
					</Grid2>
				))}
			</Grid2>
			<Button variant='contained' onClick={handleGetCourses}>
				Get All Courses
			</Button>

			<Grid2 container spacing={2} mb={3}>
				{userCoursesMutation.data?.map((el, idx) => (
					<Grid2 key={idx} xs={3}>
						<CourseCard data={el} />
					</Grid2>
				))}
			</Grid2>
			<Button variant='contained' onClick={handleGetUserCourses}>
				Get User Courses
			</Button>
		</Box>
	);
};

export default CourseDisplay;
