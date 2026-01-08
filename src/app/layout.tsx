import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mood Trash Can",
  description: "A place to release your negative emotions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
