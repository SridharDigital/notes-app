import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/shared/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cenvic Notes App",
  description: "Save your notes with ease",
};

async function getData(userId: string) {
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${data?.colorScheme ?? "theme-green"}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
