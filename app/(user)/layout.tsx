import "../../styles/globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import urlFor from "@/lib/urlFor";
import Logo from "../components/Logo";
import BASE_URL from "@/lib/constants/baseUrl";

const query = groq`{
  "globals": *[_type == "globals"][0] {
  ...,
  },
}`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(query);
  const { globals } = data;
  const imageUrl: string = globals.image ? urlFor(globals.image).url() : "";
  const title: string = globals.title || "Vaktbua";

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: title, template: `%s // ${title}` },
    description: globals.description,
    openGraph: {
      images: [imageUrl],
    },
    verification: {
      google: "verification-id",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch(query);
  const { globals } = data;
  return (
    <html lang="nb">
      <body className="flex flex-col justify-between w-screen min-h-screen p-5 mx-auto overflow-x-hidden tracking-tight lg:p-10 bg-gray max-w-7xl">
        <div className="fixed pointer-events-none bottom-12 right-5 lg:right-10 xl:right-36 mix-blend-difference">
          <Logo />
        </div>
        <Header globals={globals} />
        <main className="flex-grow">{children}</main>
        <Footer globals={globals} />
      </body>
    </html>
  );
}
