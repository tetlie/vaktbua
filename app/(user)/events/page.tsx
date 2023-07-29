import Image from "next/image";
import EventList from "../../components/EventList";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import EventFeatured from "../../components/EventFeatured";
import OpeningHours from "../../components/OpeningHours";
import PageTitle from "@/app/components/PageTitle";

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

export default async function Events() {
  const data = await client.fetch(query);
  const { events, globals } = data;
  return (
    <div>
      <PageTitle title={"Events"} />
      <section className="items-center w-full h-full mt-5 space-y-5 lg:mt-10 ">
        <div className="w-full">
          <EventFeatured event={events[0]} />
        </div>
        <div className="w-full">
          <EventList events={events} />
        </div>
      </section>
    </div>
  );
}
