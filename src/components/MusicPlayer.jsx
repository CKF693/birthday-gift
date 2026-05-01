import { useState, useEffect } from "react";
import useAudio from "../hooks/useAudio";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const { toggle, isPlaying } = useAudio("/music/bg.mp3");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(isPlaying.current);
  }, []);

  const handleToggle = () => {
    toggle();
    setPlaying(isPlaying.current);
  };

  return (
    <button
      className={`music-player ${playing ? "playing" : ""}`}
      onClick={handleToggle}
      title={playing ? "暂停音乐" : "播放音乐"}
    >
      <span className="music-icon">
        {playing ? "🎵" : "🔇"}
      </span>
      <span className="music-bars">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    </button>
  );
}
