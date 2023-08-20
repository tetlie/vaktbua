import React from "react";

interface Props {
  openingHours: OpeningHours;
}

interface Day {
  title: string;
  hours: string;
}

const OpeningHours = ({ openingHours }: Props) => {
  const openingHoursArr: Day[] = [
    { title: "Mandag", hours: openingHours.monday },
    { title: "Tirsdag", hours: openingHours.tuesday },
    { title: "Onsdag", hours: openingHours.wednesday },
    { title: "Torsdag", hours: openingHours.thursday },
    { title: "Fredag", hours: openingHours.friday },
    { title: "Lørdag", hours: openingHours.saturday },
    { title: "Søndag", hours: openingHours.sunday },
  ];

  return (
    <div className="w-full p-5 text-center bg-black lg:p-10 text-gray">
      <h2 className="font-serif text-3xl font-bold tracking-tighter text-center md:text-4xl lg:text-5xl">
        Åpningstider
      </h2>
      <ul className="mt-5 text-lg leading-snug lg:mt-10 lg:text-xl">
        {openingHoursArr.map(({ title, hours }: Day) => {
          return (
            <li className="flex justify-between py-1 border-b border-b-gray">
              <span className="capitalize">{title}</span>
              <span>{hours}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OpeningHours;
