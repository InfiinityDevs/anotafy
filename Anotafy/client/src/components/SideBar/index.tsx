import Logo from "../Logo";

interface ItemsSideBarProps {
    label: string,
    icon: React.FC<{size: number}>,
    id: string,
    action: () => void
}
 
interface SideBarProps {
    items: ItemsSideBarProps[],
    active: string
}

export default function SideBar({ items, active }: SideBarProps) {
    return (
        <div className="bg-white w-[18%] h-[95%] ml-[1.5%] flex flex-col items-center p-6 justify-start rounded-4xl shadow-shadow shadow-[5px_5px_7px]">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <Logo size={12}/>
                    <span className="text-lg font-semibold text-gray-900">
                        Your Logo
                    </span>
                </div>

                {/* Menu Items */}
                <nav className="w-full flex flex-col gap-4">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => item.action()}
                                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text"
                                } hover:bg-primary hover:text-white`}
                            >
                                <Icon size={20}/>
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
