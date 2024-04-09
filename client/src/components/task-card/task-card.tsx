import React from "react";
import { TaskType } from "../../types/TaskType";
import { useGetAllTaskListsQuery } from "@/store/services/task-lists-service";
import {
  useMoveTaskMutation,
  useDeleteTaskMutation,
} from "@/store/services/tasks-service";
import TaskCardDropdown from "./components/task-card-dropdown";
import formatDate from "../utils/formatDate";

type TaskProps = {
  task: TaskType;
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { data } = useGetAllTaskListsQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [moveTask] = useMoveTaskMutation();

  const handleMoveTask = (newListId: number, taskId: number) => {
    moveTask({ taskId, newListId })
      .then(() => {
        console.log("Task moved successfully!");
      })
      .catch((error) => {
        console.error("Failed to move task:", error);
      });
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask({ taskId })
      .then(() => {
        console.log("Task deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to deleted task:", error);
      });
  };

  return (
    <div className="flex flex-col gap-2 p-5 h-auto p-3.75 rounded-lg border border-gray-300 w-full">
      <div className="flex justify-between">
        <p className="font-bold">{task?.name}</p>
        <TaskCardDropdown
          handleDeleteTask={handleDeleteTask}
          taskId={task.id}
        />
      </div>
      <p className="text-gray-400">{task?.description}</p>
      <p>{formatDate(task?.due_date)}</p>
      <p className="text-gray-400 bg-slate-200 w-max text-sm px-2 py-0.5 rounded-xl">
        • {task?.priority}
      </p>
      {/* shadcn badge*/}
      <div>
        <select
          onChange={(e) => handleMoveTask(Number(e.target.value), task.id)}
          className=""
        >
          <option>Move to</option>
          {data?.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        {/* shadcn dropdown button */}
      </div>
    </div>
  );
};

export default TaskCard;
