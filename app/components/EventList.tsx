import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import dateFormatter from "@/lib/dateFormatter";
import { PATH_EVENTS } from "@/lib/constants/paths";

type Props = {
  heading?: string;
  events: Event[];
};

const EventList = ({ heading = "Arrangementer", events }: Props) => {
  return (
    <div className="h-full p-5 bg-black lg:p-10 text-gray">
      <h2 className="font-serif text-3xl font-bold tracking-tighter text-center md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      <ul className="mt-5 lg:mt-10">
        {events &&
          events.map((event) => {
            const isPastEvent = new Date(event.dateTimeStart) < new Date();
            return (
              <li
                key={event._id}
                className={`${
                  isPastEvent && "line-through"
                } py-1 transition-all ease-in-out border-b hover:bg-gray hover:text-black hover:px-10 border-b-gray group`}
              >
                <ClientSideRoute route={`/${PATH_EVENTS}/${event.slug.current}`}>
                  <div className="flex justify-between text-lg lg:text-xl">
                    <h3 className="leading-snug truncate">{event.title}</h3>
                    <p className="w-1/3 leading-snug text-right">
                      {dateFormatter(event.dateTimeStart)}
                    </p>
                  </div>
                </ClientSideRoute>
              </li>
            );
          })}
      </ul>
      <ClientSideRoute route={`/${PATH_EVENTS}`}>
        <p className="mt-5 text-lg text-center hover:underline lg:mt-10 lg:text-xl">
          Se alle arrangementer
        </p>
      </ClientSideRoute>
    </div>
  );
};

export default EventList;
