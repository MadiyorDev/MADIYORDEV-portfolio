import React from 'react';
import './Hero.scss';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const { t } = useTranslation();

  // Element scrollga chiqqanini aniqlash
  const { ref, inView } = useInView({
    triggerOnce: true, // faqat bir marta trigger bo'lishi uchun
    threshold: 0.2,     // 20% ko‘rinishda bo‘lsa yetarli
  });

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div
        className="hero__container"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="hero__title">
          <Trans i18nKey="hero.titleLine1" components={{ 1: <span /> }} />
          <br />
          {t('hero.titleLine2')}
        </h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a href="/projects" className="btn btn-primary">
            {t('hero.viewProjects')}
          </a>
          <a href="/contact" className="btn btn-outline">
            {t('hero.contactMe')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
