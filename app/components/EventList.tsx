import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import dateFormatter from "@/lib/dateFormatter";
import { PATH_EVENTS } from "@/lib/constants/paths";

type Props = {
  heading?: string;
  events: Event[];
  seeAll?: boolean;
};

const EventList = ({ heading = "Arrangementer", events, seeAll }: Props) => {
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
                  isPastEvent && "opacity-60"
                } py-1 transition-all ease-in-out border-b hover:bg-gray hover:text-black border-b-gray group`}
              >
                <ClientSideRoute route={`/${PATH_EVENTS}/${event.slug.current}`}>
                  <div className="flex justify-between text-lg lg:text-xl">
                    <h3 className="leading-snug truncate">{event.title}</h3>
                    <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap space-x-2">
            {event.categories && event.categories.map((category) => (
              <span className="block px-2 py-0.5 text-sm border border-gray group-hover:border-black tag rounded-3xl">{category.title}</span>
            ))}
          </div>
                    <p className="leading-snug text-right">
                      {dateFormatter(event.dateTimeStart)}
                    </p>
                  </div>
                  </div>
                </ClientSideRoute>
              </li>
            );
          })}
      </ul>
      {seeAll && <ClientSideRoute route={`/${PATH_EVENTS}`}>
        <p className="mt-5 text-lg text-center hover:underline lg:mt-10 lg:text-xl">
          Se alle arrangementer
        </p>
      </ClientSideRoute>
      }
    </div>
  );
};

export default EventList;
