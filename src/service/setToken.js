import { apiClient } from './baseUrl';

export function setAuthToken(token) {
	apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
