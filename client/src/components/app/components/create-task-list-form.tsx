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

const CreateTaskListForm = ({ handleCreateTasklist }) => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data) => handleCreateTasklist(data.name);

  return (
    <Form {...form}>
      <h1 className="font-bold text-[24px] text-center">
        Create new task list
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreateTaskListForm;
