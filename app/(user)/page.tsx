import EventList from "../components/EventList";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import EventFeatured from "../components/EventFeatured";
import OpeningHours from "../components/OpeningHours";
import PageTitle from "../components/PageTitle";
import moment from "moment";

import "moment-timezone";

const query = groq`{
  "globals": *[_type == "globals"][0] {
  ...,
  },
  "nextEvent": *[_type == "event" && dateTimeStart > now()] | order(dateTimeStart asc) [0],
  "events": *[_type == "event"] {
  ...,
  categories[]->
  } | order(dateTimeStart asc)
}`;

export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(query);
  const { nextEvent, events, globals } = data;

  const curWeekStart = moment().tz("Europe/Berlin").startOf("week").toDate().toISOString();
  const curWeekEnd = moment().tz("Europe/Berlin").endOf("week").toDate().toISOString();

  const eventsThisWeek = events.filter((event: Event) => {
    const eventDate = new Date(event.dateTimeStart).toISOString();
    return eventDate >= curWeekStart && eventDate <= curWeekEnd;
  });

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
          <EventFeatured event={nextEvent} />
        </div>
        <div className="w-full">
          <EventList heading="Denne uken på Vaktbua" events={eventsThisWeek} seeAll />
        </div>
      </section>
      <section className="flex items-center justify-center w-full mt-5 space-x-10 lg:mt-10">
        <div className="leading-[0.96em] text-6xl tracking-tight text-center md:text-7xl lg:text-8xl">
          <p>Dele</p>
          <p>Samarbeide</p>
          <p>Delta</p>
        </div>
      </section>
      <section className="mt-5 lg:mt-10">
        <div className="w-full">
          <OpeningHours openingHours={globals.openingHours} />
        </div>
      </section>
    </div>
  );
}
