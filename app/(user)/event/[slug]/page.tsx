import { groq } from 'next-sanity'
import React from 'react'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import urlFor from '@/lib/urlFor'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '@/app/components/RichTextComponents'

type Props = {
  params: {
    slug: string
  }
}

export const revalidate = 60; // revalidate every minute

export async function generateStaticParams() {
  const query = groq`*[_type=="event"]
    {
      slug
    }
  `;
  const events: Event[] = await client.fetch(query);
  const paths = events.map((event) => event.slug.current);
  return paths.map((slug) => ({ 
    slug: slug 
  }));
}

const Event = async ({params: { slug }}: Props) => {
  const query = groq`*[_type == "event" && slug.current == $slug][0]
    {
      ...,
      categories[]->
    }
  `;
  const event: Event = await client.fetch(query, { slug })
  return (
    <article>
      <section>
        <div>
          <div className='relative w-full transition-transform duration-200 ease-out h-80 drop-shadow-xl group-hover:scale-105'>
            <Image
              className='object-cover object-left lg:object-center'
              src={urlFor(event.mainImage).url()}
              alt={event.title}
              fill
            />
            
          </div>
          <div>
            <h1>{event.title}</h1>
            <p>
              {new Date(event._createdAt).toLocaleDateString(
                "no", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }
              )}
            </p>
            <div className='flex space-x-2'>
              {event.categories.map((category) => (
                <span key={category._id}>{category.title}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* <PortableText value={event.body} components={RichTextComponents} /> */}
      </section>
    </article>
  )
}

export default Event