import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";


const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28 relative group' key={technology.name}>
          <BallCanvas icon={technology.icon} />
          <span className='absolute left-1/2 -translate-x-1/2 -bottom-1 px-2.5 py-1 rounded-md bg-primary/90 backdrop-blur-sm border border-white/10 text-white text-[12px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
            {technology.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "", "02 / stack");