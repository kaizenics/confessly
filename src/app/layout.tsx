import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "~/context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confession Wall",
  description:
    "Whisper your secrets. This Valentine's, love speaks anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-black bg-gray-950">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <AuthContextProvider>
         {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
