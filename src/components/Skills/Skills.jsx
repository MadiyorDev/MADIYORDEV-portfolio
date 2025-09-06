import React, { useState } from 'react';
import ProjectModal from '../Modal/ProjectModal';
import './Skills.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SmoothText from '../../components/SmoothText/SmoothText'; // 🔹 qo‘shildi

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 'audi',
      title: 'AUDI - RS',
      images: ['/project/image1.png', '/project/image2.png', '/project/image3.png'],
      tags: ['React', 'SCSS'],
      descriptionKey: 'projectSection.audi.description',
      liveDemo: 'https://audi-rs.vercel.app',
      github: 'https://github.com/MadiyorDev/AUDI-RS',
    },
    {
      id: 'musicflow',
      title: 'MusicFlow',
      images: ['/project/music1.png', '/project/music2.png', '/project/music3.png'],
      tags: ['React', 'SCSS', 'API', 'JSON'],
      descriptionKey: 'projectSection.musicflow.description',
      liveDemo: 'https://music-flow-sage.vercel.app',
      github: 'https://github.com/MadiyorDev/MusicFlow',
    },
    {
      id: 'shopify',
      title: 'SHOPIFY',
      images: [
        '/project/shopify1.png',
        '/project/shopify2.png',
        '/project/shopify3.png',
        '/project/shopify4.png'
      ],
      tags: ['React', 'CSS', 'FIGMA'],
      descriptionKey: 'projectSection.shopify.description',
      liveDemo: 'https://shopify-nine-lac.vercel.app/',
      github: 'https://github.com/MadiyorDev/ShOPIFY',
    },
    {
      id: 'lavash',
      title: 'OqTepa Lavash',
      images: ['/project/lavash1.png', '/project/lavash2.png', '/project/lavash3.png'],
      tags: ['HTML', 'CSS', 'JavaScript'],
      descriptionKey: 'projectSection.lavash.description',
      liveDemo: 'https://oq-tepa-lavash.vercel.app',
      github: 'https://github.com/MadiyorDev/Oq-Tepa-Lavash',
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="skills" ref={ref}>
      <motion.div
        className="skills__container"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="skills__title">
          <SmoothText textKey="projectSection.title" />
        </h2>

        <div className="skills__cards">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="skills__card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            >
              <div className="skills__card-image">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                >
                  {project.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt={`${project.title} ${i + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <h3 className="skills__card-title">{project.title}</h3>

              <p className="skills__card-description">
                <SmoothText textKey={project.descriptionKey} />
              </p>

              <div className="skills__card-header">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="skills__tag">{tag}</span>
                ))}
              </div>

              <div className="skills__card-buttons">
                <a
                  href={project.liveDemo}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SmoothText textKey="projectSection.liveDemo" />
                </a>
                <a
                  href={project.github}
                  className="btn btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SmoothText textKey="projectSection.github" />
                </a>
                <button
                  className="btn btn--primary"
                  onClick={() => openModal(project)}
                >
                  <SmoothText textKey="projectSection.details" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Skills;
