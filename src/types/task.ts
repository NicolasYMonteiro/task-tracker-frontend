export type TaskStatus = 'PENDING' | 'COMPLETED' | 'IN-PROGRESS' | 'CANCELLED';

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

export interface CreateTask {
    title: string;
    description: string;
    date: Date;
    interval?: number;
    sequence?: number;
    emergency?: boolean;
    status: TaskStatus;
}