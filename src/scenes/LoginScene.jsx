import { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../data/config";
import "./LoginScene.css";

export default function LoginScene({ nextScene }) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedBirthday = birthday.trim();

    if (!trimmedName || !trimmedBirthday) {
      setError("请填写完整信息");
      triggerShake();
      return;
    }

    if (trimmedName === CONFIG.validName && trimmedBirthday === CONFIG.validBirthday) {
      setError("");
      nextScene();
    } else {
      setError("信息有误，再想想吧~");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  return (
    <div className="scene login-scene">
      <div className="login-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${12 + Math.random() * 16}px`,
              opacity: 0.15 + Math.random() * 0.15,
            }}
          >
            ♡
          </div>
        ))}
      </div>

      <motion.div
        className={`login-card ${shaking ? "shake" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="login-icon">🎂</div>
        <h1 className="login-title">有一份惊喜等你打开</h1>
        <p className="login-subtitle">请输入验证信息</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="你的生日 (如 05-27)"
              className="login-input"
            />
          </div>

          {error && (
            <motion.p
              className="login-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <button type="submit" className="btn btn-primary login-btn">
            进入 ✨
          </button>
        </form>
      </motion.div>
    </div>
  );
}
