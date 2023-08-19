import BASE_URL from "@/lib/constants/baseUrl";
import { PATH_EVENTS } from "@/lib/constants/paths";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap() {
  const eventsQuery = groq`*[_type=="event"]{
    slug,
    _updatedAt
  }`;
  const events: Event[] = await client.fetch(eventsQuery);
  const eventUrls =
    events.map((event: Event) => {
      return {
        url: `${BASE_URL}/${PATH_EVENTS}/${event.slug.current}`,
        lastModified: event._updatedAt,
      };
    }) ?? [];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/${PATH_EVENTS}`,
      lastModified: new Date(),
    },
    ...eventUrls,
  ];
}
