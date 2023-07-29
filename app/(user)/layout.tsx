import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import urlFor from "@/lib/urlFor";
import Logo from "../components/Logo";

const query = groq`{
  "globals": *[_type == "globals"][0] {
  ...,
  },
}`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(query);
  const { globals } = data;
  const imageUrl: string = urlFor(globals.image).url();
  const title: string = globals.title || "Vaktbua";

  return {
    title: { default: title, template: `%s // ${title}` },
    description: globals.description,
    openGraph: {
      images: [imageUrl],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch(query);
  const { globals } = data;
  return (
    <html lang="nb">
      <body className="flex flex-col justify-between min-h-screen p-5 mx-auto overflow-x-hidden tracking-tight lg:p-10 max-w-screen bg-gray max-w-7xl">
        <div className="fixed pointer-events-none bottom-12 right-5 mix-blend-difference">
          <Logo />
        </div>
        <Header globals={globals} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
