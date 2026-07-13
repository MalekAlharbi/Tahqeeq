import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
    const {i18n} = useTranslation();
    return (
        <>
            <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex w-full p-6 gap-4">
                <div className="hidden md:block md:w-1/6">
                    <Sidebar/>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <Header/>
                    <main className="">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;