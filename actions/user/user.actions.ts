'use server';

import { getToken } from '@lib/server-utils';

export async function getUserProfile() {
    const token = await getToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao buscar informações de usuário: ', errorData.details);
            return [];
        }
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar informações de usuário: ', error);
        return [];
    }
}

export async function getProductivityData() {
    const token = await getToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/productivity`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Erro ao buscar dados de produtividade: ', errorData.details);
            return null;
        }
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar dados de produtividade: ', error);
        return null;
    }
}