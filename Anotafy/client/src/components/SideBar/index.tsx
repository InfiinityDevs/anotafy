import { useState } from "react";
import Logo from "../Logo";
import { Clock, CreditCard, LayoutDashboard, Settings, Users } from "lucide-react";

export default function SideBar() {
    const [active, setActive] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "teams", label: "Teams", icon: Users },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "attendance", label: "Attendance", icon: Clock },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="bg-white w-[18%] h-[95%] ml-[1.5%] flex flex-col items-center p-6 justify-start rounded-4xl">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <Logo size={12}/>
                    <span className="text-lg font-semibold text-gray-900">
                        Your Logo
                    </span>
                </div>

                {/* Menu Items */}
                <nav className="space-y-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
        </div>
    );
}
