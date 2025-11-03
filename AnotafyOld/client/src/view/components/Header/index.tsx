import { Bell, Search, Settings, User } from "lucide-react";
import Logo from "../Logo";

export default function Header() {
    return (
        <header className="bg-foreground border-b border-border h-18 min-h-18 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Logo className="w-10" />
                <h1 className="font-black text-xl select-none">ANOTAFY</h1>
            </div>
            <div className="hidden md:flex items-center gap-2 border border-border rounded-lg h-8 p-5 w-100 focus-within:ring-2 focus-within:ring-primary">
                <Search size={20} strokeWidth={2.3} className="text-gray-500"/>
                <input className="placeholder:text-gray-500 outline-none text-sm" type="text" placeholder="Pesquisar" />
            </div>
            <div className="flex flex-row gap-4">
                <Settings size={25} strokeWidth={2.3} className="text-gray-500" />
                <User size={25} strokeWidth={2.3} className="text-gray-500" />
                <Bell size={25} strokeWidth={2.3} className="text-gray-500" />
            </div>
        </header>
    );
}
