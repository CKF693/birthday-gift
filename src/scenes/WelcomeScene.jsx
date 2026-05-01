import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../components/Typewriter";
import "./WelcomeScene.css";

const WELCOME_TEXT = "嗨，终于等到你了...";
const SUB_TEXT = "今天，是属于你的日子";
const BODY_TEXT = "我想用一种特别的方式，把想对你说的话都告诉你";

export default function WelcomeScene({ nextScene }) {
  const [phase, setPhase] = useState(0);

  return (
    <div className="scene welcome-scene">
      <div className="welcome-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      <div className="welcome-content">
        <motion.div
          className="welcome-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="welcome-title">
            <Typewriter
              text={WELCOME_TEXT}
              speed={100}
              onComplete={() => setPhase(1)}
            />
          </h1>

          {phase >= 1 && (
            <motion.p
              className="welcome-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typewriter
                text={SUB_TEXT}
                speed={80}
                onComplete={() => setPhase(2)}
              />
            </motion.p>
          )}

          {phase >= 2 && (
            <motion.p
              className="welcome-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typewriter
                text={BODY_TEXT}
                speed={60}
                onComplete={() => setPhase(3)}
              />
            </motion.p>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button className="btn btn-primary" onClick={nextScene}>
                开始旅程 💫
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
