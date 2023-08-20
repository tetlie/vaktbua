import React from "react";

interface Props {
  openingHours: OpeningHours;
}

const Day = ({ hours, index }: { hours: string; index: number }) => {
  const norwegianDays = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
  const dayTitle = norwegianDays[index];
  const isClosed = hours === "" || hours === "Stengt" || hours === "stengt" || hours === undefined;

  return (
    <li className="flex justify-between py-1 border-b border-b-gray">
      <span className="capitalize">{dayTitle}</span>
      <span>{isClosed ? "Stengt" : hours}</span>
    </li>
  );
};

const OpeningHours = ({ openingHours }: Props) => {
  // this skips the empty value :(
  const openingHoursArr = Object.values(openingHours);

  return (
    <div className="w-full p-5 text-center bg-black lg:p-10 text-gray">
      <h2 className="font-serif text-3xl font-bold tracking-tighter text-center md:text-4xl lg:text-5xl">
        Åpningstider
      </h2>
      <ul className="mt-5 text-lg leading-snug lg:mt-10 lg:text-xl">
        {openingHoursArr.map((hours, index) => {
          // console.log(openingHoursArr.length);
          return <Day key={`hours-${index}`} index={index} hours={hours} />;
        })}
      </ul>
    </div>
  );
};

export default OpeningHours;
