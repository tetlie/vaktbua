import Image from 'next/image'
import EventList from '../components/EventList'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

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
      <h1>Vaktbua</h1>
      <EventList events={events} />
    </div>
  )
}
