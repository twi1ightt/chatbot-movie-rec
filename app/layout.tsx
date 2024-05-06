import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatSideBar from "../components/chatbot/ChatSideBar";
import { SessionProvider } from "../client/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";
import Link from "next/link";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unwind AI",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const heads = headers();

  const pathname = heads.get("referer") || "";

  console.log(pathname);
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <SessionProvider Session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <ClientProvider />
              <div className="flex-1 bg-[#92afc4ec]">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
