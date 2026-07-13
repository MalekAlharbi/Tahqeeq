import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/endpoints"

export const useUser = () => {
    const user = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    return user
}