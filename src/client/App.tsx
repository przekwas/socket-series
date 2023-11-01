import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Messages from './views/Messages';
import Home from './views/Home';
import MatchResults from './views/MatchResults';
import Admin from './views/Admin';

interface AppProps {}

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/messages" element={<Messages />} />
				<Route path="/match-results" element={<MatchResults />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
