import logo from './logo.svg';
import './App.css';
import Login from './page/login';
import { useEffect, useState } from 'react';

function App() {
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('jwtToken'));
		return () => {
			setToken();
		};
	}, [token]);

	return (
		<div className='App'>
			<div className='App-header'>
				{!token && <Login />}
				{token && <Login />}
			</div>
		</div>
	);
}

export default App;
