'use server';

import { cookies } from 'next/headers';
import type { CreateTask } from '@sharedTypes/task';

export async function getTasks() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        console.error('Token JWT não encontrado nos cookies');
        return [];
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/listAll`, {
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
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        console.error('Token JWT não encontrado nos cookies');
        return { success: false, message: 'Token JWT não encontrado nos cookies' };
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/create`, {
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
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    console.log("json: ", JSON.stringify(task))
    if (!token) {
        console.error('Token JWT não encontrado nos cookies');
        return { success: false, message: 'Token JWT não encontrado nos cookies' };
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`, {
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

export async function deleteTask(id: number) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        console.error('Token JWT não encontrado nos cookies');
        return { success: false, message: 'Token JWT não encontrado nos cookies' };
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/delete/${id}`, {
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