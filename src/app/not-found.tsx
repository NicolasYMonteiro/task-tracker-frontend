'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/home');
    }, 2000); // 2 segundos

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <p className="text-lg text-gray-600">
        Página não encontrada. Redirecionando para a página inicial...
      </p>
    </main>
  );
}