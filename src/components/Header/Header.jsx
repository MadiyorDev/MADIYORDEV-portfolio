import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Header.scss';

// 🔹 qo‘shildi
import SmoothText from '../../components/SmoothText/SmoothText';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [opacity, setOpacity] = useState(1);
  const [timer, setTimer] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const currentLang = i18n.language.toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 🕒 Auto-hide opacity effect
  useEffect(() => {
    const headerEl = document.querySelector('.header');

    const resetOpacity = () => {
      setOpacity(1);
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        setOpacity(0.4);
      }, 4000);
      setTimer(newTimer);
    };

    const events = ['mousemove', 'click', 'touchstart'];
    events.forEach((event) => {
      headerEl.addEventListener(event, resetOpacity);
    });

    resetOpacity(); // Start timer initially

    return () => {
      events.forEach((event) => {
        headerEl.removeEventListener(event, resetOpacity);
      });
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <motion.header
      className={`header ${isSticky ? 'sticky' : ''}`}
      animate={{ opacity }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header__container">
        <div className="header__logo">MADIYOR DEV</div>

        <div className="header__burger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header__menu">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>
                <SmoothText textKey="home" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>
                <SmoothText textKey="about" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>
                <SmoothText textKey="projects" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={toggleMenu}>
                <SmoothText textKey="contact" />
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__tools">
          <div className="header__lang">
            <button
              className={currentLang === 'EN' ? 'active' : ''}
              onClick={() => changeLanguage('EN')}
            >
              <SmoothText textKey="EN" />
            </button>
            <button
              className={currentLang === 'UZ' ? 'active' : ''}
              onClick={() => changeLanguage('UZ')}
            >
              <SmoothText textKey="UZ" />
            </button>
            <button
              className={currentLang === 'RU' ? 'active' : ''}
              onClick={() => changeLanguage('RU')}
            >
              <SmoothText textKey="RU" />
            </button>
          </div>
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
