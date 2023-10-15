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
  "upcomingEvents": *[_type == "event" && dateTimeStart >= now()] {
  ...,
  categories[]->
  } | order(dateTimeStart asc),
  "pastEvents": *[_type == "event" && dateTimeStart < now()] {
  ...,
  categories[]->
  } | order(dateTimeStart desc),
}`;

export const revalidate = 60;

export default async function Events() {
  const data = await client.fetch(query);
  const { upcomingEvents, pastEvents } = data;
  const nextEvent = upcomingEvents[0];

  console.log("nextEvent", nextEvent);

  return (
    <div>
      <PageTitle title={"Arrangement"} />
      <section className="items-center w-full h-full mt-5 space-y-5 lg:mt-10 ">
        <div className="w-full">
          {nextEvent && <EventFeatured event={nextEvent} />}
        </div>
        <div className="w-full">
          {upcomingEvents.length > 0 && <EventList heading="Kommende" events={upcomingEvents} />}
        </div>
        <div className="w-full">
          {pastEvents.length > 0 && <EventList heading="Tidligere" events={pastEvents} />}
        </div>
      </section>
    </div>
  );
}
