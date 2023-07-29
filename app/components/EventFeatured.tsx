import urlFor from "@/lib/urlFor";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import dateFormatter from "@/lib/dateFormatter";
import { PATH_EVENTS } from "@/lib/constants/paths";

type Props = {
  event: Event;
};

const EventFeatured = ({ event }: Props) => {
  return (
    <ClientSideRoute route={`/${PATH_EVENTS}/${event.slug.current}`}>
      <div className="h-full p-5 transition-all ease-in-out bg-black lg:p-10 grow text-gray group">
        <h2 className="text-lg text-center lg:text-xl">Neste arrangement</h2>
        <div className="mt-5 lg:mt-10">
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.96em] group-hover:underline font-bold tracking-tighter text-center">
            {event.title}
          </h3>
        </div>
        <p className="mt-5 text-xl text-center lg:mt-10">{dateFormatter(event.dateTimeStart)}</p>
      </div>
    </ClientSideRoute>
  );
};

export default EventFeatured;
