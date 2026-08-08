import { useState } from "react";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import { useProject } from "../hooks/useProject";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ProjectData } from "../types/api";

const Projects = () => {
    const { t } = useTranslation();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const { getAllProjects, createNewProject,delProject,updtProject } = useProject();
    const [ProjectData, setProjectData] = useState<ProjectData>({
        title: "",
        description: ""
    });

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        createNewProject.mutate(ProjectData);
        setIsUserModalOpen(false);
        setProjectData({
            title: "",
            description: ""
        })
    };

    if (getAllProjects.isLoading) {
        return (
            <Loading />
        )
    }

    if (getAllProjects.isError) {
        return (
            <div>
                {getAllProjects.error.message}
            </div>
        )
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAllProjects.data?.projects?.map((project) => <ProjectCard key={project.id} id={project.id} title={project.title} description={project.description} handlers={{del:delProject,updt: updtProject}}/>)}
                <button onClick={() => setIsUserModalOpen(true)} className="bg-ui-surface text-ui-primaryText border border-dashed border-gray-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer min-h-[220px]">
                    <div className="hover:scale-102 transition-transform flex flex-col items-center gap-2">
                        <div>
                            <PlusIcon />
                        </div>
                        {t("Add New Project")}

                    </div>
                </button>
                <Modal
                    isOpen={isUserModalOpen}
                    onClose={() => setIsUserModalOpen(false)}
                    title={t("Add New Project")}
                >
                    <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                        <input value={ProjectData.title} onChange={(e) => setProjectData({...ProjectData, title: e.target.value})} type="text" placeholder={t("Project Name")} className="border p-2 rounded" required />
                        <input value={ProjectData.description} onChange={(e) => setProjectData({...ProjectData, description: e.target.value})} type="text" placeholder={t("Project Description")} className="border p-2 rounded" required />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsUserModalOpen(false)}
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

            </div>
        </div>
    )
}
export default Projects;