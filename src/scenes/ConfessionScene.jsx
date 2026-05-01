import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ConfessionScene.css";

const CONFESSION_LINES = [
  "时间过得太快了，",
  "从高一认识开始应该有四年了。",
  "",
  "哎哟我也不会特别煽情的话，",
  "都在心里了都在心里了。",
  "",
  "我想告诉你——",
  "你很重要，",
  "真的很重要。",
  "",
  "不管未来会发生什么，",
  "我都想陪你走下去。",
  "",
  "生日快乐 🎂",
  "愿你永远被温柔以待 💕",
];

export default function ConfessionScene({ nextScene }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines >= CONFESSION_LINES.length) {
      setShowButton(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, CONFESSION_LINES[visibleLines] === "" ? 400 : 800);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="scene confession-scene">
      <div className="confession-bg">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="confession-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${14 + Math.random() * 20}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="confession-content">
        <AnimatePresence>
          {CONFESSION_LINES.slice(0, visibleLines).map((line, index) => (
            <motion.p
              key={index}
              className={`confession-line ${line === "" ? "empty" : ""}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>

        {showButton && (
          <motion.div
            className="confession-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="btn btn-primary" onClick={nextScene}>
              还有话想对你说 💫
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
