import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ErrorServer from "./pages/ErrorServer";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<ErrorServer />} />
                <Route path="/" element={<Auth />} />
            </Routes>
        </Router>
    );
}
