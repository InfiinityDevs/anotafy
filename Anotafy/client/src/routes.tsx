import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Auth />} />
            </Routes>
        </Router>
    );
}
