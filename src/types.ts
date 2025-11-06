export type Task = {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: string; 
  updatedAt: string; 
};

export type CreateTask = {
  title: string;
  description?: string;
};

export type UpdateTask = {
  title: string;
  description?: string;
  completed: boolean;
};
