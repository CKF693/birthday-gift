import { useRef } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);

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
          controls
          autoPlay
          onEnded={handleVideoEnd}
          src={CONFIG.videoSrc}
        >
          您的浏览器不支持视频播放
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