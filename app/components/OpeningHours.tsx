import React from "react";

const OpeningHours = () => {
  const liClasses = "flex justify-between py-1 border-b border-b-gray";
  return (
    <div className="w-full p-5 text-center bg-black lg:p-10 text-gray">
      <h2 className="font-serif text-3xl font-bold tracking-tighter text-center md:text-4xl lg:text-5xl">
        Åpningstider
      </h2>
      <ul className="mt-5 text-lg leading-snug lg:mt-10 lg:text-xl">
        <li className={liClasses}>
          <span>Mandag</span>
          <span>Stengt</span>
        </li>
        <li className={liClasses}>
          <span>Tirsdag</span>
          <span>16:00 – 00:00</span>
        </li>
        <li className={liClasses}>
          <span>Onsdag</span>
          <span>16:00 – 00:00</span>
        </li>
        <li className={liClasses}>
          <span>Torsdag</span>
          <span>16:00 – 00:00</span>
        </li>
        <li className={liClasses}>
          <span>Fredag</span>
          <span>16:00 – 02:30</span>
        </li>
        <li className={liClasses}>
          <span>Lørdag</span>
          <span>14:00 – 02:30</span>
        </li>
        <li className={liClasses}>
          <span>Søndag</span>
          <span>14:00 – 00:00</span>
        </li>
      </ul>
    </div>
  );
};

export default OpeningHours;
