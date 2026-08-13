import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-30`}>
      <div
        className={`w-full flex justify-between items-center max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 ${
          scrolled
            ? "bg-primary/70 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30"
            : "bg-transparent border border-transparent"
        }`}
      >
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[17px] font-bold cursor-pointer flex '>
            Yasmine &nbsp;
            <span className='sm:block hidden text-secondary font-medium'>| Full-Stack & Vision</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-2'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative px-4 py-2 text-[15px] font-medium cursor-pointer transition-colors ${
                active === nav.title ? "text-white" : "text-secondary hover:text-white"
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {active === nav.title && (
                <span className='absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-accent' />
              )}
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[24px] h-[24px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-primary/90 backdrop-blur-md border border-white/10 absolute top-16 right-4 mx-4 my-2 min-w-[160px] z-10 rounded-2xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;