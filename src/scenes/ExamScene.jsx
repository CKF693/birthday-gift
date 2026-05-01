import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ExamScene.css";

const WISHES = [
  "你一定可以的！",
  "我相信你，我会一直陪着你的",
  "相信自己，你只要认真去做了一定就有回报",
  "我相信，结果肯定比希望的还要好",
  "加油，加油，发挥自己全部实力吧",
  "金榜题名",
  "这一年我一直都陪着你的",
  "我看到了你的成长",
  "我觉得只要你保持一个好的心态",
  "考一个我们约定的520完全没问题",
  "哎呀这些我都不多说了，总之我相信你",
  "害，感觉唠叨的跟个老父亲一样",
  "我会一直等着你的，你也要记到我",
  "love 比心",
  "前路漫漫亦灿灿",
];

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    wishIndex: i % WISHES.length,
  }));
}

export default function ExamScene({ nextScene }) {
  const [stars] = useState(() => generateStars(50));
  const [activeWish, setActiveWish] = useState(null);
  const [wishesCollected, setWishesCollected] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() < 0.02) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: 80 + Math.random() * 60,
          speed: 4 + Math.random() * 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      createShootingStar();

      shootingStars.forEach((star, i) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.008;

        if (star.opacity <= 0) {
          shootingStars.splice(i, 1);
          return;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleStarClick = (star) => {
    setActiveWish(WISHES[star.wishIndex]);
    setWishesCollected((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setTimeout(() => nextScene(), 2000);
      }
      return next;
    });
    setTimeout(() => setActiveWish(null), 2000);
  };

  return (
    <div className="scene exam-scene">
      <canvas ref={canvasRef} className="exam-canvas" />

      <div className="exam-stars">
        {stars.map((star) => (
          <button
            key={star.id}
            className="exam-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>

      <motion.div
        className="exam-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>为你摘下星星 ⭐</h2>
        <p className="exam-hint">点击星星，收获祝福</p>
        <p className="exam-count">已收集 {wishesCollected}/5 个祝福</p>
      </motion.div>

      <AnimatePresence>
        {activeWish && (
          <motion.div
            className="exam-wish"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p>{activeWish}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
