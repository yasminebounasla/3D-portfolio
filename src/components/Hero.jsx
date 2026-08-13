import { useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { VisionCoreCanvas } from "./canvas";

const Hero = () => {
  const dragRotation = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const start = (x) => {
    dragging.current = true;
    lastX.current = x;
  };
  const move = (x) => {
    if (!dragging.current) return;
    dragRotation.current += (x - lastX.current) * 0.006;
    lastX.current = x;
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className="scan-line" />

      {/* zone 3D : capte vraiment la souris/le doigt (mousedown/move/up
          natifs), aucune dépendance à un composant tiers pour la rotation */}
      <div
        className="absolute inset-0 z-0 opacity-80 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => start(e.clientX)}
        onMouseMove={(e) => move(e.clientX)}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={(e) => start(e.touches[0].clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        onTouchEnd={stop}
      >
        <VisionCoreCanvas dragRotation={dragRotation} />
      </div>

      {/* le texte reste au-dessus visuellement mais laisse passer la
          souris (pointer-events-none) vers la zone 3D en dessous */}
      <div className={`${styles.paddingX} absolute inset-0 z-10 max-w-7xl mx-auto flex items-center pointer-events-none`}>
        <div className="flex flex-row items-start gap-5">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-accent" />
            <div className='w-1 sm:h-80 h-40 violet-gradient' />
          </div>

          <div className="max-w-xl bg-primary/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className='font-mono text-accent text-[13px] tracking-widest mb-2'>
              [ profile_detected ]
            </p>
            <h1 className={`${styles.heroHeadText} text-white`}>
              I'm <span className="text-accent">Yasmine</span>
            </h1>
            <p className={`${styles.heroSubText} text-white-100 mt-2`}>
              Full-stack developer <span className="text-accent">&</span> AI enthusiast, specializing in Computer Vision.
              I build complete web applications and explore how machines learn to see.
            </p>
          </div>
        </div>
      </div>

      <div className='absolute z-10 xs:bottom-2 bottom-4 w-full flex justify-center items-center pointer-events-none'>
        <a href='#about' className="pointer-events-auto">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero