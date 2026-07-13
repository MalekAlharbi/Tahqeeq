import { useTranslation } from "react-i18next";
import ThemeSwitch from "./ThemeSwitch";
import LangaugeSwitch from "./LanguageSwitch";
import { useLocation } from "react-router-dom";
import type { NavLinks } from "../types/ui";
import BurgerMenu from "./BurgerMenu";

const navLinks: NavLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Settings", href: "/settings" },
];

const Header = () => {
    const {t} = useTranslation();
    const location = useLocation();

    const getHeaderTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return t("Dashboard");
            case "/projects":
                return t("Projects");
            case "/settings":
                return t("Settings");
            default:
                return t("Tahqeeq"); 
        }
    };
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-ui-primary text-2xl hidden md:block">{getHeaderTitle()}</div>
                <div className="flex gap-4 justify-between">
                    <BurgerMenu navLinks={navLinks}/>
                    <div className="flex gap-2">
                        <ThemeSwitch/>
                        <LangaugeSwitch/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;