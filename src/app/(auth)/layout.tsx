import type { Metadata } from "next";
import "../globals.css";

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
    <div className="">
      <main className="">{children}</main>
    </div>
  );
}