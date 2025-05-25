import type { Metadata } from "next";
import "../globals.css";
import Header from "@components/header/header";


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
    <div>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}
