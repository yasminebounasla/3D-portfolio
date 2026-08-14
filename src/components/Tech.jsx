import React from "react";
import { TechGridCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const rows = Math.ceil(technologies.length / 6);
  return (
    <div className='w-full' style={{ height: `${rows * 130 + 60}px` }}>
      <TechGridCanvas technologies={technologies} />
    </div>
  );
};

export default SectionWrapper(Tech, "", "02 / stack");