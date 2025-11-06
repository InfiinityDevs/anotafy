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
                className={`flex flex-row md:flex-col h-full w-full md:w-72 bg-foreground border-t md:border-r border-border p-4`}
            >
                <div className="flex flex-row md:flex-col w-full justify-evenly">
                    {
                        items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <CustomButton
                                    onClick={item.action}
                                    className={`flex-1 max-w-min sm:max-w-full aspect-square sm:aspect-auto md:w-full px-4 font-semibold gap-3 hover:bg-primary/10`}
                                    label={<span className="hidden sm:flex">{item.label}</span>}
                                    iconLeft={<Icon size={24}/>}
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
