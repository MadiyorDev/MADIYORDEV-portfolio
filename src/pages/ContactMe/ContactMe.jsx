import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaInstagram, FaGithub, FaTelegram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactMe.scss';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../components/Header/Header';

const ContactMe = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const BOT_TOKEN = 'YOUR_BOT_TOKEN';
  const CHAT_ID = 'YOUR_CHAT_ID';

  const sendMessageToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
    } catch (error) {
      console.error('Telegram error:', error);
      toast.error(t('contactSection.errorMessage') || '❌ Failed to send message!');
    }
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(t('contactSection.formErrors.name')),
      email: Yup.string()
        .email(t('contactSection.formErrors.emailInvalid'))
        .required(t('contactSection.formErrors.email')),
      message: Yup.string().required(t('contactSection.formErrors.message')),
    }),
    onSubmit: async (values, { resetForm }) => {
      const telegramMessage = `
<b>New Contact Form Message</b>
👤 <b>Name:</b> ${values.name}
📧 <b>Email:</b> ${values.email}
💬 <b>Message:</b> ${values.message}
      `;
      await sendMessageToTelegram(telegramMessage);
      toast.success(t('contactSection.successMessage') || '✅ Message sent successfully!');
      resetForm();
    },
  });

  return (
    <section className="contact-me" ref={ref}>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="contact-me__container"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        key={i18n.language} // 🔑 Til o'zgarganda smooth animatsiya
      >
        <div className="contact-me__left">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            key={i18n.language}
          >
            {t('contactSection.title')}
          </motion.h2>

          <form onSubmit={formik.handleSubmit}>
            <motion.input
              type="text"
              name="name"
              placeholder={t('contactSection.form.name')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              key={`name-${i18n.language}`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}

            <motion.input
              type="email"
              name="email"
              placeholder={t('contactSection.form.email')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              key={`email-${i18n.language}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <motion.textarea
              name="message"
              placeholder={t('contactSection.form.message')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              key={`message-${i18n.language}`}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="error">{formik.errors.message}</div>
            )}

            <motion.button
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              key={`submit-${i18n.language}`}
            >
              {t('contactSection.form.submit')}
            </motion.button>
          </form>
        </div>

        <div className="contact-me__right">
          <h2>{t('contactSection.socialTitle')}</h2>
          <motion.p
            key={`address-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t('contactSection.address')}
          </motion.p>

          <div className="contact-me__icons">
            <a href="https://www.instagram.com/mad1yor.dev" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://github.com/MadiyorDev" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://t.me/pardaboyev_m" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
          </div>

          <p>+998 90 931 08 30</p>
        </div>
      </motion.div>

      <footer className="contact-me__footer">
        <motion.p
          key={`footer-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          © 2025 Madiyor Dev
        </motion.p>
      </footer>
    </section>
  );
};

export default ContactMe;
