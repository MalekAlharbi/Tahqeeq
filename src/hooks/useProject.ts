import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addProject, deleteProject, getProjects, updateProject } from "../api/endpoints"
import type { ProjectData } from "../types/api";

export const useProject = () => {
    const queryClient = useQueryClient();

    const getAllProjects = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    // Add Project
    const createNewProject = useMutation({
        mutationKey: ["project"],
        mutationFn: addProject,
        onSuccess: () => {
          console.log("Project added successfully")
          queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: (err) => {
            console.log("Error adding project", err)
        }
    })

    // Delete Project
    const delProject = useMutation({
        mutationKey: ["project"],
        mutationFn: deleteProject,
        onSuccess: () => {
            console.log("Project deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: (err) => {
            console.log("Error deleting project", err)
        }
    })

    // Update Project
    const updtProject = useMutation({
        mutationKey: ["project"],
        mutationFn: ({id,data}: {id:Number,data:ProjectData}) => updateProject(id,data),
        onSuccess: () => {
            console.log("Project updated successfully")
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: (err) => {
            console.log("Error updating project", err)
        }
    })

    return {
        getAllProjects,
        createNewProject,
        delProject,
        updtProject
    }
}