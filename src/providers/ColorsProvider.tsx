import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { colors, colorsProviderType, theme, ThemeState } from "../types/ui";

export const ColorsContext = createContext<colorsProviderType | undefined>(undefined);

const lightTheme: colors = {
    primary: "#2563eb",
    secondary: "#64748b",
    surface: "#f7f9fb",
    surfaceContainer: "#ffffff",

    primaryText: "#1e293b",
    secondaryText: "#64748b",
    insidePrimaryText: "#ffffff",

    outline: "#e2e8f0",

    error: "#ef4444",
    warning: "#f59e0b",
    successful: "#22c55e"
}

const darkTheme: colors = {
    primary: "#3b82f6",
    secondary: "#64748b",
    surface: "#0f172a",
    surfaceContainer: "#1e293b",
    primaryText: "#f8fafc",
    secondaryText: "#94a3b8",
    insidePrimaryText: "#ffffff",
    outline: "#334155",
    error: "#f87171",
    warning: "#fbbf24",
    successful: "#4ade80"
};


const ColorsProvider = ({ children }: { children: ReactNode }) => {

    // Colors state
    const [theme, setTheme] = useState<ThemeState>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("app_theme");
            if (saved) return JSON.parse(saved);
        }

        return { mode: "light", customColors: lightTheme }
    });

    // Load Theme
    useEffect(() => {
        const root = document.documentElement;

        Object.entries(theme.customColors).forEach(([key, value]) => {
            root.style.setProperty(`--ui-${key}`, value);
        })

        localStorage.setItem("app_theme", JSON.stringify(theme))
    }, [theme])

    // TODO: Colors Edit logic
    const setMode = (mode: theme) => {
        setTheme((prev) => ({
            ...prev,
            mode,
            customColors: mode === "dark" ? darkTheme : lightTheme,
        }))
    }

    // -----------------------

    return (
        <ColorsContext.Provider value={{ theme, setMode }}>
            {children}
        </ColorsContext.Provider>
    );
}

export default ColorsProvider;

export const useColors = () => {
    const context = useContext(ColorsContext);
    if (!context) {
        throw new Error("useColors must be used within a ColorsProvider");
    }
    return context;
}