import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-5 mt-5 border-t-2 lg:pt-10 lg:mt-10">
      <div className="flex leading-[0.96em] flex-wrap justify-between w-full font-serif text-3xl font-normal md:text-4xl lg:text-5xl">
        <p className="tracking-tighter">
          Odderøyveien 11, Bygg 3,
          <br /> 4610 Kristiansand
        </p>

        <Link href={`mailto:booking@vaktbuakrs.no`} className="tracking-tighter hover:underline">
          booking@vaktbuakrs.no
        </Link>
      </div>
      <p className="mt-5 text-lg lg:mt-10 lg:text-xl">© Vaktbua 2023</p>
    </footer>
  );
};

export default Footer;
