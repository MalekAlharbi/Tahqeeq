import { useTranslation } from "react-i18next";

const Loading = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ui-primary"></div>
            <div className='text-ui-primary text-2xl'>{t("Loading...")}</div>
        </div>
    );
}

export default Loading;