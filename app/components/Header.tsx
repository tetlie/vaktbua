import React from "react";
import ClientSideRoute from "./ClientSideRoute";
import { PATH_EVENTS } from "@/lib/constants/paths";

type Props = {
  globals: Globals;
};

const Header = ({ globals }: Props) => {
  const { openingHours } = globals;

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
        <div className="grow">
          <p className="font-serif text-3xl font-normal leading-[0.96em] tracking-tighter text-center md:text-4xl lg:text-5xl">
            {openingHoursGreeting()}
          </p>
        </div>
        <div className="w-1/4">
          <ClientSideRoute route={`/${PATH_EVENTS}`}>
            <p className="hover:underline text-lg font-normal text-right leading-[0.96em] tracking-tight lg:text-xl">
              Events
            </p>
          </ClientSideRoute>
        </div>
      </div>
    </header>
  );
};

export default Header;
