import TaskListBoard from "../task-list-board/task-list-board";
import Button from "../button/button";
import { useState } from "react";
import { useCreateTaskListMutation } from "@/store/services/task-lists-service";
import Modal from "../modal/modal";
import { History } from "lucide-react";
import { Plus } from "lucide-react";
import CreateTaskListForm from "./components/create-task-list-form";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createTaskList] = useCreateTaskListMutation();

  const handleCreateTasklist = (taskListName) => {
    if (!taskListName) {
      alert("Please enter a name for the task list.");
      return;
    }
    createTaskList({ name: taskListName }).then(() => {
      console.log("Task list created successfully!");
      setIsModalOpen(false);
    });
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskListForm handleCreateTasklist={handleCreateTasklist} />
      </Modal>
      <div className="w-full flex py-16 justify-center items-center">
        <div className="w-[1280px] p-4 h-full outline-slate-400 outline-dashed rounded-md">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">My Task Board</h1>
            <div className="flex gap-2">
              <Button
                icon={<History className="mr-2 h-4 w-4" />}
                title="History"
              />
              <Button
                icon={<Plus className="mr-2 h-4 w-4" />}
                title="Create new list"
                btnType="grey"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          <TaskListBoard />
        </div>
      </div>
    </>
  );
};

export default App;
