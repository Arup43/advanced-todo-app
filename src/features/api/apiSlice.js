import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://new-server-lws.herokuapp.com"
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/todos",
            providesTags: ["Todos"]
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: "/todos",
                method: "POST",
                body: newTodo,
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodo: builder.mutation({
            query: ({id, updatedTodo}) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: updatedTodo,
            }),
            invalidatesTags: ["Todos"]
        }),
        updateColor: builder.mutation({
            query: ({id, updatedColor}) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: updatedColor,
            }),
            invalidatesTags: ["Todos"]
        }),
        updateStatus: builder.mutation({
            query: ({id, updatedStatus}) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: updatedStatus,
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"]
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useUpdateColorMutation, useUpdateStatusMutation, useDeleteTodoMutation } = apiSlice;