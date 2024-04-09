import React from "react";
import TaskList from "../task-list/task-list";
import { useGetAllTaskListsQuery } from "@/store/services/task-lists-service";

const TaskListBoard: React.FC<any> = () => {
  const { data, isLoading, isError } = useGetAllTaskListsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading task lists</div>;
  }

  return (
    <div className="w-full grid grid-cols-4 gap-8 mt-[30px]">
      {data?.map((taskList) => (
        <TaskList key={taskList.id} taskList={taskList} />
      ))}
    </div>
  );
};

export default TaskListBoard;
