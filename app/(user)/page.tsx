import EventList from "../components/EventList";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import EventFeatured from "../components/EventFeatured";
import OpeningHours from "../components/OpeningHours";
import PageTitle from "../components/PageTitle";

import moment from "moment";
import { formatISO } from "date-fns";
import "moment-timezone";

const curWeekStart = moment().tz("Europe/Berlin").startOf("week").toDate();
const curWeekEnd = moment().tz("Europe/Berlin").endOf("week").toDate();
const nextWeekStart = moment().tz("Europe/Berlin").add(1, "weeks").startOf("week").toDate();
const nextWeekEnd = moment().tz("Europe/Berlin").add(1, "weeks").endOf("week").toDate();

const query = groq`{
  "globals": *[_type == "globals"][0] {
  ...,
  },
  "events": {
    "next": *[_type == "event" && dateTimeStart >= now()] {
      ...,
      categories[]->
    } | order(dateTimeStart asc) [0],
    "currentWeek": *[_type == "event" && dateTimeStart >= "${formatISO(
      curWeekStart
    )}" && dateTimeStart <= "${formatISO(curWeekEnd)}"] {
      ...,
      categories[]->
    } | order(dateTimeStart asc),
    "nextWeek": *[_type == "event" && dateTimeStart >= "${formatISO(
      nextWeekStart
    )}" && dateTimeStart <= "${formatISO(nextWeekEnd)}"] {
      ...,
      categories[]->
    } | order(dateTimeStart asc),
  }
}`;

export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(query);
  const {
    events: { next: nextEvent, currentWeek: currentWeekEvents, nextWeek: nextWeekEvents },
    globals,
  } = data;

  const eventsToList =
    currentWeekEvents.length > 0
      ? currentWeekEvents
      : nextWeekEvents.length > 0
      ? nextWeekEvents
      : null;

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
        {nextEvent && (
          <div className="w-full">
            <EventFeatured event={nextEvent} />
          </div>
        )}
        {eventsToList && (
          <div className="w-full">
            <EventList
              heading={
                currentWeekEvents.length > 0 ? "Denne uken på Vaktbua" : "Neste uke på Vaktua"
              }
              events={eventsToList}
              seeAll
            />
          </div>
        )}
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
