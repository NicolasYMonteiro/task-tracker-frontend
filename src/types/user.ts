import { TaskStatus } from '@sharedTypes/task';


export type UserProfile = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  taskStats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    averageCompletionTime: number;
    highPriority: number;
  };
  recentTasks: {
    id: number;
    title: string;
    status: TaskStatus;
    date: Date;
  }[];
};