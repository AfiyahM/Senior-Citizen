import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import GetMastered from './pages/GetMastered';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile'
import GettingStarted from './pages/GettingStarted';
import ConnectingWithFamily from './pages/ConnectingWithFamily';
import HealthWellnessApps from './pages/HealthWellnessApps';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/get-mastered" element={<GetMastered />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/video-player/:videoId" element={<VideoPlayer />} />
        <Route path="/connecting-with-family" element={<ConnectingWithFamily />} />
        <Route path="/health-wellness-apps" element={<HealthWellnessApps />} />
        <Route path="/video-Player" element={<VideoPlayer/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
