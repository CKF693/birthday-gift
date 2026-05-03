import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPoster(false);
    }
  };

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
        {showPoster ? (
          <motion.div
            className="video-poster"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handlePlay}
          >
            <div className="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="video-hint">点击播放视频</p>
          </motion.div>
        ) : (
          <video
            ref={videoRef}
            className="video-fullscreen"
            onEnded={handleVideoEnd}
            playsInline
            controls
          >
            <source src={CONFIG.videoSrc} type="video/mp4" />
          </video>
        )}
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