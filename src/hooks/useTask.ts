import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectTask, updateProjectTaskPosition, updateProjectTask, deleteProjectTask } from "../api/endpoints";

export const useTask = (projectId?: number) => {
    const queryClient = useQueryClient();

    const addTask = useMutation({
        mutationKey: ["addTask"],
        mutationFn: (data: { categoryId: number; title: string; assigned_to?: string; description?: string }) =>
            addProjectTask(data.categoryId, { title: data.title, assigned_to: data.assigned_to, description: data.description }),
        onSuccess: () => {
            console.log("Task added successfully");
            if (projectId) {
                queryClient.invalidateQueries({ queryKey: ["project", projectId] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["project"] });
            }
        },
        onError: (err) => {
            console.error("Error adding task", err);
        }
    });

    const updateTaskPosition = useMutation({
        mutationKey: ["updateTaskPosition"],
        mutationFn: (data: { taskId: number; position: number; category_id: number }) =>
            updateProjectTaskPosition(data.taskId, { position: data.position, category_id: data.category_id }),
        onSuccess: () => {
            console.log("Task position updated successfully");
        },
        onError: (err) => {
            console.error("Error updating task position", err);
        }
    });

    const updateTask = useMutation({
        mutationKey: ["updateTask"],
        mutationFn: (data: { taskId: number; title: string; assigned_to?: string; description?: string }) =>
            updateProjectTask(data.taskId, { title: data.title, assigned_to: data.assigned_to, description: data.description }),
        onSuccess: () => {
            console.log("Task updated successfully");
            if (projectId) {
                queryClient.invalidateQueries({ queryKey: ["project", projectId] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["project"] });
            }
        },
        onError: (err) => {
            console.error("Error updating task", err);
        }
    });

    const deleteTask = useMutation({
        mutationKey: ["deleteTask"],
        mutationFn: (taskId: number) => deleteProjectTask(taskId),
        onSuccess: () => {
            console.log("Task deleted successfully");
            if (projectId) {
                queryClient.invalidateQueries({ queryKey: ["project", projectId] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["project"] });
            }
        },
        onError: (err) => {
            console.error("Error deleting task", err);
        }
    });

    return {
        addTask,
        updateTaskPosition,
        updateTask,
        deleteTask
    };
};
