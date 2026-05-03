import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const handleVideoEnd = () => {
    nextScene();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    nextScene();
  };

  return (
    <div className="scene video-scene">
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <video
          ref={videoRef}
          className="video-fullscreen"
          onEnded={handleVideoEnd}
          playsInline
          autoPlay
          muted
          controls
        >
          <source src={CONFIG.videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      <motion.button
        className="skip-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleSkip}
      >
        跳过 →
      </motion.button>
    </div>
  );
}