import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addProjectCategory, getProjectCategories } from "../api/endpoints"

export const useCategory = (id:number) => {

    const queryClient = useQueryClient();

    const getCategories = useQuery({
        queryKey: ["project",id],
        queryFn: () => getProjectCategories(id),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const addCategory = useMutation({
        mutationKey: ["category"],
        mutationFn: (data: {title: string}) => addProjectCategory(id, data),
        onSuccess: () => {
            console.log("Category added successfully")
            queryClient.invalidateQueries({ queryKey: ["project",id] })
        },
        onError: (err) => {
            console.log("Error adding category", err)
        }
    })

    return {
        getCategories,
        addCategory
    }
}