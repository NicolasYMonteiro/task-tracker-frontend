'use server';

import type { CreateTask } from '@sharedTypes/task';
import { getToken } from '@lib/server-utils';

export async function getTasks(filter: string, order: string) {
    const token = await getToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task/listAll?filter=${filter}&order=${order}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao buscar tarefas:', errorData.details);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        return [];
    }
}

export async function createTask(task: CreateTask) {
    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao criar tarefa:', errorData.details);
            return { success: false, message: errorData.message || 'Erro ao criar tarefa' };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        return { success: false, message: 'Erro ao criar tarefa' };
    }
}

export async function updateTask(id: number, task: CreateTask) {
    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao atualizar tarefa:', errorData);
            return { success: false, message: errorData.message || 'Erro ao atualizar tarefa' };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        return { success: false, message: 'Erro ao atualizar tarefa' };
    }
}

export async function completeTask(id: number) {
    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task/complete/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao completar tarefa:', errorData);
            return { success: false, message: errorData.message || 'Erro ao completar tarefa' };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao completar tarefa:', error);
        return { success: false, message: 'Erro ao completar tarefa' };
    }
}

export async function deleteTask(id: number) {
    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao deletar tarefa:', errorData);
            return { success: false, message: errorData.message || 'Erro ao deletar tarefa' };
        }
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        return { success: false, message: 'Erro ao deletar tarefa' };
    }
}