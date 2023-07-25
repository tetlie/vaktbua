import React from "react";
import Link from "next/link";
import ClientSideRoute from "./ClientSideRoute";

const Header = () => {
  return (
    <header>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="font-serif text-5xl font-normal tracking-tighter text-center">
          I dag (lørdag) er Vaktbua åpent 14:00 – 02:30
        </p>
        <ClientSideRoute route={`/`}>
          <h1 className="mt-10 font-serif font-bold tracking-tighter text-black text-9xl">
            Vaktbua
          </h1>
        </ClientSideRoute>
      </div>
    </header>
  );
};

export default Header;
