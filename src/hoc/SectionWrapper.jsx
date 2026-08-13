import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motions";

// idName: id de l'ancre (#about, #work...)
// tag: petit label mono affiché au-dessus de la section, ex "01 / profile"
const StarWrapper = (Component, idName, tag) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        {tag && (
          <p className='font-mono text-accent text-[13px] tracking-widest mb-2'>
            [ {tag} ]
          </p>
        )}

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;