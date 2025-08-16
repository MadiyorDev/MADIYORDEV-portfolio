import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import AboutMe from './pages/AboutMe/AboutMe';
import Projects from './pages/Projects/Projects';
import ContactMe from './pages/ContactMe/ContactMe';
import Loader from './components/Loader/Loader';
import Admin from './pages/Admin/Admin';

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // 0.8s delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <Loader loading={loading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="*" element={<Home />} />
        <Route path="/portfolio_admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
