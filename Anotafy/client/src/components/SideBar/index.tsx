import { LogOut } from "lucide-react";
import CustomButton from "../CustomButton";

interface ItemsSideBarProps {
    label: string;
    icon: React.FC<{ size?: number; className?: string }>;
    id: string;
    action: () => void;
}

interface SideBarProps {
    items: ItemsSideBarProps[];
    active: string;
}

export default function SideBar({ items, active }: SideBarProps) {
    return (
        <>
            <aside
                className={`flex flex-col gap-2 w-72 h-full bg-foreground border-r border-border p-4`}
            >
                <div>
                    {
                        items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <CustomButton
                                    onClick={item.action}
                                    className={`h-min w-full px-4 font-semibold gap-3 hover:bg-primary/10`}
                                    label={item.label}
                                    iconLeft={<Icon />}
                                    position="left"
                                    textColor={`
                                        ${
                                            active === item.id
                                                ? "text-blue-800"
                                                : "text-text"
                                        }`}
                                    bgColor={`
                                        ${
                                            active === item.id
                                                ? "bg-primary/10"
                                                : "bg-transparent"
                                        }
                                    `}
                                />
                            );
                        })
                    }
                </div>
            </aside>
        </>
    );
}
