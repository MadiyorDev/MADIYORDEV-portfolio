import React, { useEffect, useRef } from 'react';
import './ProjectModal.scss';
import { FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  const isMobile = window.innerWidth < 768;

  const projectId = project?.id || '';
  const translatedTitle = t(`projectSection.${projectId}.title`, project.title || '');
  const translatedDetails = t(`projectSection.${projectId}.details`, project.details || '');

  const translatedTags = project?.tags?.length
    ? project.tags.map((tag) => t(`projectSection.${projectId}.tags.${tag}`, tag))
    : [];

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / 80);
      const rotateY = x / 80;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px #0044ff`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <h2>{translatedTitle}</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {project.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`${translatedTitle} ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <p>{translatedDetails}</p>

        {translatedTags.length > 0 && (
          <div className="modal-tags">
            {translatedTags.map((tag, idx) => (
              <span key={idx} className="skills__tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="modal-links">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              {t('projectSection.liveDemo')}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              {t('projectSection.github')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
