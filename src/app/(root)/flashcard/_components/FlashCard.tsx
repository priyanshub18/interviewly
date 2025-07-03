"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Flashcard({ card, index, theme2 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  // Card variant
  const frontCardStyle = `${theme2.card.front} ${theme2.card.textFront}`;
  const backCardStyle = `${theme2.card.back} ${theme2.card.textBack}`;

  // Dynamic height based on expanded state
  const cardHeight = isExpanded ? "h-80" : "h-64";

  // Handle expand toggle separately from flip
  const handleExpandClick = (e) => {
    e.stopPropagation(); // Prevent triggering the flip
    setIsExpanded(!isExpanded);
  };

  // Handler for modal open (for answer)
  const handleShowMoreAnswer = (e) => {
    e.stopPropagation();
    setShowAnswerModal(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setShowAnswerModal(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={`perspective-3d ${isExpanded ? "min-h-64" : "h-64"}`}
        whileHover={{
          translateY: -8,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <motion.div
          className="relative w-full h-full rounded-2xl cursor-pointer preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of Card */}
          <motion.div
            className={`absolute inset-0 p-6 rounded-2xl ${frontCardStyle} backface-hidden flex flex-col justify-between ${isExpanded ? "min-h-64" : "h-64"}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                  {card.category}
                </span>

                <motion.button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleExpandClick}
                >
                  {isExpanded ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  )}
                </motion.button>
              </div>

              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <div className="flex items-start mb-4 flex-grow overflow-hidden">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 text-white/80 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p className="text-lg">
                  {isExpanded
                    ? card.question
                    : card.question.length > 100
                      ? `${card.question.substring(0, 100)}...`
                      : card.question}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              {!isExpanded && card.question.length > 100 && (
                <motion.button
                  className="flex items-center px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm text-sm"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleExpandClick}
                >
                  Show more
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.button>
              )}

              <motion.div
                className={`flex items-center px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm text-sm ml-auto`}
                whileHover={{ scale: 1.05 }}
              >
                Tap to reveal
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 bg-white"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-2 -left-2 w-16 h-16 rounded-full opacity-10 bg-white"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Back of Card */}
          <motion.div
            className={`absolute inset-0 p-6 rounded-2xl ${backCardStyle} backface-hidden flex flex-col justify-between ${isExpanded ? "min-h-64" : "h-64"} ${isFlipped ? "" : "hidden"}`}
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${theme2.card.accent}`}>
                  {card.title}
                </h3>
                <div className="flex space-x-2">
                  <span
                    className={`px-3 py-1 bg-indigo-500/10 ${theme2.card.accent} rounded-full text-xs font-medium`}
                  >
                    Answer
                  </span>
                  <motion.button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-indigo-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={handleExpandClick}
                  >
                    {isExpanded ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="bg-indigo-500/5 rounded-xl p-4 border border-indigo-500/10 overflow-auto flex-grow h-12">
                <p className="text-lg">
                  {isExpanded
                    ? card.answer
                    : card.answer.length > 80
                      ? `${card.answer.substring(0, 80)}...`
                      : card.answer}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-indigo-300/80">#{card.id}</span>

              {/* Show more button opens modal now */}
              {!isExpanded && card.answer.length > 80 && (
                <motion.button
                  className={`flex items-center ${theme2.card.accent}  px-3 py-1.5 bg-indigo-500/5 rounded-lg text-sm mr-auto ml-2`}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleShowMoreAnswer}
                >
                  Show more
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.button>
              )}

              <motion.div
                className={`flex items-center ${theme2.card.accent} px-3 py-1.5 rounded-lg text-sm`}
                whileHover={{ scale: 1.05 }}
              >
                Tap to flip back
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-5 bg-indigo-200"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal for full answer */}
      <AnimatePresence>
        {showAnswerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`${backCardStyle} rounded-2xl p-8 w-full max-w-xl shadow-xl relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className={`absolute top-4 right-4 p-2 rounded-full ${theme2.card.accent} bg-white/10 hover:bg-white/20`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </motion.button>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${theme2.card.accent}`}>
                    {card.title}
                  </h3>
                  <span
                    className={`px-3 py-1 bg-indigo-500/10 ${theme2.card.accent} rounded-full text-xs font-medium`}
                  >
                    Answer
                  </span>
                </div>
                <div className="bg-indigo-500/5 rounded-xl p-4 border border-indigo-500/10 overflow-auto flex-grow max-h-96">
                  <p className="text-lg whitespace-pre-line">{card.answer}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="text-xs text-indigo-300/80">#{card.id}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


export default Flashcard;