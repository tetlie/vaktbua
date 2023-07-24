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
    <div className='w-2/3 px-10 py-10 bg-black text-gray'>
      <h2 className='font-serif text-5xl font-normal text-center'>Arrangementer</h2>
      <ul className='mt-10'>
        {events && events.map((event) => (
          <li key={event._id} className='pt-1 border-b-2 border-b-gray group'>
            <ClientSideRoute route={`/event/${event.slug.current}`}>
              <div className='flex justify-between text-xl font-bold'>
                <h3 className='leading-0'>{event.title}</h3>
                <p className='leading-0'>
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