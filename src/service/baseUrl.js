import axios from 'axios';
import { server } from '../constants';

export const apiClient = axios.create({
	baseURL: server,
});
