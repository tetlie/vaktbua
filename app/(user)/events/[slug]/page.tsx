import { groq } from "next-sanity";
import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/RichTextComponents";
import dateFormatter from "@/lib/dateFormatter";
import { Metadata } from "next";
import PageTitle from "@/app/components/PageTitle";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

const query = groq`*[_type == "event" && slug.current == $slug][0]
    {
      ...,
      categories[]->
    }
  `;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event: Event = await client.fetch(query, { slug });
  const imageUrl: string = event.image ? urlFor(event.image).url() : "";
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      images: [imageUrl],
    },
    alternates: {
      canonical: `/events/${event.slug.current}`,
    },
  };
}

export const revalidate = 60;

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
  const event: Event = await client.fetch(query, { slug });
  return (
    <article>
      <PageTitle title={event.title} />
      <section>
        <div className="mt-5 lg:mt-10">
          <p className="tracking-tight font-normal leading-[0.96em] text-center text-black text-3xl md:text-4xl lg:text-5xl">
            {event.description}
          </p>
        </div>
        <div className="mt-5 lg:mt-10">
          <Link href={event.ticketUrl} target="_blank">
            <span className="block font-serif text-3xl font-bold tracking-tighter text-center text-black hover:underline md:text-4xl lg:text-5xl">
              Billetter
            </span>
          </Link>
        </div>
      </section>
      <section className="mt-5 lg:mt-10">
        <div className="flex justify-between text-lg lg:text-xl">
          <div className="flex space-x-2">
            {event.categories.map((category, i, arr) => (
              <span key={category._id}>
                <span>{category.title}</span>
                {i < arr.length - 1 && (
                  <span className="pl-2" key={i}>
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="leading-0">{dateFormatter(event.dateTimeStart)}</p>
        </div>
        <div className="mt-5 lg:mt-10 relative w-full transition-transform duration-200 ease-out h-[50vh]">
          {event.image && (
            <Image
              className="object-cover object-left lg:object-center"
              src={urlFor(event.image).url()}
              alt={event.title}
              fill
            />
          )}
        </div>
      </section>
      <section className="pt-5">
        <PortableText value={event.body} components={RichTextComponents} />
      </section>
    </article>
  );
};

export default Event;
