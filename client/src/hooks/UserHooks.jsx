import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJSON } from "../global/FetchAPI";

export function useSignIn() {
    const queryClient = useQueryClient();
    const mutation = useMutation(({ email, password }) => 
    fetchJSON("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
    }));
    
    return {
        signIn: async (email, password) => {
            try {
                const user = await mutation.mutateAsync({
                    email, password 
                });
                queryClient.setQueryData("user", user);
                return true;
            } catch (error) {
                return false;
            }
        },
        signInError: mutation.isError,
        signInLoading: mutation.isLoading,
    };
};

export function useUser() {
    const query = useQuery("user", async () => {
        try {
            return await fetchJSON("/api/user");
        } catch (error) {
            return undefined;
        };
    }, {
        cacheTime: Infinity,
        staleTime: 30_000, // miliseconds
    });
    return query.data;
};





