export type TaskStatus = 'pending' | 'completed' | 'in-progress' | 'cancelled';

export interface Task {
    id: number;
    title: string;
    description: string;
    date: Date | string;
    interval?: number;
    sequence?: number;
    emergency?: boolean;
    status: TaskStatus;
    createdAt?: Date;
}