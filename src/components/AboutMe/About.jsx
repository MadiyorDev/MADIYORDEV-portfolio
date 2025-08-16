import React from 'react';
import './About.scss';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { SiSass } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useTranslation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="about" ref={ref}>
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
          <h2>{t('aboutSection.title')}</h2>
          <p>{t('aboutSection.description')}</p>

          <div className="about__skills">
            <h3>{t('aboutSection.skillsTitle')}</h3>
            <motion.div
              className="about__icons"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { icon: <FaHtml5 color="#e34c26" />, label: t('aboutSection.skills.html') },
                { icon: <FaCss3Alt color="#264de4" />, label: t('aboutSection.skills.css') },
                { icon: <FaJs color="#f0db4f" />, label: t('aboutSection.skills.js') },
                { icon: <SiSass color="#cc6699" />, label: t('aboutSection.skills.scss') },
                { icon: <FaReact color="#61DBFB" />, label: t('aboutSection.skills.react') },
              ].map((skill, index) => (
                <motion.div
                  className="skill-icon"
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  {skill.icon}
                  <span>{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
