import useScene from "./hooks/useScene";
import LoginScene from "./scenes/LoginScene";
import WelcomeScene from "./scenes/WelcomeScene";
import MemoryScene from "./scenes/MemoryScene";
import ConfessionScene from "./scenes/ConfessionScene";
import ExamScene from "./scenes/ExamScene";
import EndingScene from "./scenes/EndingScene";
import MusicPlayer from "./components/MusicPlayer";
import VideoBackground from "./components/VideoBackground";
import "./App.css";

const SCENE_MAP = {
  login: LoginScene,
  welcome: WelcomeScene,
  memory: MemoryScene,
  confession: ConfessionScene,
  exam: ExamScene,
  ending: EndingScene,
};

function App() {
  const { scene, nextScene } = useScene();
  const CurrentScene = SCENE_MAP[scene];

  return (
    <div className="app">
      <VideoBackground />
      <CurrentScene nextScene={nextScene} />
      {scene !== "login" && <MusicPlayer />}
    </div>
  );
}

export default App;
