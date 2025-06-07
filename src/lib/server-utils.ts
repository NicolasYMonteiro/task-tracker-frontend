import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    console.error('Token JWT não encontrado nos cookies');
    return [];
  }
  return token;
}