import urlFor from "@/lib/urlFor";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  event: Event;
};

const EventFeatured = ({ event }: Props) => {
  return (
    <div className="w-1/3 px-10 py-10 bg-black grow text-gray">
      <h2 className="text-xl text-center">Neste arrangement</h2>
      <ClientSideRoute route={`/event/${event.slug.current}`}>
        <div className="mt-10">
          <h3 className="font-serif text-5xl leading-[0.8em] font-bold tracking-tighter text-center">
            {event.title}
          </h3>
        </div>
        <p className="mt-10 text-xl text-center">
          {new Date(event._createdAt).toLocaleDateString("no", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </ClientSideRoute>
    </div>
  );
};

export default EventFeatured;
