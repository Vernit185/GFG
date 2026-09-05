import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Antigravity from './components/Antigravity';
import SplashScreen from './components/SplashScreen';

// Route code-splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid rgba(0, 137, 95, 0.15)',
        borderTopColor: 'var(--primary-green, #00895f)',
        borderRadius: '50%',
        animation: 'routeSpin 0.7s linear infinite'
      }} />
      <style>{`@keyframes routeSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

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
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none', opacity: isMobile ? 0.3 : 0.6 }}>
        <Antigravity
          count={isMobile ? 450 : 1200}
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {import.meta.env.DEV && <Agentation />}
      </div>
    </Router>
  );
}
