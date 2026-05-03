import { useState, useCallback } from "react";

const SCENES = [
  "login",
  "welcome",
  "memory",
  "confession",
  "exam",
  "video",
  "ending",
];

export default function useScene() {
  const [scene, setScene] = useState("login");

  const nextScene = useCallback(() => {
    setScene((prev) => {
      const index = SCENES.indexOf(prev);
      if (index < SCENES.length - 1) {
        return SCENES[index + 1];
      }
      return prev;
    });
  }, []);

  const goToScene = useCallback((target) => {
    if (SCENES.includes(target)) {
      setScene(target);
    }
  }, []);

  return { scene, nextScene, goToScene, scenes: SCENES };
}
