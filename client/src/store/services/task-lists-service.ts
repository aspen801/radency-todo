import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskListType } from "@/types/TaskListType";

export const taskListsApi = createApi({
  reducerPath: "taskListsApi",
  tagTypes: ["TaskLists"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/task-lists/" }),
  endpoints: (build) => ({
    getAllTaskLists: build.query<[], void>({
      query: () => `/`,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "TaskLists",
                id,
              })),
              { type: "TaskLists", id: "LISTS" },
            ]
          : [{ type: "TaskLists", id: "LISTS" }];
      },
    }),
    createTaskList: build.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TaskLists", id: "LISTS" }],
    }),
    deleteTaskList: build.mutation({
      query: ({ taskListId }) => ({
        url: `/delete/${taskListId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TaskLists", id: "LISTS" }],
    }),
    updateTaskList: build.mutation({
      query: ({ taskListId, ...body }) => ({
        url: `/update/${taskListId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "TaskLists", id: "LISTS" }],
    }),
  }),
});

export const {
  useGetAllTaskListsQuery,
  useCreateTaskListMutation,
  useDeleteTaskListMutation,
  useUpdateTaskListMutation,
} = taskListsApi;
