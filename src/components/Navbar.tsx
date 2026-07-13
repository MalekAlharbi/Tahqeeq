import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import ThemeSwitch from "./ThemeSwitch";
import LangaugeSwitch from "./LanguageSwitch";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
    const { t,i18n } = useTranslation();

    const navLinks = useMemo(() => {
        return [
        {
            name: t("Home"),
            href: "/"
        },
        {
            name: t("Features"),
            href: "/"
        },
        {
            name: t("Pricing"),
            href: "/"
        },
        {
            name: t("About"),
            href: "/about"
        }
        ];
    },[i18n.language])

    return(
        <>
            <nav className="bg-ui-surfaceContainer border-ui-outline border-b w-full flex items-center justify-between p-4">
                
                <div id="links" className=" items-center gap-4 hidden md:flex">
                    <p className="font-bold text-ui-primary text-xl">{t("Tahqeeq")}</p>
                    {navLinks.map((link) => (
                    <NavLink className="cursor-pointer text-ui-primaryText" to={link.href} key={link.name}>
                        {link.name}
                    </NavLink>
                    ))}
                </div>
                <BurgerMenu navLinks={navLinks}/>
                
                <div id="logo" className="flex gap-2">
                    {/* Theme Button */}
                    <ThemeSwitch/>

                    {/* Langauge Switch */}
                    <LangaugeSwitch/>
                </div>
                
            </nav>
        </>
    );
}

export default Navbar;