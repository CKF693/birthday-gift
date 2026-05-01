import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { photos } from "../data/photos";
import "./MemoryScene.css";

const LAYOUT_CONFIG = photos.map((_, i) => {
  const colSpan = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1][i % 12];
  const rowSpan = colSpan === 2 ? 2 : 1;
  return { colSpan, rowSpan };
});

const ANIM_VARIANTS = [
  { initial: { opacity: 0, scale: 0.3, rotate: -15 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
  { initial: { opacity: 0, y: 60, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, x: -60, scale: 0.8 }, animate: { opacity: 1, x: 0, scale: 1 } },
  { initial: { opacity: 0, x: 60, scale: 0.8 }, animate: { opacity: 1, x: 0, scale: 1 } },
  { initial: { opacity: 0, scale: 1.5, rotate: 10 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
  { initial: { opacity: 0, y: -60, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 } },
];

export default function MemoryScene({ nextScene }) {
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, photos.length * 30 + 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let scrollPos = 0;
    let autoScroll;
    let started = false;

    const startAutoScroll = () => {
      if (started) return;
      started = true;
      autoScroll = setInterval(() => {
        scrollPos += 0.8;
        el.scrollTop = scrollPos;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
          clearInterval(autoScroll);
        }
      }, 16);
    };

    const timeout = setTimeout(startAutoScroll, 2000);

    const handleUserScroll = () => {
      scrollPos = el.scrollTop;
      clearInterval(autoScroll);
      started = false;
    };

    const handleScrollStop = () => {
      clearTimeout(timeout);
      if (!started && el.scrollTop + el.clientHeight < el.scrollHeight - 100) {
        setTimeout(startAutoScroll, 3000);
      }
    };

    let scrollStopTimer;
    const onScroll = () => {
      handleUserScroll();
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(handleScrollStop, 500);
    };

    el.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timeout);
      clearTimeout(scrollStopTimer);
      clearInterval(autoScroll);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="scene memory-scene" ref={containerRef}>
      <div className="memory-bg-glow" />

      <motion.div
        className="memory-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>每一张照片都是回忆 ✨</h2>
        <p className="memory-subtitle">90个瞬间，90次心动</p>
      </motion.div>

      <div className="memory-grid">
        {photos.map((photo, index) => {
          const variant = ANIM_VARIANTS[index % ANIM_VARIANTS.length];
          const config = LAYOUT_CONFIG[index];
          return (
            <motion.div
              key={photo.id}
              className={`memory-cell span-${config.colSpan}`}
              initial={variant.initial}
              whileInView={variant.animate}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.6,
                delay: (index % 6) * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="memory-photo-wrapper">
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="memory-photo"
                />
                <div className="memory-photo-shine" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="memory-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <button className="btn btn-primary memory-btn" onClick={nextScene}>
          继续 →
        </button>
      </motion.div>
    </div>
  );
}
