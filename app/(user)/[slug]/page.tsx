import { groq } from "next-sanity";

import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/RichTextComponents";
import { Metadata } from "next";
import PageTitle from "@/app/components/PageTitle";

type Props = {
  params: {
    slug: string;
  };
};

const query = groq`*[_type == "page" && slug.current == $slug][0]
    {
      ...,
    }
  `;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const page: Page = await client.fetch(query, { slug });
  const imageUrl: string = page.image ? urlFor(page.image).url() : "";
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: [imageUrl],
    },
    alternates: {
      canonical: `/${page.slug.current}`,
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`*[_type=="page"]{
    slug
  }`;
  const pages: Page[] = await client.fetch(query);
  const paths = pages.map((page) => page.slug.current);
  return paths.map((slug) => ({
    slug: slug,
  }));
}

const Page = async ({ params: { slug } }: Props) => {
  const page: Page = await client.fetch(query, { slug });
  return (
    <article>
      <PageTitle title={page.title} />
      <section>
        <div className="mt-5 lg:mt-10">
          <p className="tracking-tight font-normal leading-[0.96em] text-center text-black text-3xl md:text-4xl lg:text-5xl">
            {page.description}
          </p>
        </div>
      </section>
      <section>
        <div className="mt-5 lg:mt-10 relative w-full transition-transform duration-200 ease-out h-[50vh]">
          {page.image && (
            <Image
              className="object-cover object-left lg:object-center"
              src={urlFor(page.image).url()}
              alt={page.title}
              fill
            />
          )}
        </div>
      </section>
      <section className="pt-5">
        <PortableText value={page.body} components={RichTextComponents} />
      </section>
    </article>
  );
};

export default Page;
