import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);
  const [showPoster, setShowPoster] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video play error:", err);
        setVideoError(true);
      });
      setShowPoster(false);
    }
  };

  const handleVideoEnd = () => {
    nextScene();
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video load error");
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
            {videoError ? (
              <>
                <div className="error-icon">⚠️</div>
                <p className="video-hint">视频加载失败</p>
                <p className="video-error-hint">请检查网络后重试</p>
              </>
            ) : (
              <>
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="video-hint">点击播放视频</p>
              </>
            )}
          </motion.div>
        ) : (
          <video
            ref={videoRef}
            className="video-fullscreen"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
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