import React from "react";
import Link from "next/link";
import ClientSideRoute from "./ClientSideRoute";

const Header = () => {
  return (
    <header>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="font-serif text-3xl font-normal tracking-tighter text-center md:text-4xl lg:text-5xl">
          I dag (lørdag) er Vaktbua åpent 14:00 – 02:30
        </p>
        <ClientSideRoute route={`/`}>
          <h1 className="mt-5 font-serif font-bold tracking-tighter text-black lg:mt-10 text-7xl md:text-8xl lg:text-9xl">
            Vaktbua
          </h1>
        </ClientSideRoute>
      </div>
    </header>
  );
};

export default Header;
