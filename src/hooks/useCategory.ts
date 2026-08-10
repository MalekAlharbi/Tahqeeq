import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addProjectCategory, getProjectCategories, updateProjectCategory, deleteProjectCategory } from "../api/endpoints"

export const useCategory = (id: number) => {

    const queryClient = useQueryClient();

    const getCategories = useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectCategories(id),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const addCategory = useMutation({
        mutationKey: ["addCategory"],
        mutationFn: (data: { title: string }) => addProjectCategory(id, data),
        onSuccess: () => {
            console.log("Category added successfully")
            queryClient.invalidateQueries({ queryKey: ["project", id] })
        },
        onError: (err) => {
            console.log("Error adding category", err)
        }
    })

    const updateCategory = useMutation({
        mutationKey: ["updateCategory"],
        mutationFn: (data: { categoryId: number; title: string }) => updateProjectCategory(data.categoryId, { title: data.title }),
        onSuccess: () => {
            console.log("Category updated successfully")
            queryClient.invalidateQueries({ queryKey: ["project", id] })
        },
        onError: (err) => {
            console.error("Error updating category", err)
        }
    })

    const deleteCategory = useMutation({
        mutationKey: ["deleteCategory"],
        mutationFn: (categoryId: number) => deleteProjectCategory(categoryId),
        onSuccess: () => {
            console.log("Category deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["project", id] })
        },
        onError: (err) => {
            console.error("Error deleting category", err)
        }
    })

    return {
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    }
}