import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motions';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt
      options={{ max: 25, scale: 1.02, speed: 400 }}
      className='detect-card relative xs:w-[240px] w-full bg-black-100/60 backdrop-blur-sm border border-white/10 rounded-2xl py-8 px-8 min-h-[240px] flex justify-evenly items-center flex-col'
    >
      <span className="detect-frame detect-frame-tl" />
      <span className="detect-frame detect-frame-tr" />
      <span className="detect-frame detect-frame-bl" />
      <span className="detect-frame detect-frame-br" />

      <div className='w-16 h-16 rounded-full bg-tertiary ring-1 ring-accent/40 flex items-center justify-center'>
        <img
          src={icon}
          alt='service-icon'
          className='w-8 h-8 object-contain'
        />
      </div>

      <h3 className='text-white text-[18px] font-bold text-center font-mono'>
        {title}
      </h3>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Full-stack developer (Licence in Software Engineering and Information Systems, USTHB), building complete applications across web and mobile — from React and React Native interfaces to Node.js / Express APIs.
        I'm currently pursuing a Master's in AI and Computer Vision at USTHB, and expanding my work in that direction alongside full-stack development.
      </motion.p>

      <div className='mt-16 flex flex-wrap gap-8 justify-center'>
        {services.map((service, index) => (
          <motion.div key={service.title} variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
            <ServiceCard index={index} {...service} />
          </motion.div>
        ))}
      </div>

    </>
  )
}

export default SectionWrapper(About, "about", "01 / profile");