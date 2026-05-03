import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoEnd = () => {
    nextScene();
  };

  const handleCanPlay = () => {
    setLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
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
        {!loaded && (
          <div style={{ color: "white", fontSize: "18px", textAlign: "center" }}>
            <p>视频加载中...</p>
          </div>
        )}
        <video
          ref={videoRef}
          className="video-fullscreen"
          controls
          playsInline
          onEnded={handleVideoEnd}
          onCanPlay={handleCanPlay}
          src={CONFIG.videoSrc}
          style={{ display: loaded ? "block" : "none" }}
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