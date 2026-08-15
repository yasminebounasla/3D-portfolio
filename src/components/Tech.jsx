import React from "react";
import { TechGridCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='w-full mt-8'>
      <TechGridCanvas technologies={technologies} />
    </div>
  );
};

export default SectionWrapper(Tech, "", "02 / stack");