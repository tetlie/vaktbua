import React from "react";
import Link from "next/link";

type Props = {
  globals: Globals;
};


const Footer = ({ globals }: Props) => {
  const { contact: {email, address} } = globals;
  return (
    <footer className="pt-5 mt-5 border-t-2 lg:pt-10 lg:mt-10">
      <div className="flex leading-[0.96em] flex-wrap justify-between w-full font-serif text-3xl font-normal md:text-4xl lg:text-5xl">
        <div className="w-full lg:w-2/5">
          <p className="tracking-tighter">
          {address}
          </p>
        </div>
        <div>
          <Link href={`mailto:booking@vaktbuakrs.no`} className="tracking-tighter hover:underline">
            {email}
          </Link>
        </div>
      </div>
      <div>
        <p className="mt-5 text-lg lg:mt-10 lg:text-xl">© Vaktbua 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
