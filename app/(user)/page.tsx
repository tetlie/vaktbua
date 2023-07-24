import Image from 'next/image'
import EventList from '../components/EventList'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import EventFeatured from '../components/EventFeatured'

const query = groq`
  *[_type == "event"] {
  ...,
  categories[]->
  } | order(_createdAt desc)
`

export const revalidate = 60; // revalidate every minute

export default async function Home() {
  const events = await client.fetch(query)
  return (
    <div>
      <section className='mt-10'>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='font-serif font-bold text-black text-9xl'>Vaktbua</h1>
          <p className='mt-10 font-serif font-normal leading-[0.94em] text-center text-black text-8xl'>
            Kristiansands gjemte perle, ved foten av Odderøya med konserter og stor solrik hage.
          </p>
        </div>
      </section>
      <section className='flex items-center w-full mt-10 space-x-10'>
        <EventFeatured event={events[0]} />
        <EventList events={events} />
      </section> 
      <section className='flex items-center justify-center w-full mt-10 space-x-10'>
        <div className="font-serif font-normal text-center text-8xl">
          <p>Dele</p>
          <p>Samarbeide</p>
          <p>Delta</p>
        </div>
      </section> 
      <section className='flex items-center justify-center w-full mt-10 space-x-10'>
        <ul className='w-2/3 px-10 py-10 text-xl text-center bg-black text-gray'>
        
        <li>Mandag Stengt</li>
        <li>Tirsdag 16:00 – 00:00</li>
        <li>Onsdag 16:00 – 00:00</li>
        <li>Torsdag 16:00 – 00:00</li>
        <li>Fredag 16:00 – 02:30</li>
        <li>Lørdag 14:00 – 02:30</li>
        <li>Søndag 14:00 – 00:00</li>
        </ul>
      </section> 
    </div>
  )
}
