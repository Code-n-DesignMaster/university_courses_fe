import logo from './logo.svg';
import './App.css';
import Login from './page/login';
import { useEffect, useState } from 'react';
import CourseDisplay from './page/courseDisplay';

function App() {
	const [token, setToken] = useState();
	const [user, setUser] = useState();
	useEffect(() => {
		console.log('tokeneffect');
		setToken(localStorage.getItem('jwtToken'));
		return () => {
			setToken();
		};
	}, [token]);

	return (
		<div className='App'>
			<div className='App-header'>
				{!token && <Login setToken={setToken} setUser={setUser} />}
				{token && <CourseDisplay setToken={setToken} user={user} />}
			</div>
		</div>
	);
}

export default App;
