import React, { useState } from "react";
import TaskCard from "../task-card/task-card";
import Button from "../button/button";
import { TaskListType } from "../../types/TaskListType";
import { useGetTasksFromListQuery } from "@/store/services/tasks-service";
import Modal from "../modal/modal";
import { useCreateTaskMutation } from "@/store/services/tasks-service";
import { useDeleteTaskListMutation } from "@/store/services/task-lists-service";
import ListDropdown from "./components/list-dropdown";
import CreateTaskForm from "./components/create-task-form";
import { TaskType } from "@/types/TaskType";

type TaskListProps = {
  taskList: TaskListType;
};

const TaskListHeading: React.FC<any> = ({ taskList, tasks }) => {
  const [deleteTaskList] = useDeleteTaskListMutation();
  return (
    <div className="py-2 flex justify-between border-t-2 border-b-2  border-gray-200">
      <h1 className="m-0">{taskList.name}</h1>
      <div className="flex items-center">
        <h1 className="mr-4">{tasks?.length}</h1>
        <ListDropdown
          deleteTaskList={deleteTaskList}
          taskListId={taskList.id}
        />
      </div>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ taskList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetTasksFromListQuery(taskList.id);
  const [createTask] = useCreateTaskMutation();

  const handleCreateTask = ({ listId, task }: { listId: any; task: any }) => {
    createTask({
      list_id: listId,
      ...task,
    }).then(() => {
      console.log("Task created successfully!");
      setIsModalOpen(false);
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm
          handleCreateTask={handleCreateTask}
          listId={taskList.id}
        />
      </Modal>
      <TaskListHeading taskList={taskList} tasks={data} />
      <Button
        onClick={() => setIsModalOpen(true)}
        title="Add new card"
        btnType="dashed"
      />
      <div className="flex flex-col gap-5">
        {data?.map((task: TaskType) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
