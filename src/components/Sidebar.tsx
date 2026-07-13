import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { NavLinks } from "../types/ui";

const navLinks: NavLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Settings", href: "/settings" },
];

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <nav className="md:flex md:flex-col gap-4 text-ui-primary mt-12 md:mt-0 ">
            <h1 className="text-3xl mb-8 font-bold">{t("Tahqeeq")}</h1>
            {navLinks.map((link, index) => (
                <NavLink
                    className={({ isActive }) => `p-3 rounded transition-all duration-300 block
                                ${isActive ?
                            "bg-ui-primary/10 text-ui-primary border-ui-primary cursor-default"
                            :
                            "cursor-pointer text-ui-primaryText hover:bg-ui-surfaceContainer/50"}`
                    }
                    to={link.href}
                    key={index}
                >
                    {t(link.name)}
                </NavLink>
            ))}
        </nav>
    );
}

export default Sidebar;