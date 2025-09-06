import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaInstagram, FaGithub, FaTelegram } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.scss';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// 🔹 qo‘shamiz
import SmoothText from '../../components/SmoothText/SmoothText';

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const BOT_TOKEN = '8135342435:AAGHhb50Nk6NMjQC8lSMNAluS28SyblinEM';
  const CHAT_ID = '1857524341';

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
      toast.error('❌ Failed to send message!');
    }
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('❗ Name is required'),
      email: Yup.string().email('❗ Invalid email').required('❗ Email is required'),
      message: Yup.string().required('❗ Message is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const telegramMessage = `
<b>New Contact Form Message</b>
👤 <b>Name:</b> ${values.name}
📧 <b>Email:</b> ${values.email}
💬 <b>Message:</b> ${values.message}
      `;
      await sendMessageToTelegram(telegramMessage);
      toast.success('✅ Message sent successfully!');
      resetForm();
    },
  });

  return (
    <section className="contact" id="contact" ref={ref}>
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div
        className="contact__container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Form qismi */}
        <motion.div
          className="contact__form"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2>
            <SmoothText textKey="contactSection.title" />
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <textarea
              name="message"
              placeholder="Your Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="error">{formik.errors.message}</div>
            )}

            <button type="submit">
              <SmoothText textKey="contactSection.form.submit" />
            </button>
          </form>
        </motion.div>

        {/* Social qismi */}
        <motion.div
          className="contact__social"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2>
            <SmoothText textKey="contactSection.socialTitle" />
          </h2>
          <p>
            <SmoothText textKey="contactSection.address" />
          </p>
          <div className="contact__social__icons">
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
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="contact__footer"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p>© 2025 Madiyor Dev</p>
        <nav>
          <a href="/home"><SmoothText textKey="home" /></a>
          <a href="/about"><SmoothText textKey="about" /></a>
          <a href="/skills"><SmoothText textKey="skills" /></a>
          <a href="/projects"><SmoothText textKey="projects" /></a>
          <a href="/contact"><SmoothText textKey="contactSection.title" /></a>
        </nav>
      </motion.footer>
    </section>
  );
};

export default Contact;
