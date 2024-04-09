import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const EditTaskListForm = ({ oldData, handleEditTasklist }) => {
  const editTaskListform = useForm({
    defaultValues: {
      ...oldData,
    },
  });

  console.log("rendered edit task list form");

  const onSubmit = (data: object) => {
    handleEditTasklist(oldData.id, data);
  };

  return (
    <Form {...editTaskListform}>
      <h1 className="font-bold text-[24px] text-center">Update task list</h1>
      <form
        onSubmit={editTaskListform.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={editTaskListform.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter task list name</FormLabel>
              <FormControl>
                <Input placeholder="Task list name" {...field} type="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditTaskListForm;
