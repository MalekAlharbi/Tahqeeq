import { useTranslation } from "react-i18next";
import { Delete, MoreVertical, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

interface ProjectCardProps{
    id: Number,
    title: string,
    description: string,
    handlers: any
}

const ProjectCard = ({id, title, description, handlers }: ProjectCardProps) => {
    const { t } = useTranslation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectData, setProjectData] = useState({ title, description });

    // handle Delete
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        handlers.del.mutate(id);
        setIsDeleteModalOpen(false);
    }
    // handle Edit
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        handlers.updt.mutate({id, data: projectData})
        setIsEditModalOpen(false);
    }

    useEffect(() => {
        setProjectData({ title, description });
    }, [title, description]);

    return (
        <>
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={t("Edit Project")}
            >
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input type="text" value={projectData.title} onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} placeholder={t("Project Name")} className="border p-2 rounded" />
                    <input type="text" value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} placeholder={t("Project Description")} className="border p-2 rounded" />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            {t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title={t("Delete Project")}
            >
                <form onSubmit={handleDelete}>
                    <p>{t("Are you sure you want to delete this project?")}</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            {t("Delete")}
                        </button>
                    </div>
                </form>
            </Modal>
            {/* // Card Body */}
            <div className="border border-ui-outline rounded-lg p-4 text-ui-primaryText">
                {/* Priority + more for delete and edit */}
                <div className="flex items-center justify-between">
                    {/* Priority Badge */}
                    <div className="bg-ui-error/20 text-ui-error border-ui-error/40 border text-xs font-semibold px-2 py-0.5 rounded-full">
                        {t("High Priority")}
                    </div>
                    {/* More icon for edit and delete */}
                    <div className="relative">
                        <details className="relative group">
                            <summary className="list-none cursor-pointer hover:scale-110 focus:outline-none select-none">
                                <MoreVertical />
                            </summary>

                            <div className="flex flex-col bg-ui-surfaceContainer border-ui-outline border-b absolute right-0 p-1 rounded-lg z-10 min-w-30">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="text-ui-primaryText hover:bg-ui-outline/20 p-2 rounded-md flex gap-2 items-center justify-start cursor-pointer w-full text-start"
                                >
                                    <Pencil size={16} />{t("Edit")}
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="text-ui-error hover:bg-ui-error/20 p-2 rounded-md flex gap-2 items-center justify-start cursor-pointer"
                                >
                                    <Delete size={16} />{t("Delete")}
                                </button>
                            </div>

                            <div
                                className="fixed inset-0 z-0 cursor-default"
                                onClick={(e) => e.currentTarget.parentElement?.removeAttribute('open')}
                            />
                        </details>
                    </div>
                </div>

                {/* Title */}
                <div className="mt-2 font-semibold">
                    {title}
                </div>
                {/* Description */}
                <div className="mt-2 text-sm text-gray-600">
                    {description}
                </div>

                {/* Progress */}
                <div className="mt-2">
                    <div className="text-sm text-gray-600 flex justify-between items-center">
                        <p>{t("Progress")}</p>
                        <p>32%</p>
                    </div>

                    <div className="h-2 w-full bg-ui-outline rounded-full overflow-hidden">
                        {/* Progress Bar Fill */}
                        <div
                            className="h-full bg-ui-primary rounded-full transition-all duration-300 ease-out"
                            style={{ width: '32%' }}
                        />
                    </div>
                </div>

                {/* View Project Button */}
                <Link to={`/project/${id}`} className="inline-block mt-6 text-center w-full text-ui-primary bg-ui-primary/10 border border-ui-primary rounded-lg hover:cursor-pointer hover:bg-ui-primary/20 transition-all duration-300 ease-out py-2 font-medium">
                    {t("View Project")}
                </Link>
            </div>
        </>
    );
}

export default ProjectCard;