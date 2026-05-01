import { useRef, useCallback } from "react";
import { Howl } from "howler";

export default function useAudio(src) {
  const soundRef = useRef(null);
  const playingRef = useRef(false);

  const getSound = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [src],
        loop: true,
        volume: 0.5,
      });
    }
    return soundRef.current;
  }, [src]);

  const play = useCallback(() => {
    const sound = getSound();
    if (!playingRef.current) {
      sound.play();
      playingRef.current = true;
    }
  }, [getSound]);

  const pause = useCallback(() => {
    const sound = getSound();
    if (playingRef.current) {
      sound.pause();
      playingRef.current = false;
    }
  }, [getSound]);

  const toggle = useCallback(() => {
    if (playingRef.current) {
      pause();
    } else {
      play();
    }
  }, [play, pause]);

  return { play, pause, toggle, isPlaying: playingRef };
}
