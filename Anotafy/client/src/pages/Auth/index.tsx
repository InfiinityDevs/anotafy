import { useEffect } from "react";

export default function Auth() {
    function validation() {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    }

    useEffect(() => {
        validation();
    }, []);
    return (
        <div>
            Auth Page
        </div>
    );
}