import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/AboutMe/About';
import Skills from '../../components/Skills/Skills';
import Contact from '../../components/Contact/Contact';
// Keyinchalik: About, Skills, Contact, Footer

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Contact />
      {/* Keyinchalik boshqa qismlar */}
    </>
  );
};

export default Home;
