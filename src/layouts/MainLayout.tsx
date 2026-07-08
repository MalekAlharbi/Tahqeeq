import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
    const {i18n} = useTranslation();

    return (
        <>
            <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className={`flex flex-col min-h-screen`}>
                <Navbar/>
                <div className="flex grow items-center justify-center">
                    <Outlet/> 
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default MainLayout;