import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Garcon from './pages/Garcon';

export default function Routers() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Login />} />
				<Route path="/garcon" element={<Garcon />} />
			</Routes>
		</Router>
	);
}
