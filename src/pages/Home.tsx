import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Kanban, ArrowRight, Shield, Zap, Users, LogOut } from "lucide-react";
import useAuthStore from "../stores/authStore";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const { logout } = useAuth();
    return (
        <div className="bg-ui-surface min-h-[calc(100vh-130px)] flex flex-col justify-center items-center px-4 py-12">

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">

                {/* Icon Badge */}
                <div className="bg-ui-primary/10 p-4 rounded-full text-ui-primary animate-bounce">
                    <Kanban size={40} />
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-black text-ui-primaryText tracking-tight leading-none">
                    {t("Achieve Your Development Goals with Agility")}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-ui-secondaryText max-w-2xl">
                    {t("A flexible project management platform designed specifically for developers and teams to track tasks, organize sprints, and achieve success step by step.")}
                </p>

                {/* CTA Buttons */}
                {user ? <>
                    <h1 className="text-ui-primaryText text-2xl">{t("Welcome back!")} {user.name}</h1>
                    <div className="flex gap-2">
                        <NavLink to={"/dashboard"} className="cursor-pointer bg-ui-primary hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-ui-primary/20 flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5">
                            {t("Manage your tasks now")}
                        </NavLink>
                        <button onClick={() => {logout()}} className="cursor-pointer bg-ui-error hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-ui-primary/20 flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5">{t("Logout")} <LogOut/> </button>
                    </div>
                </> : 
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                    <Link
                        to="/register"
                        className="bg-ui-primary hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-ui-primary/20 flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        {t("Get Started Free")}
                        <ArrowRight size={18} />
                    </Link>

                    <Link
                        to="/login"
                        className="bg-ui-surfaceContainer border border-ui-outline text-ui-primaryText hover:bg-ui-surface font-medium px-8 py-4 rounded-xl transition-all duration-200"
                    >
                        {t("Log In")}
                    </Link>
                </div>}

                
            </div>

            {/* Features Minimal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 w-full">

                {/* Feature 1 */}
                <div className="bg-ui-surfaceContainer border border-ui-outline p-6 rounded-2xl flex flex-col gap-3">
                    <div className="text-ui-primary bg-ui-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Zap size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-ui-primaryText">
                        {t("Flexible Kanban Boards")}
                    </h3>
                    <p className="text-sm text-ui-secondaryText leading-relaxed">
                        {t("Organize your tasks seamlessly by dragging and dropping them across different development statuses (To-Do, In-Progress, Finished).")}
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-ui-surfaceContainer border border-ui-outline p-6 rounded-2xl flex flex-col gap-3">
                    <div className="text-ui-successful bg-ui-successful/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Users size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-ui-primaryText">
                        {t("Collaborative Workspaces")}
                    </h3>
                    <p className="text-sm text-ui-secondaryText leading-relaxed">
                        {t("Add your team members to a shared workspace and track project progress together in real-time.")}
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-ui-surfaceContainer border border-ui-outline p-6 rounded-2xl flex flex-col gap-3">
                    <div className="text-ui-warning bg-ui-warning/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Shield size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-ui-primaryText">
                        {t("Smart Analytics")}
                    </h3>
                    <p className="text-sm text-ui-secondaryText leading-relaxed">
                        {t("An integrated dashboard that gives you a comprehensive view of team performance and task completion rates in the current sprint.")}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Home;