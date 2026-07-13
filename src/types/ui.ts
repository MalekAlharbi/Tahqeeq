export interface colors {
    primary: string,
    secondary: string
    surface: string,
    surfaceContainer: string,
    primaryText: string,
    secondaryText: string,
    insidePrimaryText: string,
    outline: string,
    error: string,
    warning: string,
    successful: string
}

export type theme = "light" | "dark";

export interface ThemeState {
    mode: theme,
    customColors: colors,
}

export interface colorsProviderType {
    theme: ThemeState,
    setMode: (mode: "light" | "dark") => void;
}

export interface NavbarProps {
    navLinks: { name: string; href: string }[];
}

export type LinkItems = {
    name: string;
    href: string;
}

export type NavLinks = LinkItems[];