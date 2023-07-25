import { groq } from "next-sanity";
import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // revalidate every minute

export async function generateStaticParams() {
  const query = groq`*[_type=="event"]{
    slug
  }`;
  const events: Event[] = await client.fetch(query);
  const paths = events.map((event) => event.slug.current);
  return paths.map((slug) => ({
    slug: slug,
  }));
}

const Event = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == "event" && slug.current == $slug][0]
    {
      ...,
      categories[]->
    }
  `;
  const event: Event = await client.fetch(query, { slug });
  return (
    <article>
      <section>
        <div>
          <div className="relative w-full transition-transform duration-200 ease-out h-96 drop-shadow-xl group-hover:scale-105">
            <Image
              className="object-cover object-left lg:object-center"
              src={urlFor(event.mainImage).url()}
              alt={event.title}
              fill
            />
          </div>
          <div className="mt-10">
            <div className="flex justify-between text-xl font-bold">
              <div className="flex space-x-2">
                {event.categories.map((category, i, arr) => (
                  <>
                    <span key={category._id}>{category.title}</span>
                    {i < arr.length - 1 && <span key={i}>//</span>}
                  </>
                ))}
              </div>
              <p className="leading-0">
                {new Date(event._createdAt).toLocaleDateString("no", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <p className="tracking-tighter font-bold leading-[0.94em] text-center text-black text-8xl">
            {event.title}
          </p>
        </div>
      </section>
      <section>{/* <PortableText value={event.body} components={RichTextComponents} /> */}</section>
    </article>
  );
};

export default Event;
