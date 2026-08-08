import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const LangaugeSwitch = () => {
    const { i18n } = useTranslation();

    const getLanguageLabel = (lang: string) => {
        if (lang?.startsWith("ar")) return "العربية";
        if (lang?.startsWith("es")) return "Español";
        return "English";
    };

    return(
        <div className="relative inline-block text-left group">
            <button type="button" className="inline-flex items-center justify-between w-full rounded-md bg-ui-surface px-4 py-2 text-sm font-medium text-ui-primaryText hover:bg-ui-surfaceContainer border-ui-outline border focus:outline-none" aria-haspopup="true">
                <span className="mr-2 flex items-center gap-1"><LanguagesIcon size={18} /> {getLanguageLabel(i18n.language)} </span>
                <svg className="h-5 w-5 text-ui-primaryText" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" /></svg>
            </button>
            <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-ui-surface border border-ui-outline ring-opacity-5 invisible group-hover:visible group-focus-within:visible shadow-lg">
                <div className="py-1" role="menu">
                    <button onClick={() => i18n.changeLanguage("en")} className="w-full block px-4 py-2 text-sm text-ui-primaryText hover:bg-ui-surfaceContainer cursor-pointer text-start">English</button>
                    <button onClick={() => i18n.changeLanguage("ar")} className="w-full block px-4 py-2 text-sm text-ui-primaryText hover:bg-ui-surfaceContainer cursor-pointer text-start">العربية</button>
                    <button onClick={() => i18n.changeLanguage("es")} className="w-full block px-4 py-2 text-sm text-ui-primaryText hover:bg-ui-surfaceContainer cursor-pointer text-start">Español</button>
                </div>
            </div>
        </div>
    )
}

export default LangaugeSwitch;