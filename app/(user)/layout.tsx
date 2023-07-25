import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Image from "next/image";

export const metadata: Metadata = {
  title: "Vaktbua",
  description: "Dele - Samarbeide - Delta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body className="flex flex-col justify-between min-h-screen p-10 mx-auto tracking-tight bg-gray max-w-7xl">
        <div className="fixed rotate bottom-28 right-5 mix-blend-multiply">
          <Image
            className=" animate-spin-slow"
            alt="Vercel"
            height={200}
            src={"/assets/logo.png"}
            width={200}
          />
        </div>
        <Header />
        <main className="flex-grow mt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
