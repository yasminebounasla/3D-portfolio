import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { ScanGlobeCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motions";


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "error" | null

  // drag natif pour le globe, même logique que le Hero
  const dragRotation = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const startDrag = (x) => { dragging.current = true; lastX.current = x; };
  const moveDrag = (x) => {
    if (!dragging.current) return;
    dragRotation.current += (x - lastX.current) * 0.006;
    lastX.current = x;
  };
  const stopDrag = () => { dragging.current = false; };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      setStatus("error");
      console.error(
        "EmailJS n'est pas configuré : ajoute VITE_APP_EMAILJS_SERVICE_ID, " +
        "VITE_APP_EMAILJS_TEMPLATE_ID et VITE_APP_EMAILJS_PUBLIC_KEY dans un fichier .env à la racine du projet."
      );
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          name: form.name
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          setStatus("ok");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error(error);
        }
      );
  };

  return (
    <div
      className={`mt-6 flex xl:flex-row flex-col-reverse gap-8 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100/60 backdrop-blur-sm border border-white/10 p-6 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className='text-white font-black text-[32px] sm:text-[40px]'>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-6 flex flex-col gap-5'
        >
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-2'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px]'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-2'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px]'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-2'>Your Message</span>
            <textarea
              rows={4}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[15px]'
              required
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-60'
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {status === "ok" && (
            <p className='text-accent text-[14px] font-mono'>Message sent — thank you !</p>
          )}
          {status === "error" && (
            <p className='text-pink-300 text-[14px] font-mono'>
              Something went wrong. Check the EmailJS setup (console for details).
            </p>
          )}
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[350px] h-[250px] cursor-grab active:cursor-grabbing'
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={stopDrag}
      >
        <ScanGlobeCanvas dragRotation={dragRotation} />
      </motion.div>
    </div>
  );
};


export default SectionWrapper(Contact, "contact", "04 / contact");