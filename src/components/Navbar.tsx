import { LanguagesIcon, Menu, MoonIcon, Sun, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useColors } from "../providers/ColorsProvider";
import { useMemo, useState } from "react";

const Navbar = () => {
    const { t,i18n } = useTranslation();
    const {theme,setMode} = useColors();
    const [active,setActive] = useState<boolean>(false);

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
                <button onClick={() => setActive(v => !v)} className="z-20 md:hidden bg-ui-surface border border-ui-outline rounded-md cursor-pointer p-2">
                    {active ? <XIcon className="text-ui-primaryText transition-transform hover:scale-120 cursor-pointer"/> : 
                              <Menu className="text-ui-primaryText transition-transform hover:scale-120 cursor-pointer"/>}
                </button>
                <div className={`${active ? "flex" : "hidden"} md:hidden flex-col gap-4 bg-ui-surfaceContainer border-ui-outline border-b absolute inset-s-0 top-20 w-2/3 z-20 p-6 shadow-xl`}>
                    {navLinks.map((link) => (
                    <NavLink onClick={() => setActive(false)} className="cursor-pointer text-ui-primaryText" to={link.href} key={link.name}>
                        {link.name}
                    </NavLink>
                    ))}
                </div>
                
                <div id="logo" className="flex gap-2">
                    {/* Theme Button */}
                    <button onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")} className="rounded-md bg-ui-surface border-ui-outline border p-[8px] flex items-center justify-center">
                        {
                            theme.mode === "dark" ? 
                                (<Sun className="text-ui-primaryText transition-transform hover:scale-120 cursor-pointer"/>):
                                (<MoonIcon className="text-ui-primaryText cursor-pointer transition-transform hover:scale-120"/>)
                        }
                    </button>

                    {/* Langauge Switch */}
                    <div className="relative inline-block text-left group">
                        <button type="button" className="inline-flex items-center justify-between w-full rounded-md  bg-ui-surface px-4 py-2 text-sm font-medium text-ui-primaryText hover:bg-ui-surfaceContainer border-ui-outline border focus:outline-none" aria-haspopup="true">
                            <span className="mr-2 flex items-center gap-1"><LanguagesIcon/> {i18n.language === "en" ? "English" : "العربية"} </span>
                            <svg className="h-5 w-5 text-ui-primaryText" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                        </button>
                        <div className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-ui-surface border border-ui-outline ring-opacity-5 invisible group-hover:visible group-focus-within:visible">
                            <div className="py-1" role="menu">
                            <button onClick={() => i18n.changeLanguage("en")} className="w-full block px-4 py-2 text-sm text-ui-primaryText hover:bg-ui-surfaceContainer cursor-pointer">English</button>
                            <button onClick={() => i18n.changeLanguage("ar")} className="w-full block px-4 py-2 text-sm text-ui-primaryText hover:bg-ui-surfaceContainer cursor-pointer">العربية</button>
                            </div>
                        </div>
                    </div>

                    

                </div>
                
            </nav>
        </>
    );
}

export default Navbar;