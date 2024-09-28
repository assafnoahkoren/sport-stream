import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";

type SupabaseSubscribeOptions = {
    event: '*';
    schema: string;
    table: string;
    filter?: string;
    enabled?: boolean;
}

type AppQueryOptions<TQueryFnData, TError, TData> = UseQueryOptions<TQueryFnData, TError, TData> & {
    subscribe?: SupabaseSubscribeOptions;
}

export const useAppQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(options: AppQueryOptions<TQueryFnData, TError, TData>) => {
    return useQuery<TQueryFnData, TError, TData>({
        ...options,
    });
}

export const useAppMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>) => {
    return useMutation<TData, TError, TVariables, TContext>({
        ...options,
        onSuccess: (data, variables, context) => {
            options.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options.onError?.(error, variables, context);
        },
        onSettled: (data, error, variables, context) => {
            options.onSettled?.(data, error, variables, context);
        },
    });
}

export default {
    useAppQuery,
    useAppMutation,
}