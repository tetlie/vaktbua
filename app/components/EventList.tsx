import urlFor from '@/lib/urlFor'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import React from 'react'
import ClientSideRoute from './ClientSideRoute'

type Props = {
  events: Event[]
}

const EventList = ({events}: Props) => {
  console.log(events)
  return (
    <div>
      <h2>Arrangementer</h2>
      <ul>
        {events && events.map((event) => (
          <li key={event._id} className='border-b group'>
            <ClientSideRoute route={`/event/${event.slug.current}`}>
              {event.mainImage && (
                <div className='relative w-full transition-transform duration-200 ease-out h-80 drop-shadow-xl group-hover:scale-105'>
                  <Image
                    className='object-cover object-left lg:object-center'
                    src={urlFor(event.mainImage).url()}
                    alt={event.title}
                    fill
                  />
                </div>
              )}
              <div className='flex justify-between font-bold'>
                <h3>{event.title}</h3>
                <p>
                  {new Date(event._createdAt).toLocaleDateString(
                    "no", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }
                  )}
                </p>
              </div>
            </ClientSideRoute>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList