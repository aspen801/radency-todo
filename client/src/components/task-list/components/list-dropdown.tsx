import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, Plus } from "lucide-react";
import IconButton from "../../icon-button/icon-button";

const ListDropdown = ({
  setIsEditModalOpen,
  deleteTaskList,
  taskListId,
}: {
  setIsEditModalOpen: Function;
  deleteTaskList: Function;
  taskListId: number;
}) => {
  const handleDeleteTaskList = (taskListId: number) => {
    deleteTaskList({ taskListId }).then(() => {
      console.log("Task list deleted successfully!");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add new cart</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteTaskList(taskListId)}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListDropdown;
