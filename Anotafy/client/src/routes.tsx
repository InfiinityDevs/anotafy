import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Test from './pages/Teste';

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Auth />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    );
}
