"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Code,
  AlertCircle,
  Loader2,
  Briefcase,
  Target,
  Clock,
  Sparkles,
} from "lucide-react";

export default function PitchBlackInterviewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [prepDays, setPrepDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [newSkill, setNewSkill] = useState("");
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;
  const skillsToImprove = requiredSkills.filter(
    (skill) => !userSkills.includes(skill),
  );

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" },
    tap: { scale: 0.95 },
  };

  const loaderVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const addUserSkill = () => {
    if (newSkill.trim() && !userSkills.includes(newSkill.trim())) {
      setUserSkills([...userSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const addRequiredSkill = () => {
    if (
      newRequiredSkill.trim() &&
      !requiredSkills.includes(newRequiredSkill.trim())
    ) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill("");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Handle form submission here
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Generating Plan...";
    return currentStep === totalSteps ? "Create Study Plan" : "Next Step";
  };

  const getSkillIcon = (skill: string) => {
    return <Code size={14} className="text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <motion.div
        key="prep-form"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-2xl relative"
      >
        {/* Main container with glass effect */}
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 blur-sm"></div>
          <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl">
            {/* Progress bar with glow */}
            <div className="h-1 bg-gray-900 w-full relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 shadow-lg shadow-blue-500/50"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(currentStep / totalSteps) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            <div className="p-8 relative z-10">
              {/* Step indicator */}
              <div className="flex justify-between mb-12 relative">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center relative z-10"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        currentStep > idx + 1
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-blue-500/50"
                          : currentStep === idx + 1
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-blue-500/50"
                            : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                      }`}
                      animate={
                        currentStep === idx + 1
                          ? {
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0.3)",
                                "0 0 0 20px rgba(59, 130, 246, 0.1)",
                                "0 0 0 0 rgba(59, 130, 246, 0.3)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {currentStep > idx + 1 ? (
                        <CheckCircle size={24} />
                      ) : (
                        <span className="font-bold text-xl">{idx + 1}</span>
                      )}
                    </motion.div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">
                      {
                        [
                          "Job Info",
                          "Your Skills",
                          "Requirements",
                          "Time Plan",
                        ][idx]
                      }
                    </span>
                  </div>
                ))}

                {/* Connecting line with glow */}
                <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 shadow-lg shadow-blue-500/30"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
                      >
                        <Briefcase size={32} className="text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Job Information
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Let's start with the position you're targeting
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Job Title
                      </label>
                      <div className="relative">
                        <motion.input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="e.g. Frontend Developer"
                          className="w-full p-4 pl-12 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          whileFocus={{
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          }}
                        />
                        <div className="absolute left-4 top-4 text-blue-400">
                          <Briefcase size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Job suggestions with improved styling */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {[
                        "Frontend Developer",
                        "React Developer",
                        "Full Stack Engineer",
                        "UX Designer",
                        "Product Manager",
                        "Data Scientist",
                      ].map((job, idx) => (
                        <motion.div
                          key={idx}
                          variants={item}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setJobTitle(job)}
                          className={`p-4 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                            jobTitle === job
                              ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-300 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20"
                              : "bg-gray-800/30 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50"
                          }`}
                        >
                          {job}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
                      >
                        <Code size={32} className="text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Your Skills
                      </h2>
                      <p className="text-gray-400 text-lg">
                        What skills do you already have?
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Add Your Skills
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <motion.input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="e.g. React"
                            className="w-full p-4 pl-12 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            whileFocus={{
                              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addUserSkill();
                              }
                            }}
                          />
                          <div className="absolute left-4 top-4 text-blue-400">
                            <Code size={20} />
                          </div>
                        </div>
                        <motion.button
                          onClick={addUserSkill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                        >
                          Add
                        </motion.button>
                      </div>
                    </div>

                    {/* Skills display */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-blue-400" />
                        Your Skills ({userSkills.length})
                      </h3>
                      <motion.div
                        className="flex flex-wrap gap-3"
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {userSkills.length === 0 ? (
                          <p className="text-gray-500 text-sm italic">
                            No skills added yet
                          </p>
                        ) : (
                          userSkills.map((skill, idx) => (
                            <motion.div
                              key={idx}
                              variants={item}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/10"
                            >
                              {getSkillIcon(skill)}
                              {skill}
                              <button
                                onClick={() => {
                                  setUserSkills(
                                    userSkills.filter((s) => s !== skill),
                                  );
                                }}
                                className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </motion.div>
                          ))
                        )}
                      </motion.div>
                    </div>

                    {/* Common skills suggestions */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-4">
                        Popular Skills for {jobTitle || "this position"}
                      </h3>
                      <motion.div
                        className="flex flex-wrap gap-3"
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "JavaScript",
                          "React",
                          "TypeScript",
                          "CSS",
                          "HTML",
                          "Redux",
                          "Node.js",
                          "API Integration",
                        ].map(
                          (skill, idx) =>
                            !userSkills.includes(skill) && (
                              <motion.button
                                key={idx}
                                variants={item}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  setUserSkills([...userSkills, skill])
                                }
                                className="bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                {skill}
                              </motion.button>
                            ),
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
                      >
                        <Target size={32} className="text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Required Skills
                      </h2>
                      <p className="text-gray-400 text-lg">
                        What skills does the job require?
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Add Required Skills
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <motion.input
                            type="text"
                            value={newRequiredSkill}
                            onChange={(e) =>
                              setNewRequiredSkill(e.target.value)
                            }
                            placeholder="e.g. Redux"
                            className="w-full p-4 pl-12 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            whileFocus={{
                              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addRequiredSkill();
                              }
                            }}
                          />
                          <div className="absolute left-4 top-4 text-blue-400">
                            <Target size={20} />
                          </div>
                        </div>
                        <motion.button
                          onClick={addRequiredSkill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                        >
                          Add
                        </motion.button>
                      </div>
                    </div>

                    {/* Required Skills display */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-400" />
                        Required Skills ({requiredSkills.length})
                      </h3>
                      <motion.div
                        className="flex flex-wrap gap-3"
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {requiredSkills.length === 0 ? (
                          <p className="text-gray-500 text-sm italic">
                            No required skills added yet
                          </p>
                        ) : (
                          requiredSkills.map((skill, idx) => (
                            <motion.div
                              key={idx}
                              variants={item}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-orange-500/30 shadow-lg shadow-orange-500/10"
                            >
                              {getSkillIcon(skill)}
                              {skill}
                              <button
                                onClick={() =>
                                  setRequiredSkills(
                                    requiredSkills.filter((s) => s !== skill),
                                  )
                                }
                                className="ml-1 text-orange-400 hover:text-orange-300 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </motion.div>
                          ))
                        )}
                      </motion.div>
                    </div>

                    {/* Skill gap analysis */}
                    {requiredSkills.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                      >
                        <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                          <AlertCircle size={18} className="text-orange-400" />
                          Skills Gap Analysis
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-20 text-sm font-medium text-gray-400">
                              Required:
                            </div>
                            <div className="flex-1 flex flex-wrap gap-2">
                              {requiredSkills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    userSkills.includes(skill)
                                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                      : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-20 text-sm font-medium text-gray-400">
                              Missing:
                            </div>
                            <div className="flex-1">
                              {skillsToImprove.length === 0 ? (
                                <span className="text-sm text-green-400 font-medium">
                                  🎉 Perfect! You have all required skills
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {skillsToImprove.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
                      >
                        <Clock size={32} className="text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Time Planning
                      </h2>
                      <p className="text-gray-400 text-lg">
                        How much time do you have to prepare?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Days until interview
                        </label>
                        <div className="relative">
                          <motion.input
                            type="number"
                            min="1"
                            max="30"
                            value={prepDays}
                            onChange={(e) =>
                              setPrepDays(parseInt(e.target.value))
                            }
                            className="w-full p-4 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            days
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Hours per day
                        </label>
                        <div className="relative">
                          <motion.input
                            type="number"
                            min="1"
                            max="10"
                            value={hoursPerDay}
                            onChange={(e) =>
                              setHoursPerDay(parseInt(e.target.value))
                            }
                            className="w-full p-4 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            hours
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Clock size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">
                            Your Study Plan Summary
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            You'll have{" "}
                            <span className="text-blue-400 font-semibold">
                              {prepDays} days
                            </span>{" "}
                            to prepare with{" "}
                            <span className="text-blue-400 font-semibold">
                              {hoursPerDay} hours
                            </span>{" "}
                            of focused study each day.
                            {skillsToImprove.length > 0 && (
                              <>
                                <br />
                                <span className="text-orange-400 font-medium">
                                  Skills to improve:{" "}
                                  {skillsToImprove.join(", ")}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="mt-12 flex justify-between">
                {currentStep > 1 ? (
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    Back
                  </motion.button>
                ) : (
                  <div></div>
                )}
                <motion.button
                  whileHover={isLoading ? {} : "hover"}
                  whileTap={isLoading ? {} : "tap"}
                  variants={buttonVariants}
                  onClick={nextStep}
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 ${
                    isLoading
                      ? "bg-blue-400/50 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      variants={loaderVariants as any}
                      animate="animate"
                      className="mr-1"
                    >
                      <Loader2 size={18} />
                    </motion.div>
                  ) : null}
                  {getButtonText()}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
