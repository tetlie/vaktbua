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

export default async function Home() {
  const events = await client.fetch(query)
  console.log(events)
  return (
    <div>
      <h1>Vaktbua</h1>
      <EventList events={events} />
    </div>
  )
}
