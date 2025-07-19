// src/components/horario/ScheduleViewer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleViewer({ imgSrc, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="w-full h-auto mb-6 overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
      >
        <img src={imgSrc} alt={alt} className="object-cover w-full" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={imgSrc}
                alt={alt}
                className="rounded-lg object-contain w-full h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-4 text-3xl font-bold focus:outline-none z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                &times;
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}