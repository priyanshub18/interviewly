// import React from "react";
// import { motion } from "framer-motion";
// const time_lineThingy = () => {
//   return (
//     <div>
//       {" "}
//       <motion.div
//         key="study-plan"
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         variants={pageVariants}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="space-y-8"
//       >
//         {/* Study Plan Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden p-6"
//         >
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Your Study Plan
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 {prepDays}-day preparation plan for{" "}
//                 {jobTitle || "your interview"}
//               </p>
//             </div>
//             <motion.button
//               whileHover="hover"
//               whileTap="tap"
//               variants={buttonVariants}
//               onClick={() => {
//                 setPlanGenerated(false);
//                 setCurrentStep(1);
//               }}
//               className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium border border-indigo-200 dark:border-indigo-800/50 flex items-center gap-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 19l-7-7 7-7"></path>
//                 <path d="M19 12H5"></path>
//               </svg>
//               Start Over
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Study Plan Cards */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {studyPlan.map((day, idx) => (
//             <motion.div key={idx} variants={itemVariants}>
//               <motion.div
//                 className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden relative h-full cursor-pointer perspective-1000"
//                 whileHover="hover"
//                 whileTap="tap"
//                 variants={cardVariants}
//                 onClick={() => flipDayCard(idx)}
//               >
//                 <div className="relative">
//                   <AnimatePresence initial={false} mode="wait">
//                     {activeDayCard === idx ? (
//                       // Back of the card
//                       <motion.div
//                         key="back"
//                         initial={{ rotateY: 180, opacity: 0 }}
//                         animate={{ rotateY: 0, opacity: 1 }}
//                         exit={{ rotateY: -180, opacity: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className={`${cardTheme.card.back} p-6 h-full`}
//                       >
//                         <div className={`${cardTheme.card.textBack}`}>
//                           <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-bold">
//                               Day {day.day + 1} - Details
//                             </h3>
//                             <span
//                               className={`text-xs font-medium ${cardTheme.card.accent} py-1 px-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30`}
//                             >
//                               {day.topics?.reduce(
//                                 (acc, topic) => acc + topic.hours_allocated,
//                                 0,
//                               ) || 0}{" "}
//                               hours
//                             </span>
//                           </div>
//                           <div className="space-y-4">
//                             {day.topics?.map((topic, topicIdx) => (
//                               <div key={topicIdx} className="space-y-1">
//                                 <div className="flex items-center gap-1.5">
//                                   <Sparkles
//                                     size={14}
//                                     className={cardTheme.card.accent}
//                                   />
//                                   <h4 className="font-medium text-sm">
//                                     {topic.topic}
//                                   </h4>
//                                 </div>
//                                 <div className="ml-5 text-xs text-gray-600 dark:text-gray-400">
//                                   <p>
//                                     <span className="font-medium">Hours:</span>{" "}
//                                     {topic.hours_allocated}
//                                   </p>
//                                   <p>
//                                     <span className="font-medium">Focus:</span>{" "}
//                                     {topic.focus_area}
//                                   </p>
//                                   {topic.notes && (
//                                     <p className="mt-1 italic">{topic.notes}</p>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                             {day.notes && (
//                               <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
//                                 <p className="font-medium mb-1">Notes:</p>
//                                 <p>{day.notes}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     ) : (
//                       // Front of the card
//                       <motion.div
//                         key="front"
//                         initial={{ rotateY: -180, opacity: 0 }}
//                         animate={{ rotateY: 0, opacity: 1 }}
//                         exit={{ rotateY: 180, opacity: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className={`${cardTheme.card.front} p-6`}
//                       >
//                         <div className={`${cardTheme.card.textFront}`}>
//                           <h3 className="text-xl font-bold mb-3">
//                             Day {day.day + 1}
//                           </h3>
//                           <div className="flex items-center mb-4">
//                             <Calendar size={16} className="mr-1.5" />
//                             <span className="text-sm font-medium">
//                               {day.topics?.reduce(
//                                 (acc, topic) => acc + topic.hours_allocated,
//                                 0,
//                               ) || 0}{" "}
//                               hours of study
//                             </span>
//                           </div>
//                           <div className="space-y-2 mb-4">
//                             {day.topics?.map((topic, topicIdx) => (
//                               <div
//                                 key={topicIdx}
//                                 className="flex items-center gap-2"
//                               >
//                                 <div className="h-1.5 w-1.5 rounded-full bg-white/70"></div>
//                                 <p className="text-sm">
//                                   {topic.topic} ({topic.hours_allocated}h)
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                           <div className="mt-auto text-xs text-white/80">
//                             Click to see details
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default time_lineThingy;
import React from "react";

const time_lineThingy = () => {
  return <div>time_lineThingy</div>;
};

export default time_lineThingy;
