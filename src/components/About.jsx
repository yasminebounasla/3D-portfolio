import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
// import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from '../utils/motions';

const ServiceCard = ({ index, title, icon }) => {
  return <p>{title}</p>
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
        I’m a passionate full-stack developer with solid experience in JavaScript, React, Node.js, Express, Prisma, and MongoDB. On the backend, I enjoy designing clean and scalable APIs, while on the frontend, I focus on building modern, user-friendly interfaces.
        I also have a strong foundation in C and Java, with academic projects that strengthened my problem-solving skills. In addition, I have knowledge of React Native, allowing me to explore mobile application development.
        I’m a quick learner who loves bringing ideas to life and collaborating on impactful solutions.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default About