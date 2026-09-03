import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Antigravity from './components/Antigravity';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Contact from './pages/Contact';
// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <SplashScreen />
      <ScrollToTop />

      {/* Global Antigravity Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', opacity: isMobile ? 0.3 : 0.6 }}>
        <Antigravity
          count={isMobile ? 1000 : 2500}
          magnetRadius={8}
          ringRadius={8}
          waveSpeed={0.05}
          waveAmplitude={isMobile ? 0.4 : 0.5}
          particleSize={isMobile ? 0.35 : 0.35}
          lerpSpeed={0.01}
          color="#00895f"
          autoAnimate={true}
          particleVariance={0.5}
          particleShape="sphere"
        />
      </div>

      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        {import.meta.env.DEV && <Agentation />}
      </div>
    </Router>
  );
}
