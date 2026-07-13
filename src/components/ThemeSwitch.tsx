import { MoonIcon, Sun } from "lucide-react";
import { useColors } from "../providers/ColorsProvider";

const ThemeSwitch = () => {
    const {theme, setMode} = useColors();

    return(
        <button onClick={() => setMode(theme.mode === "dark" ? "light" : "dark")} className="rounded-md bg-ui-surface border-ui-outline border p-[8px] flex items-center justify-center">
            {
                theme.mode === "dark" ? 
                    (<Sun className="text-ui-primaryText transition-transform hover:scale-120 cursor-pointer"/>):
                    (<MoonIcon className="text-ui-primaryText cursor-pointer transition-transform hover:scale-120"/>)
            }
        </button>
    )
}

export default ThemeSwitch;