import { useEffect, useRef, useState } from "react";

// Curseur "viseur de détection" — remplace le curseur par défaut sur les
// écrans avec souris (desktop). Sur mobile/tablette, ce composant ne fait
// rien : le curseur natif reste actif.
const Reticle = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 11}px, ${
          e.clientY - 11
        }px)`;
      }
      if (!visible) setVisible(true);
    };

    const isInteractive = (el) =>
      el.closest("a, button, [role='button'], input, textarea, .cursor-pointer");

    const over = (e) => setActive(!!isInteractive(e.target));
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reticle ${visible ? "opacity-100" : "opacity-0"} ${
        active ? "reticle-active" : ""
      }`}
      aria-hidden="true"
    >
      <span className="reticle-tick reticle-tick-t" />
      <span className="reticle-tick reticle-tick-b" />
      <span className="reticle-tick reticle-tick-l" />
      <span className="reticle-tick reticle-tick-r" />
    </div>
  );
};

export default Reticle;