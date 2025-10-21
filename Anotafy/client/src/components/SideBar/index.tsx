import { useState } from "react";
import Logo from "../Logo";
import { ChevronLeft, LogOut } from "lucide-react";
import Space from "../Space";

interface ItemsSideBarProps {
    label: string;
    icon: React.FC<{ size: number; className: string }>;
    id: string;
    action: () => void;
}

interface SideBarProps {
    items: ItemsSideBarProps[];
    active: string;
}

export default function SideBar({ items, active }: SideBarProps) {
    const [openSideBar, setOpenSideBar] = useState<boolean>(true);
    const [nameUser, setNameUser] = useState<string>("Gabriel Neto");
    const [typeUser, setTypeUser] = useState<string>("Manager");

    return (
        <aside
            className={`transition-all duration-300 ease-in-out p-4 relative overflow-hidden ${
                openSideBar
                    ? "min-w-[22%] max-w-[22%]"
                    : "min-w-[7.5%] max-w-[7.5%]"
            } `}
        >
            <div
                className={`transition-all duration-300 ease-in-out bg-gradient-to-tl to-backgound-gray from-backgound-gray/85 h-full w-full ml-[1.5%] flex flex-col items-center p-6 justify-start rounded-4xl shadow-shadow shadow-[5px_5px_7px]`}
            >
                {/* Logo */}
                <div
                    className={`transition-all duration-300 ease-in-out flex items-center justify-center ${
                        openSideBar ? "gap-[5%] w-full" : "gap-0 w-14"
                    } mb-8 relative`}
                >
                    {/* Logo em si */}
                    <div
                        onClick={() =>
                            !openSideBar && setOpenSideBar(!openSideBar)
                        }
                    >
                        <Logo
                            className={`transition-all duration-300 ease-in-out w-14 ${
                                !openSideBar && "in-hover:cursor-pointer"
                            }`}
                        />
                    </div>
                    {/* Texto da logo */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden m-0 p-0 ${
                            openSideBar
                                ? "w-full opacity-100 delay-75"
                                : "w-0/1 opacity-0 hidden delay-150"
                        }`}
                    >
                        <span
                            className={`transition-all duration-300 ease-in-out text-xl font-semibold text-white select-none`}
                        >
                            Anotafy
                        </span>
                    </div>
                    {/* botão de fechar a side bar */}
                    <div
                        className={`transition-all duration-300 ease-in-out relative h-full flex justify-end 
                                    ${
                                        openSideBar
                                            ? "opacity-100 block"
                                            : "opacity-0 pointer-events-none hidden"
                                    }`}
                    >
                        <button
                            className="transition-all duration-300 ease-in-out cursor-pointer absolute flex items-center justify-end bg-gray-600 py-1.5 rounded-l-lg top-[50%] -translate-y-[50%] -right-6 disabled:opacity-50"
                            onClick={() => setOpenSideBar(!openSideBar)}
                            disabled={!openSideBar}
                        >
                            <ChevronLeft
                                className="transition-all duration-300 ease-in-out text-white w-[80%]"
                                strokeWidth={3}
                            />
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="transition-all duration-300 ease-in-out w-full flex flex-col gap-4 justify-center items-center">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => item.action()}
                                className={`transition-all duration-300 ease-in-out cursor-pointer h-12 flex items-center px-3 py-3 rounded-lg overflow-hidden ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text-gray-light"
                                }
                                ${openSideBar ? "w-full" : "w-12"}
                                    hover:bg-primary hover:text-white`}
                            >
                                <Space
                                    width={`${openSideBar ? "full" : "0%"}`}
                                    className="transition-all duration-300 ease-in-out "
                                />
                                <div
                                    className={`transition-all duration-300 ease-in-out flex flex-row w-full items-center justify-center  ${
                                        openSideBar ? "gap-1" : "gap-0"
                                    }`}
                                >
                                    <Icon
                                        size={20}
                                        className="transition-all duration-300 ease-in-out flex-shrink-0"
                                    />
                                    <span
                                        aria-hidden={!openSideBar}
                                        className={`transition-all duration-300 ease-in-out select-none font-medium  ${
                                            openSideBar
                                                ? "opacity-100 w-full"
                                                : "opacity-0 w-0"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                <Space
                                    width={`${openSideBar ? "full" : "0%"}`}
                                    className="transition-all duration-300 ease-in-out "
                                />
                            </button>
                        );
                    })}
                </nav>
                <div className="transition-all duration-300 ease-in-out mt-auto w-full items-center flex flex-col gap-4">
                    <div
                        className={`transition-all duration-300 ease-in-out select-none flex flex-col   text-text-gray-light overflow-hidden ${
                            openSideBar ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                    >
                        <span className="transition-all duration-300 ease-in-out font-bold text-xl">
                            {nameUser}
                        </span>
                        <span className="transition-all duration-300 ease-in-out font-medium pl-2.5">
                            {typeUser}
                        </span>
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out cursor-pointer flex flex-row items-center justify-center   text-white bg-red-700 hover:bg-red-400 p-2 w-min rounded-xl hover:scale-103 ${
                            openSideBar ? "px-6" : "px-2"
                        }`}
                    >
                        <div
                            className={`transition-all duration-300 ease-in-out flex flex-row w-min  ${
                                openSideBar ? "gap-2" : "gap-0"
                            }`}
                        >
                            <div>
                                <LogOut strokeWidth="3" />
                            </div>
                            <div
                                className={`transition-all duration-300 ease-in-out  whitespace-pre-line ${
                                    openSideBar ? "w-full" : "w-0"
                                } overflow-hidden`}
                            >
                                <span className="transition-all duration-300 ease-in-out font-bold">
                                    Sair
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
