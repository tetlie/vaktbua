import Image from "next/image";
import EventList from "../components/EventList";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import EventFeatured from "../components/EventFeatured";
import OpeningHours from "../components/OpeningHours";
import PageTitle from "../components/PageTitle";

const query = groq`{
  "globals": *[_type == "globals"][0] {
  ...,
  },
  "events": *[_type == "event"] {
  ...,
  categories[]->
  } | order(dateTimeStart asc)
}`;

export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(query);
  const { events, globals } = data;
  return (
    <div>
      <PageTitle title={globals.title} />
      <section className="">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="tracking-tight font-normal leading-[0.96em] text-center text-black text-3xl md:text-4xl lg:text-5xl">
            {globals.description}
          </p>
        </div>
      </section>
      <section className="items-center w-full h-full mt-5 space-y-5 lg:mt-10 ">
        <div className="w-full">
          <EventFeatured event={events[0]} />
        </div>
        <div className="w-full">
          <EventList events={events} />
        </div>
      </section>
      <section className="flex items-center justify-center w-full mt-5 space-x-10 lg:mt-10">
        <div className="leading-[0.96em] text-6xl tracking-tight text-center  md:text-7xl lg:text-8xl">
          <p>Dele</p>
          <p>Samarbeide</p>
          <p>Delta</p>
        </div>
      </section>
      <section className="mt-5 lg:mt-10">
        <div className="w-full">
          <OpeningHours />
        </div>
      </section>
    </div>
  );
}
