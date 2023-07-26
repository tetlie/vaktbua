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
    <div className="p-5 bg-black lg:p-10 grow text-gray">
      <h2 className="text-lg text-center lg:text-xl">Neste arrangement</h2>
      <ClientSideRoute route={`/event/${event.slug.current}`}>
        <div className="mt-5 lg:mt-10">
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.96em] font-bold tracking-tighter text-center">
            {event.title}
          </h3>
        </div>
        <p className="mt-5 text-xl text-center lg:mt-10">
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
