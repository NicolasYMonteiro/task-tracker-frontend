export type TaskStatus = 'pending' | 'completed' | 'in-progress' | 'cancelled';

export interface Task {
    id: number;
    title: string;
    description: string;
    date: Date;
    interval?: number;
    sequence?: number;
    emergency?: boolean;
    status: TaskStatus;
    createdAt?: Date;
}