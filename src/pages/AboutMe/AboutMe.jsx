import React from 'react';
import './AboutMe.scss';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { SiSass } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../components/Header/Header';
import SmoothText from '../../components/SmoothText/SmoothText'; // 🔹 qo‘shildi

const AboutMe = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <main className="about-page" ref={ref}>
      <Header />
      <motion.section
        className="about"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about__container"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="about__image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img src="/person/image.jpg" alt="profile" className="about__icon" />
          </motion.div>

          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2>
              <SmoothText textKey="aboutSection.title" />
            </h2>
            <p>
              <SmoothText textKey="aboutSection.description" />
            </p>

            <div className="about__skills">
              <h3>
                <SmoothText textKey="aboutSection.skillsTitle" />
              </h3>
              <motion.div
                className="about__icons"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  { icon: <FaHtml5 color="#e34c26" />, key: 'aboutSection.skills.html' },
                  { icon: <FaCss3Alt color="#264de4" />, key: 'aboutSection.skills.css' },
                  { icon: <FaJs color="#f0db4f" />, key: 'aboutSection.skills.js' },
                  { icon: <SiSass color="#cc6699" />, key: 'aboutSection.skills.scss' },
                  { icon: <FaReact color="#61DBFB" />, key: 'aboutSection.skills.react' },
                ].map((skill, index) => (
                  <motion.div
                    className="skill-icon"
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    {skill.icon}
                    <span>
                      <SmoothText textKey={skill.key} />
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default AboutMe;
