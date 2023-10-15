import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import { PATH_EVENTS } from "@/lib/constants/paths";
import Link from "next/link";

type Props = {
  globals: Globals;
};

const Header = ({ globals }: Props) => {
  const { openingHours, ticketUrl } = globals;

  const openingHoursGreeting = () => {
    const today = new Date();
    const day = today.getDay();

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const norwegianDays = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];

    const dayTitle = norwegianDays[day];

    const dayKey = days[day];
    const hours = openingHours[dayKey as keyof typeof openingHours];

    const isClosed =
      hours === "" || hours === "Stengt" || hours === "stengt" || hours === undefined;

    const stringStart = `I dag (${dayTitle}) er Vaktbua`;
    const stringEnd = isClosed ? "stengt" : ` åpent ${hours}`;
    const string = `${stringStart} ${stringEnd}`;

    return string;
  };

  return (
    <header>
      <div className="flex items-start justify-between w-full">
        <div className="w-1/4">
          <ClientSideRoute route={`/`}>
            <p className="hover:underline text-lg text-left font-normal leading-[0.96em] tracking-tight  lg:text-xl">
              Hjem
            </p>
          </ClientSideRoute>
        </div>
        <div className="px-5 grow">
          <p className="font-serif text-3xl font-normal leading-[0.96em] tracking-tighter text-center md:text-4xl lg:text-5xl">
            {openingHoursGreeting()}
          </p>
        </div>
        <nav className="w-1/4">
          <ul className="lg:flex lg:justify-end lg:space-x-4 space-y-2 lg:space-y-0 text-lg font-normal text-right leading-[0.96em] tracking-tight lg:text-xl">
            <li className="hover:underline">
              <ClientSideRoute route={`/${PATH_EVENTS}`}>
                  Events
              </ClientSideRoute>
            </li>
            <li className="hover:underline">
              <Link href={ticketUrl} target="_blank">
                Billetter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
