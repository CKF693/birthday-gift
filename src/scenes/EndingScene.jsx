import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./EndingScene.css";

const FINAL_TEXT = [
  "希望你能乐观的面对一切",
  "愿你所有的愿望都能实现",
  "平安喜乐，万事如意",
  "生日快乐 🎂🎉",
];

class Firework {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = canvas.height * (0.15 + Math.random() * 0.35);
    this.speed = 3 + Math.random() * 3;
    this.particles = [];
    this.exploded = false;
    this.hue = Math.random() * 360;
    this.done = false;
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
      }
    } else {
      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= 0.008;
      });
      this.particles = this.particles.filter((p) => p.alpha > 0);
      if (this.particles.length === 0) {
        this.done = true;
      }
    }
  }

  explode() {
    this.exploded = true;
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 1 + Math.random() * 3;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        hue: this.hue + Math.random() * 30 - 15,
      });
    }
  }

  draw(ctx) {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
      ctx.fill();
    } else {
      this.particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
        ctx.fill();
      });
    }
  }
}

export default function EndingScene() {
  const canvasRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const fireworksRef = useRef([]);

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

    let frameCount = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 16, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      if (frameCount % 60 === 0 && fireworksRef.current.length < 5) {
        fireworksRef.current.push(new Firework(canvas));
      }

      fireworksRef.current.forEach((fw) => {
        fw.update();
        fw.draw(ctx);
      });
      fireworksRef.current = fireworksRef.current.filter((fw) => !fw.done);

      animId = requestAnimationFrame(animate);
    };

    for (let i = 0; i < 3; i++) {
      fireworksRef.current.push(new Firework(canvas));
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (textIndex >= FINAL_TEXT.length - 1) return;
    const timer = setTimeout(() => {
      setTextIndex((prev) => prev + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [textIndex]);

  return (
    <div className="scene ending-scene">
      <canvas ref={canvasRef} className="ending-canvas" />

      <div className="ending-content">
        {FINAL_TEXT.slice(0, textIndex + 1).map((text, index) => (
          <motion.p
            key={index}
            className="ending-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {text}
          </motion.p>
        ))}

        {textIndex >= FINAL_TEXT.length - 1 && (
          <motion.div
            className="ending-final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="ending-emoji">🎂</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
