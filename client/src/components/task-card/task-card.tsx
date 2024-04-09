import React, { useState } from "react";
import { TaskType } from "../../types/TaskType";
import { useGetAllTaskListsQuery } from "@/store/services/task-lists-service";
import {
  useMoveTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/store/services/tasks-service";
import TaskCardDropdown from "./components/task-card-dropdown";
import Modal from "../modal/modal";
import EditTaskForm from "./components/edit-task-form";
import formatDate from "../utils/formatDate";

type TaskProps = {
  task: TaskType;
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetAllTaskListsQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [moveTask] = useMoveTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

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

  const handleEditTask = (taskId: number, data: any) => {
    updateTask({ taskId, ...data })
      .then(() => {
        console.log("Task updated successfully!");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
      });
  };

  return (
    <div className="flex flex-col gap-2 p-5 h-auto p-3.75 rounded-lg border border-gray-300 w-full">
      <div className="flex justify-between">
        <p className="font-bold">{task?.name}</p>
        <TaskCardDropdown
          setIsModalOpen={setIsModalOpen}
          handleDeleteTask={handleDeleteTask}
          taskId={task.id}
        />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EditTaskForm oldData={task} handleEditTask={handleEditTask} />
        </Modal>
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
