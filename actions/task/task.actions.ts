'use server';

import { cookies } from 'next/headers';

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

        if (!res.ok) throw new Error('Erro ao buscar tarefas');

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        return [];
    }
}
