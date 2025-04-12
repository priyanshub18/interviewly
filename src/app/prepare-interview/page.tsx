"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import MeetingCard from "@/components/MeetingCard";
import UpcomingInterviews from "./_components/UpcomingInterviews";

export default function InterviewPrepApp() {
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Interview data
  const [jobTitle, setJobTitle] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [prepDays, setPrepDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [newSkill, setNewSkill] = useState("");
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [studyPlan, setStudyPlan] = useState([]);

  const interviews = useQuery(api.interviews.getUpcomingInterviews);

  useEffect(() => {
    console.log("interviews", interviews);
  }, [interviews]);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  // Calculate skills gap
  const skillsToImprove = requiredSkills.filter(
    (skill) => !userSkills.includes(skill),
  );

  // Generate the study plan
  const generatePlan = () => {
    if (skillsToImprove.length === 0) {
      setStudyPlan([
        {
          day: 1,
          tasks: [
            "Great job! You already have all the required skills. Use this time to practice interview questions.",
          ],
        },
      ]);
      setPlanGenerated(true);
      return;
    }

    const totalDays = prepDays;
    const plan = [];

    // Distribute skills across days
    const daysPerSkill = Math.max(
      1,
      Math.floor(totalDays / skillsToImprove.length),
    );
    let remainingDays = totalDays;

    skillsToImprove.forEach((skill, index) => {
      const daysForThisSkill =
        index === skillsToImprove.length - 1 ? remainingDays : daysPerSkill;

      remainingDays -= daysForThisSkill;

      for (let i = 0; i < daysForThisSkill; i++) {
        const dayNumber = plan.length + 1;
        plan.push({
          day: dayNumber,
          skill: skill,
          tasks: [
            `Study ${skill} fundamentals (${hoursPerDay / 2} hours)`,
            `Practice ${skill} exercises (${hoursPerDay / 2} hours)`,
          ],
        });
      }
    });

    setStudyPlan(plan);
    setPlanGenerated(true);
  };

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePlan();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle skill addition
  const addUserSkill = () => {
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill("");
    }
  };

  const addRequiredSkill = () => {
    if (newRequiredSkill && !requiredSkills.includes(newRequiredSkill)) {
      setRequiredSkills([...requiredSkills, newRequiredSkill]);
      setNewRequiredSkill("");
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen  text-gray-100 p-4 md:p-8 mt-12 ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="rounded-xl bg-gray-800 border border-gray-700/40 shadow-xl mb-12 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-900/30 mix-blend-soft-light blur-3xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-blue-600/30 mix-blend-soft-light blur-3xl opacity-60"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Top gradient bar with animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"
          />

          <div className="p-8 relative z-10">
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-6 inline-block"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl font-bold"
                >
                  <span className="inline-block relative">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent no-underline">
                      Interview Prep Planner
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-gray-400 mt-4 text-lg max-w-lg"
                >
                  Create a personalized plan to ace your next interview
                </motion.p>
              </div>

              {/* Action buttons with hover animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2">
                    Prepare for Interview
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
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="border border-blue-300/20 text-blue-300 py-2 px-4 rounded-lg font-medium">
                    View Dashboard
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Animated metrics/stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                {
                  label: "Upcoming Interviews",
                  value: "2",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                  color: "bg-blue-600",
                },
                {
                  label: "Practice Sessions",
                  value: "14",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  color: "bg-blue-500",
                },
                {
                  label: "Skills Improved",
                  value: "8",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                  color: "bg-blue-700",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 h-full shadow-lg border border-gray-700/50">
                    <div
                      className={`${stat.color} h-10 w-10 rounded-lg flex items-center justify-center text-white`}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: 1.4 + index * 0.1,
                            duration: 0.8,
                          }}
                        >
                          {stat.value}
                        </motion.span>
                      </div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Section */}
        <div className="mt-12">
          <div className="space-y-8">
            {/* Multi-step Form for Interview Preparation */}
            <AnimatePresence mode="wait">
              {!planGenerated ? (
                <motion.div
                  key="prep-form"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gray-800 border border-gray-700/50 rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Progress bar */}
                  <div className="h-2 bg-gray-700 w-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-600"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="p-6">
                    {/* Step indicator */}
                    <div className="flex justify-between mb-8 relative">
                      {Array.from({ length: totalSteps }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center relative z-10"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center
                              ${
                                currentStep > idx + 1
                                  ? "bg-blue-600 text-white"
                                  : currentStep === idx + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-400"
                              }`}
                          >
                            {currentStep > idx + 1 ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            ) : (
                              idx + 1
                            )}
                          </motion.div>
                          <span className="text-xs mt-2 text-gray-400">
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

                      {/* Connecting line */}
                      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0">
                        <motion.div
                          className="h-full bg-blue-600"
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                          }}
                          transition={{ duration: 0.5 }}
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
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold text-white">
                            Job Information
                          </h2>
                          <p className="text-gray-400">
                            Let's start with some basic information about the
                            position you're applying for.
                          </p>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                              placeholder="e.g. Frontend Developer"
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold text-white">
                            Your Skills
                          </h2>
                          <p className="text-gray-400">
                            Enter the skills you currently possess
                          </p>

                          <div className="flex mb-4">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="e.g. React, JavaScript, UI Design"
                              className="flex-grow p-3 rounded-l-md bg-gray-700 border border-gray-600 text-white"
                              onKeyDown={(e) =>
                                e.key === "Enter" && addUserSkill()
                              }
                            />
                            <button
                              onClick={addUserSkill}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md flex items-center justify-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {userSkills.map((skill, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gray-700 border border-gray-600 px-3 py-1 rounded-full flex items-center"
                              >
                                <span className="text-sm text-white">
                                  {skill}
                                </span>
                                <button
                                  onClick={() =>
                                    setUserSkills(
                                      userSkills.filter((_, i) => i !== index),
                                    )
                                  }
                                  className="ml-2 text-gray-400 hover:text-gray-200"
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
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </motion.div>
                            ))}

                            {userSkills.length === 0 && (
                              <p className="text-gray-500 text-sm italic">
                                No skills added yet
                              </p>
                            )}
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
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold text-white">
                            Job Requirements
                          </h2>
                          <p className="text-gray-400">
                            List the skills required for the job position
                          </p>

                          <div className="flex mb-4">
                            <input
                              type="text"
                              value={newRequiredSkill}
                              onChange={(e) =>
                                setNewRequiredSkill(e.target.value)
                              }
                              placeholder="e.g. TypeScript, Redux, Jest"
                              className="flex-grow p-3 rounded-l-md bg-gray-700 border border-gray-600 text-white"
                              onKeyDown={(e) =>
                                e.key === "Enter" && addRequiredSkill()
                              }
                            />
                            <button
                              onClick={addRequiredSkill}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md flex items-center justify-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {requiredSkills.map((skill, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gray-700 border border-gray-600 px-3 py-1 rounded-full flex items-center"
                              >
                                <span className="text-sm text-white">
                                  {skill}
                                </span>
                                <button
                                  onClick={() =>
                                    setRequiredSkills(
                                      requiredSkills.filter(
                                        (_, i) => i !== index,
                                      ),
                                    )
                                  }
                                  className="ml-2 text-gray-400 hover:text-gray-200"
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
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </motion.div>
                            ))}

                            {requiredSkills.length === 0 && (
                              <p className="text-gray-500 text-sm italic">
                                No requirements added yet
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold text-white">
                            Study Plan
                          </h2>
                          <p className="text-gray-400">
                            How much time do you have for preparation?
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Days until interview
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="range"
                                  min="1"
                                  max="30"
                                  value={prepDays}
                                  onChange={(e) =>
                                    setPrepDays(parseInt(e.target.value))
                                  }
                                  className="w-full h-2 appearance-none bg-gray-700 rounded-full"
                                />
                                <span className="ml-3 font-medium text-white w-8 text-center">
                                  {prepDays}
                                </span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Hours per day for studying
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="range"
                                  min="1"
                                  max="8"
                                  value={hoursPerDay}
                                  onChange={(e) =>
                                    setHoursPerDay(parseInt(e.target.value))
                                  }
                                  className="w-full h-2 appearance-none bg-gray-700 rounded-full"
                                />
                                <span className="ml-3 font-medium text-white w-8 text-center">
                                  {hoursPerDay}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                          currentStep === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
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
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                      >
                        {currentStep < totalSteps ? "Next" : "Generate Plan"}
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
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="study-plan"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gray-800 border border-gray-700/50 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-white flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Your Study Plan for {jobTitle}
                      </motion.h2>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => setPlanGenerated(false)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
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
                          <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
                        </svg>
                        Edit Information
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6 p-4 bg-gray-900/50 rounded-lg"
                    >
                      <h3 className="font-medium text-gray-300 mb-2">
                        Summary:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">
                            Skills to Improve:
                          </span>
                          <div className="font-medium text-white mt-1">
                            {skillsToImprove.length > 0
                              ? skillsToImprove.join(", ")
                              : "None - Great job!"}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Study Period:</span>
                          <div className="font-medium text-white mt-1">
                            {prepDays} days
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Daily Study:</span>
                          <div className="font-medium text-white mt-1">
                            {hoursPerDay} hours
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {studyPlan.map((day, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-sm">
                              {day.day}
                            </div>
                            <h3 className="font-medium text-white">
                              Day {day.day} {day.skill && `- ${day.skill}`}
                            </h3>
                          </div>
                          <ul className="space-y-2 text-gray-300 ml-11">
                            {day.tasks.map((task, taskIndex) => (
                              <li
                                key={taskIndex}
                                className="flex items-center gap-2"
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
                                  className="text-blue-400"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </motion.div>

                    <div className="mt-8 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Save Study Plan
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upcoming Interviews Section */}
            <UpcomingInterviews />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
