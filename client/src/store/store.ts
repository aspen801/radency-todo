import { configureStore } from "@reduxjs/toolkit";
import { taskListsApi } from "./services/task-lists-service";
import { tasksApi } from "./services/tasks-service";

export const store = configureStore({
  reducer: {
    [taskListsApi.reducerPath]: taskListsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskListsApi.middleware, tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
