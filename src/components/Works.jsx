import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, categories } from "../constants";
import { fadeIn, textVariant } from "../utils/motions";

const categoryStyle = {
  ai: { label: "AI / ML", text: "text-accent", dot: "bg-accent", ring: "ring-accent/40" },
  web: { label: "Full-Stack", text: "text-pink-300", dot: "bg-pink-300", ring: "ring-pink-300/40" },
  mobile: { label: "Mobile", text: "text-orange-300", dot: "bg-orange-300", ring: "ring-orange-300/40" },
};

// Carte compacte : image + nom + tags visibles en permanence.
// La description apparaît en survol, façon "rapport de scan" qui glisse
// depuis le bas de l'image — garde la grille propre même avec beaucoup
// de projets, au lieu d'une grande carte fixe par projet.
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  categories: projectCategories,
}) => {
  const cats = (projectCategories || ["web"]).map((c) => categoryStyle[c] || categoryStyle.web);
  const visibleTags = tags.slice(0, 3);
  const extraCount = tags.length - visibleTags.length;

  return (
    <motion.div
      variants={fadeIn("up", "spring", (index % 6) * 0.15, 0.75)}
      initial="hidden"
      animate="show"
    >
      <Tilt
        options={{ max: 20, scale: 1.02, speed: 350 }}
        className='detect-card group relative bg-black-100/60 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col'
      >
        <span className="detect-frame detect-frame-tl" />
        <span className="detect-frame detect-frame-tr" />
        <span className="detect-frame detect-frame-bl" />
        <span className="detect-frame detect-frame-br" />

        <div className='relative w-full aspect-[16/10] overflow-hidden'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover'
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[75%]">
            {cats.map((cat, i) => (
              <span key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/70 backdrop-blur-sm ring-1 ${cat.ring}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                <span className={`font-mono text-[10px] tracking-wider uppercase ${cat.text}`}>
                  {cat.label}
                </span>
              </span>
            ))}
          </div>

          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className='absolute top-3 right-3 black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer'
          >
            <img src={github} alt='source code' className='w-1/2 h-1/2 object-contain' />
          </div>

          {/* HUD de détails, révélé au survol */}
          <div className='absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-primary via-primary/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <p className='font-mono text-accent text-[10px] tracking-wider mb-1'>
              [ scan_result ]
            </p>
            <p className='text-secondary text-[13px] leading-[19px] line-clamp-4'>
              {description}
            </p>
          </div>
        </div>

        <div className='p-4 flex flex-col gap-2 flex-1'>
          <h3 className='text-white font-bold text-[17px] truncate'>{name}</h3>
          <div className='flex flex-wrap gap-x-2 gap-y-1 mt-auto'>
            {visibleTags.map((tag) => (
              <p key={`${name}-${tag.name}`} className={`text-[12px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
            {extraCount > 0 && (
              <p className='text-[12px] text-secondary'>+{extraCount}</p>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          A mix of full-stack applications and computer vision / machine
          learning projects. Filter by category, hover a card for details.
        </motion.p>
      </div>

      <div className='flex flex-wrap gap-3 mt-8'>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-[13px] font-mono tracking-wide transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-accent text-primary font-medium"
                : "bg-tertiary text-secondary hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className='relative mt-10 pt-2'>
        <span className="detect-frame-static tl" />
        <span className="detect-frame-static tr" />
        <span className="detect-frame-static bl" />
        <span className="detect-frame-static br" />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.name} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SectionWrapper(Works, "work", "03 / work");