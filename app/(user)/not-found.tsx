import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import PageTitle from "../components/PageTitle";

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

export default async function FourOhFour() {
  const data = await client.fetch(query);
  const { nextEvent, events, globals } = data;

  return (
    <div>
      <PageTitle title="{globals.title}" />
      <section className="">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="tracking-tight font-normal leading-[0.96em] text-center text-black text-3xl md:text-4xl lg:text-5xl">
            {globals.description}
          </p>
        </div>
      </section>
    </div>
  );
}
