export type TaskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: "low" | "medium" | "high";
  list_id: number;
};
