import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/tasks" }),
  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => `/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({
                type: "Tasks",
                id,
              })),
              { type: "Tasks", id: "TASKS" },
            ]
          : [{ type: "Tasks", id: "TASKS" }],
    }),
    getTasksFromList: build.query({
      query: (listId) => `/${listId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({
                type: "Tasks",
                id,
              })),
              { type: "Tasks", id: "TASKS" },
            ]
          : [{ type: "Tasks", id: "TASKS" }],
    }),
    createTask: build.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "TASKS" }],
    }),
    moveTask: build.mutation({
      query: ({ taskId, newListId }) => ({
        url: `/${taskId}/move/${newListId}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Tasks", id: "TASKS" }],
    }),
    deleteTask: build.mutation({
      query: ({ taskId }) => ({
        url: `/delete/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks", id: "TASKS" }],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTasksFromListQuery,
  useCreateTaskMutation,
  useMoveTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
