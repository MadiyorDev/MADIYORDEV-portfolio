import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const SmoothText = ({ textKey }) => {
  const { t, i18n } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={i18n.language} // til o‘zgarsa animatsiya ishga tushadi
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {t(textKey)}
      </motion.span>
    </AnimatePresence>
  );
};

export default SmoothText;
