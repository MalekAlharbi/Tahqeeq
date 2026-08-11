import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useProject } from "../hooks/useProject";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import {
    FolderKanban,
    Plus,
    ArrowRight,
    Settings as SettingsIcon,
    LayoutDashboard,
    CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const { getAllProjects, createNewProject } = useProject();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const projects = getAllProjects.data?.projects || [];

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        createNewProject.mutate(
            { title: title.trim(), description: description.trim() },
            {
                onSuccess: () => {
                    setIsAddModalOpen(false);
                    setTitle("");
                    setDescription("");
                },
            }
        );
    };

    if (getAllProjects.isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full text-ui-primaryText">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-linear-to-r from-ui-primary/20 via-ui-surfaceContainer to-ui-surfaceContainer border border-ui-primary/30 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 z-10">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        {t("Welcome back!")}{" "}
                        <span className="text-ui-primary">{user?.name || ""}</span>
                    </h1>
                    <p className="text-ui-secondaryText text-sm max-w-xl">
                        {t(
                            "A flexible project management platform designed specifically for developers and teams to track tasks, organize sprints, and achieve success step by step."
                        )}
                    </p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="z-10 bg-ui-primary text-ui-insidePrimaryText font-semibold py-3 px-5 rounded-2xl shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95 text-sm"
                >
                    <Plus size={18} />
                    <span>{t("Add New Project")}</span>
                </button>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Total Projects Card */}
                <div className="bg-ui-surfaceContainer border border-ui-outline/60 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-ui-secondaryText">
                            {t("Total Projects")}
                        </span>
                        <span className="text-3xl font-black text-ui-primaryText">
                            {projects.length}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-ui-primary/10 text-ui-primary flex items-center justify-center border border-ui-primary/20">
                        <FolderKanban size={24} />
                    </div>
                </div>

                {/* Status Card */}
                <div className="bg-ui-surfaceContainer border border-ui-outline/60 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-ui-secondaryText">
                            {t("Active Status")}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-base font-bold text-emerald-500">
                                {t("Active")}
                            </span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle2 size={24} />
                    </div>
                </div>

                {/* Settings Shortcut Card */}
                <Link
                    to="/settings"
                    className="bg-ui-surfaceContainer border border-ui-outline/60 hover:border-ui-primary/50 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all group"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-ui-secondaryText">
                            {t("Account Settings")}
                        </span>
                        <span className="text-sm font-bold text-ui-primary flex items-center gap-1 group-hover:underline">
                            {t("Edit")} Profile <ArrowRight size={14} />
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-ui-outline/20 text-ui-secondaryText group-hover:text-ui-primary group-hover:bg-ui-primary/10 flex items-center justify-center border border-ui-outline/40 transition-colors">
                        <SettingsIcon size={24} />
                    </div>
                </Link>
            </div>

            {/* Recent Projects Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-ui-outline/40 pb-3">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <LayoutDashboard size={20} className="text-ui-primary" />
                        {t("Recent Projects")}
                    </h2>
                    <Link
                        to="/projects"
                        className="text-xs font-semibold text-ui-primary hover:underline flex items-center gap-1"
                    >
                        {t("Projects")} <ArrowRight size={12} />
                    </Link>
                </div>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.slice(0, 6).map((project) => (
                            <div
                                key={project.id}
                                className="bg-ui-surfaceContainer border border-ui-outline/60 hover:border-ui-primary/40 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all shadow-sm hover:shadow-md"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-xl bg-ui-primary/10 text-ui-primary flex items-center justify-center font-bold text-sm shrink-0 border border-ui-primary/20">
                                            📋
                                        </div>
                                        <h3 className="font-bold text-base text-ui-primaryText line-clamp-1">
                                            {project.title}
                                        </h3>
                                    </div>
                                    {project.description && (
                                        <p className="text-xs text-ui-secondaryText line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                    )}
                                </div>

                                <Link
                                    to={`/project/${project.id}`}
                                    className="w-full bg-ui-primary/10 hover:bg-ui-primary text-ui-primary hover:text-ui-insidePrimaryText font-semibold py-2 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                                >
                                    <span>{t("View Project")}</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-ui-outline/40 rounded-3xl flex flex-col items-center gap-3">
                        <FolderKanban size={40} className="text-ui-secondaryText/50" />
                        <p className="text-ui-secondaryText font-medium text-sm">
                            {t("No projects found. Create your first project!")}
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-ui-primary text-ui-insidePrimaryText font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
                        >
                            <Plus size={16} />
                            <span>{t("Add New Project")}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Modal: Create Project */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title={t("Add New Project")}
            >
                <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-ui-primaryText mb-1">
                            {t("Project Name")}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t("Project Name")}
                            required
                            className="w-full bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-ui-primaryText mb-1">
                            {t("Project Description")}
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t("Project Description")}
                            rows={3}
                            className="w-full bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={createNewProject.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {createNewProject.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
