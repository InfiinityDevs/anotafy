import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ErrorServer from "./pages/ErrorServer";
import Register from "./pages/Login/Register";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<ErrorServer />} />
                <Route path="/" element={<Auth />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}
