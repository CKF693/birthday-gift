import { useRef, useEffect } from "react";
import "./VideoBackground.css";

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="video-background">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-colorful-flowers-in-nature-4278-large.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
}