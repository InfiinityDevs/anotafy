import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';

export default function Routers() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	);
}
