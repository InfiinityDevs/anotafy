import { useState, useEffect, createContext, type ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "default",
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState("default");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        if (theme === "default") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("red");
        } else {
            setTheme("default");
        }

        document.documentElement.setAttribute("data-theme", theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="">{children}</div>
        </ThemeContext.Provider>
    );
}
