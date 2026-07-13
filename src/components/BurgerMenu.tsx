import { Menu, XIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { NavbarProps } from "../types/ui";

const BurgerMenu = ({navLinks} : NavbarProps) => {
    const [active,setActive] = useState<boolean>(false);
    return(
        <div>
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
        </div>
    )
}

export default BurgerMenu;