import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "task-manager",
  description: "A advanced task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="">
        <main>
          {children}
        </main>
        <footer className="fixed bottom-0 w-full pb-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Atlas Desenvolvimento. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
