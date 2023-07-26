import urlFor from "@/lib/urlFor";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import Link from "next/link";

type Props = {
  events: Event[];
};

const EventList = ({ events }: Props) => {
  return (
    <div className="h-full p-5 bg-black lg:p-10 text-gray">
      <h2 className="font-serif text-3xl font-bold tracking-tighter text-center md:text-4xl lg:text-5xl">
        Arrangementer
      </h2>
      <ul className="mt-5 lg:mt-10">
        {events &&
          events.map((event) => (
            <li key={event._id} className="py-1 border-b border-b-gray group">
              <ClientSideRoute route={`/event/${event.slug.current}`}>
                <div className="flex justify-between text-lg lg:text-xl">
                  <h3 className="leading-snug truncate">{event.title}</h3>
                  <p className="w-1/3 leading-snug text-right">
                    {new Date(event._createdAt).toLocaleDateString("no", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </ClientSideRoute>
            </li>
          ))}
      </ul>
      <Link target="_blank" href="https://www.facebook.com/vaktbua/events">
        <p className="mt-5 text-lg text-center lg:mt-10 lg:text-xl">
          Se alle arrangementer på Facebook
        </p>
      </Link>
    </div>
  );
};

export default EventList;
