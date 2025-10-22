// TestCookies.tsx (componente temporário)
export default function Test() {
    const testCookieRoute = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                credentials: 'include', // 🔥 IMPORTANTE
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: "gabriel",
                    senha: "gabriel123"
                })
            });
            
            console.log("🔍 Login response status:", response.status);
            console.log("🔍 Login response headers:", response.headers.get('set-cookie'));
            
            const data = await response.json();
            console.log("🔍 Login response data:", data);
            
        } catch (error) {
            console.error("❌ Test error:", error);
        }
    };

    const testAuthRoute = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/auth', {
                method: 'POST',
                credentials: 'include', // 🔥 IMPORTANTE
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            console.log("🔍 Auth response:", data);
            
        } catch (error) {
            console.error("❌ Auth test error:", error);
        }
    };

    return (
        <div className="p-4">
            <button onClick={testCookieRoute} className="p-2 bg-blue-500 text-white mr-2">
                Testar Login
            </button>
            <button onClick={testAuthRoute} className="p-2 bg-green-500 text-white">
                Testar Auth
            </button>
        </div>
    );
}