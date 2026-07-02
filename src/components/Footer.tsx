import { useTranslation } from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <>
            <footer className="flex flex-col items-center gap-2 mt-8">
                <div className="text-ui-primaryText">{t("All rights reserved by Tahqeeq.")}</div>
                <div className="text-ui-primaryText">{t("Malek Allehaibi")} © {new Date().getFullYear()}</div>
            </footer>
        </>
    );
}

export default Footer;