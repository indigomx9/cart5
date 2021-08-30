import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJSON } from "../global/FetchAPI";
const USER_QUERY_KEY = "user";

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
                queryClient.setQueryData(USER_QUERY_KEY, user);
                return true;
            } catch (error) {
                return false;
            }
        },
        signInError: mutation.isError,
        signInLoading: mutation.isLoading,
    };
};

export function useSignOut() {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => fetchJSON("/api/logout"));
    return async () => {
        await mutation.mutateAsync();
        queryClient.setQueryData(USER_QUERY_KEY, undefined);
    }
};

export function useUser() {
    const query = useQuery(USER_QUERY_KEY, async () => {
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





