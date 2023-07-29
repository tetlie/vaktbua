import React from "react";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-5 lg:my-10">
      <h1 className="font-serif font-bold tracking-tighter text-center text-black text-7xl md:text-8xl lg:text-9xl">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
