import { useRef } from "react";
import { CONFIG } from "../data/config";
import "./VideoScene.css";

export default function VideoScene({ nextScene }) {
  const videoRef = useRef(null);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    nextScene();
  };

  return (
    <div className="scene video-scene">
      <video
        ref={videoRef}
        className="video-fullscreen"
        controls
        playsInline
        autoPlay
        onEnded={nextScene}
        src={CONFIG.videoSrc}
      />
      <button className="skip-button" onClick={handleSkip}>
        跳过 →
      </button>
    </div>
  );
}