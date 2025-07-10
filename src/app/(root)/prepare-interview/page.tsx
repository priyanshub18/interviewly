"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  AlertCircle,
  ArrowDownIcon,
  BookOpen,
  Calendar,
  Loader,
  CheckCircle,
  Code,
  Database,
  Layers,
  Lightbulb,
  Sparkles,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { set } from "date-fns";
import toast from "react-hot-toast";

interface StudyPlanDay {
  day: number;
  topics?: Array<{
    topic: string;
    hours_allocated: number;
    focus_area: string;
    notes?: string;
  }>;
  notes?: string;
}

export default function InterviewPrepApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [jobTitle, setJobTitle] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [prepDays, setPrepDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [newSkill, setNewSkill] = useState("");
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [studyPlan, setStudyPlan] = useState<StudyPlanDay[]>([]);
  const [activeDayCard, setActiveDayCard] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobLevel, setJobLevel] = useState("");

  const interviews = useQuery(api.interviews.getUpcomingInterviews);

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.97 },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
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

  const textVariants = {
    initial: { opacity: 0, y: 5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

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

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      y: -12,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.98 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  const getButtonText = () => {
    if (isLoading) return "Loading...";
    if (currentStep === totalSteps) return "Generate Plan";
    return "Next";
  };

  const flipDayCard = (dayIndex) => {
    setActiveDayCard(activeDayCard === dayIndex ? null : dayIndex);
  };

  // Calculate skills gap
  const skillsToImprove = requiredSkills.filter(
    (skill) => !userSkills.includes(skill),
  );

  // Get skill icon
  const getSkillIcon = (skill) => {
    const icons = {
      react: <Code className="mr-1 text-blue-500" size={16} />,
      javascript: <Code className="mr-1 text-yellow-500" size={16} />,
      typescript: <Code className="mr-1 text-blue-600" size={16} />,
      database: <Database className="mr-1 text-green-500" size={16} />,
      design: <Layers className="mr-1 text-purple-500" size={16} />,
      default: <Sparkles className="mr-1 text-indigo-500" size={16} />,
    };

    const key = Object.keys(icons).find((key) =>
      skill.toLowerCase().includes(key),
    );

    return key ? icons[key] : icons.default;
  };

  // Generate the study plan
  const generatePlan = async () => {
    if (userSkills.length === 0) {
      toast.error("Please add your skills first");
    }
    if (requiredSkills.length === 0) {
      toast.error("Please add required skills first");
    }
    if (userSkills.length === 0 || requiredSkills.length === 0) {
      return;
    }

    setIsLoading(true);
    setPlanGenerated(false);
    if (skillsToImprove.length === 0) {
      setStudyPlan([
        {
          day: 0,
          topics: [
            {
              topic:
                "Great job! You already have all the required skills. Use this time to practice interview questions.",
              hours_allocated: 2,
              focus_area: "learning",
            },
          ],
        },
      ]);
      setPlanGenerated(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-studyplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_title: jobTitle,
          number_of_days: prepDays,
          hours_per_day: hoursPerDay,
          my_current_skills: userSkills,
          required_job_skills: requiredSkills,
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }

      setStudyPlan(data.study_plan);
      setPlanGenerated(true);
    } catch (error) {
      toast.error("Failed to generate study plan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
    if (userSkills.includes(newSkill)) {
      toast.error("You already have this skill");
      return;
    }
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill("");
    }
  };

  const addRequiredSkill = () => {
    if (requiredSkills.includes(newRequiredSkill)) {
      toast.error("You already have this skill");
      return;
    }
    if (newRequiredSkill && !requiredSkills.includes(newRequiredSkill)) {
      setRequiredSkills([...requiredSkills, newRequiredSkill]);
      setNewRequiredSkill("");
    }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 p-4 md:p-8 mt-12 bg-gray-50 dark:bg-gray-950 transition-colors">
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
          className="rounded-xl border-2 border-gray-200/40 dark:border-gray-700/40 bg-white dark:bg-gray-900 shadow-xl mb-12 overflow-hidden relative"
        >
          {/* Decorative elements with more dynamic animations */}
          <motion.div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-400/30 dark:bg-blue-900/30 mix-blend-soft-light blur-3xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-indigo-200/30 dark:bg-indigo-600/30 mix-blend-soft-light blur-3xl opacity-60"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.7, 0.5],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute right-32 bottom-10 w-32 h-32 rounded-full bg-purple-300/20 dark:bg-purple-600/20 mix-blend-soft-light blur-3xl opacity-40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          {/* Top gradient bar with animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700"
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
              <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-blue-600 dark:to-blue-700 p-3 rounded-lg shadow-lg">
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
                    <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent no-underline">
                      Interview Prep Planner
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 rounded-full"
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
                  className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-lg"
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
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 shadow-md">
                    <span>Prepare for Interview</span>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowDownIcon className="size-5" />
                    </motion.div>
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="border border-indigo-200/30 dark:border-indigo-300/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-indigo-500 dark:text-indigo-300 py-2 px-4 rounded-lg font-medium shadow-sm">
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
                  value: interviews?.length || 0,
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
                  color: "bg-blue-500 dark:bg-blue-600",
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
                  color: "bg-blue-400 dark:bg-blue-500",
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
                  color: "bg-blue-600 dark:bg-blue-700",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4 h-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
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
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
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
                  className="bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm"
                >
                  {/* Animated background elements */}
                  <motion.div
                    className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1],
                      x: [0, 20, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.05, 0.2, 0.05],
                      x: [0, -15, 0],
                      y: [0, 15, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, delay: 3 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  />

                  {/* Progress bar */}
                  <div className="h-1 bg-gray-900 w-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="p-8 relative z-10">
                    {/* Step indicator */}
                    <div className="flex justify-between mb-10 relative">
                      {Array.from({ length: totalSteps }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center relative z-10"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2
                              ${
                                currentStep > idx + 1
                                  ? "bg-blue-700 border-blue-600 text-white shadow-blue-700/50"
                                  : currentStep === idx + 1
                                    ? "bg-blue-700 border-blue-500 text-white shadow-blue-700/50"
                                    : "bg-gray-900 border-gray-700 text-gray-400"
                              }`}
                            animate={
                              currentStep === idx + 1
                                ? {
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                      "0 4px 6px rgba(0, 0, 0, 0.3)",
                                      "0 10px 25px rgba(59, 130, 246, 0.4)",
                                      "0 4px 6px rgba(0, 0, 0, 0.3)",
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
                              <span className="font-bold text-lg">
                                {idx + 1}
                              </span>
                            )}
                          </motion.div>
                          <span className="text-xs mt-3 text-gray-400 font-medium">
                            {
                              [
                                "Job Info",
                                "Your Skills",
                                "Requirements",
                                "Time Plan",
                                "Preferences",
                              ][idx]
                            }
                          </span>
                        </div>
                      ))}

                      {/* Connecting line */}
                      <div className="absolute top-7 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"
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
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-3">
                              Job Information
                            </h2>
                            <p className="text-gray-400 text-lg">
                              Let's start with the position details
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-3">
                                Job Title
                              </label>
                              <div className="relative">
                                <motion.input
                                  type="text"
                                  value={jobTitle}
                                  onChange={(e) => setJobTitle(e.target.value)}
                                  placeholder="e.g. Senior Frontend Developer"
                                  className="w-full p-4 pl-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                  whileFocus={{
                                    boxShadow:
                                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                                  }}
                                />
                                <div className="absolute left-4 top-4 text-gray-500">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-3">
                                Company Name
                              </label>
                              <div className="relative">
                                <motion.input
                                  type="text"
                                  value={companyName || ""}
                                  onChange={(e) =>
                                    setCompanyName(e.target.value)
                                  }
                                  placeholder="e.g. Google, Microsoft"
                                  className="w-full p-4 pl-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                  whileFocus={{
                                    boxShadow:
                                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                                  }}
                                />
                                <div className="absolute left-4 top-4 text-gray-500">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <polyline
                                      points="9,22 9,12 15,12 15,22"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              Job Level
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {["Junior", "Mid-Level", "Senior"].map(
                                (level) => (
                                  <motion.button
                                    key={level}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setJobLevel(level)}
                                    className={`p-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                                      jobLevel === level
                                        ? "bg-blue-700 border-blue-600 text-white shadow-lg shadow-blue-700/30"
                                        : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600"
                                    }`}
                                  >
                                    {level}
                                  </motion.button>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Example jobs suggestions */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              Quick Select
                            </label>
                            <motion.div
                              className="grid grid-cols-2 md:grid-cols-3 gap-3"
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
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setJobTitle(job)}
                                  className={`px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border
                                    ${
                                      jobTitle === job
                                        ? "bg-blue-700/20 border-blue-600 text-blue-300"
                                        : "bg-gray-900/50 border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-600"
                                    }`}
                                >
                                  {job}
                                </motion.div>
                              ))}
                            </motion.div>
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
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-3">
                              Your Skills
                            </h2>
                            <p className="text-gray-400 text-lg">
                              What technologies and skills do you already know?
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              Add Your Skills
                            </label>
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <motion.input
                                  type="text"
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  placeholder="e.g. React, TypeScript, Node.js"
                                  className="w-full p-4 pl-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                  whileFocus={{
                                    boxShadow:
                                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      addUserSkill();
                                    }
                                  }}
                                />
                                <div className="absolute left-4 top-4 text-gray-500">
                                  <Code size={20} />
                                </div>
                              </div>
                              <motion.button
                                onClick={addUserSkill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-700/30"
                              >
                                Add
                              </motion.button>
                            </div>
                          </div>

                          {/* Skills list */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                              Your Skills ({userSkills.length})
                              {userSkills.length > 0 && (
                                <span className="bg-blue-700/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                  {userSkills.length}
                                </span>
                              )}
                            </h3>
                            <motion.div
                              className="flex flex-wrap gap-3"
                              variants={container}
                              initial="hidden"
                              animate="show"
                            >
                              {userSkills.length === 0 ? (
                                <div className="w-full text-center py-8">
                                  <div className="text-gray-600 mb-2">
                                    <Code size={48} className="mx-auto" />
                                  </div>
                                  <p className="text-gray-500 text-sm">
                                    No skills added yet. Start by adding your
                                    technical skills above.
                                  </p>
                                </div>
                              ) : (
                                userSkills.map((skill, idx) => (
                                  <motion.div
                                    key={idx}
                                    variants={item}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-blue-700/20 border border-blue-600/30 text-blue-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-700/20"
                                  >
                                    {getSkillIcon(skill)}
                                    {skill}
                                    <button
                                      onClick={() => {
                                        setUserSkills(
                                          userSkills.filter((s) => s !== skill),
                                        );
                                      }}
                                      className="ml-1 text-blue-400 hover:text-blue-200 transition-colors"
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
                                        <line
                                          x1="18"
                                          y1="6"
                                          x2="6"
                                          y2="18"
                                        ></line>
                                        <line
                                          x1="6"
                                          y1="6"
                                          x2="18"
                                          y2="18"
                                        ></line>
                                      </svg>
                                    </button>
                                  </motion.div>
                                ))
                              )}
                            </motion.div>
                          </div>

                          {/* Common skills suggestions */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-4">
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
                                "Git",
                                "AWS",
                                "Docker",
                                "Python",
                              ].map(
                                (skill, idx) =>
                                  !userSkills.includes(skill) && (
                                    <motion.button
                                      key={idx}
                                      variants={item}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() =>
                                        setUserSkills([...userSkills, skill])
                                      }
                                      className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-gray-700 hover:border-gray-600 transition-all duration-200"
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
                                        <line
                                          x1="12"
                                          y1="5"
                                          x2="12"
                                          y2="19"
                                        ></line>
                                        <line
                                          x1="5"
                                          y1="12"
                                          x2="19"
                                          y2="12"
                                        ></line>
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
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-3">
                              Required Skills
                            </h2>
                            <p className="text-gray-400 text-lg">
                              What skills does the job require?
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
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
                                  placeholder="e.g. Redux, GraphQL, Testing"
                                  className="w-full p-4 pl-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                  whileFocus={{
                                    boxShadow:
                                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      addRequiredSkill();
                                    }
                                  }}
                                />
                                <div className="absolute left-4 top-4 text-gray-500">
                                  <AlertCircle size={20} />
                                </div>
                              </div>
                              <motion.button
                                onClick={addRequiredSkill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-700/30"
                              >
                                Add
                              </motion.button>
                            </div>
                          </div>

                          {/* Required Skills list */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                              Required Skills ({requiredSkills.length})
                              {requiredSkills.length > 0 && (
                                <span className="bg-purple-700/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                                  {requiredSkills.length}
                                </span>
                              )}
                            </h3>
                            <motion.div
                              className="flex flex-wrap gap-3"
                              variants={container}
                              initial="hidden"
                              animate="show"
                            >
                              {requiredSkills.length === 0 ? (
                                <div className="w-full text-center py-8">
                                  <div className="text-gray-600 mb-2">
                                    <AlertCircle
                                      size={48}
                                      className="mx-auto"
                                    />
                                  </div>
                                  <p className="text-gray-500 text-sm">
                                    No required skills added yet. Add the skills
                                    the job requires.
                                  </p>
                                </div>
                              ) : (
                                requiredSkills.map((skill, idx) => (
                                  <motion.div
                                    key={idx}
                                    variants={item}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-purple-700/20 border border-purple-600/30 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20"
                                  >
                                    {getSkillIcon(skill)}
                                    {skill}
                                    <button
                                      onClick={() =>
                                        setRequiredSkills(
                                          requiredSkills.filter(
                                            (s) => s !== skill,
                                          ),
                                        )
                                      }
                                      className="ml-1 text-purple-400 hover:text-purple-200 transition-colors"
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
                                        <line
                                          x1="18"
                                          y1="6"
                                          x2="6"
                                          y2="18"
                                        ></line>
                                        <line
                                          x1="6"
                                          y1="6"
                                          x2="18"
                                          y2="18"
                                        ></line>
                                      </svg>
                                    </button>
                                  </motion.div>
                                ))
                              )}
                            </motion.div>
                          </div>

                          {/* Skill gap visualization */}
                          {requiredSkills.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6"
                            >
                              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                                <AlertCircle
                                  size={18}
                                  className="text-orange-400"
                                />
                                Skills Gap Analysis
                              </h3>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-24 text-xs font-semibold text-gray-400">
                                    Required:
                                  </div>
                                  <div className="flex-1 flex flex-wrap gap-2">
                                    {requiredSkills.map((skill, idx) => (
                                      <span
                                        key={idx}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                          userSkills.includes(skill)
                                            ? "bg-green-700/20 border border-green-600/30 text-green-300"
                                            : "bg-orange-700/20 border border-orange-600/30 text-orange-300"
                                        }`}
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-24 text-xs font-semibold text-gray-400">
                                    Missing:
                                  </div>
                                  <div className="flex-1">
                                    {skillsToImprove.length === 0 ? (
                                      <span className="text-xs text-green-400 font-semibold flex items-center gap-2">
                                        <CheckCircle size={14} />
                                        Perfect! You have all required skills
                                      </span>
                                    ) : (
                                      <div className="flex flex-wrap gap-2">
                                        {skillsToImprove.map((skill, idx) => (
                                          <span
                                            key={idx}
                                            className="bg-orange-700/20 border border-orange-600/30 text-orange-300 px-3 py-1 rounded-lg text-xs font-medium"
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
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-3">
                              Time Planning
                            </h2>
                            <p className="text-gray-400 text-lg">
                              How much time can you dedicate to preparation?
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-3">
                                Days until interview
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="1"
                                  max="30"
                                  value={prepDays}
                                  onChange={(e) =>
                                    setPrepDays(parseInt(e.target.value))
                                  }
                                  className="w-full p-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                  days
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-3">
                                Hours per day
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={hoursPerDay}
                                  onChange={(e) =>
                                    setHoursPerDay(parseInt(e.target.value))
                                  }
                                  className="w-full p-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                  hours
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="bg-blue-700/10 border border-blue-600/30 rounded-xl p-6 flex items-start gap-4">
                              <AlertCircle
                                className="text-blue-400 flex-shrink-0 mt-1"
                                size={20}
                              />
                              <div>
                                <p className="text-blue-300 text-sm leading-relaxed">
                                  Your study plan will include{" "}
                                  <span className="font-semibold text-blue-200">
                                    {prepDays} days
                                  </span>{" "}
                                  with{" "}
                                  <span className="font-semibold text-blue-200">
                                    {hoursPerDay} hours
                                  </span>{" "}
                                  of focused preparation each day.
                                  {skillsToImprove.length > 0 && (
                                    <>
                                      <br />
                                      <span className="font-semibold mt-2 inline-block text-orange-300">
                                        Skills to focus on:{" "}
                                        {skillsToImprove.join(", ")}
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="mt-12 flex justify-between">
                      {currentStep > 1 ? (
                        <motion.button
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants as any}
                          onClick={prevStep}
                          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl font-semibold border border-gray-700 hover:border-gray-600 transition-all duration-200"
                        >
                          Back
                        </motion.button>
                      ) : (
                        <div></div>
                      )}
                      <motion.button
                        whileHover={isLoading ? {} : "hover"}
                        whileTap={isLoading ? {} : "tap"}
                        animate={isLoading ? "loading" : "initial"}
                        variants={buttonVariants as any}
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 ${
                          isLoading
                            ? "bg-blue-600 text-white"
                            : "bg-blue-700 hover:bg-blue-600 text-white shadow-lg shadow-blue-700/30"
                        }`}
                      >
                        {isLoading ? (
                          <motion.div
                            variants={loaderVariants as any}
                            animate="animate"
                          >
                            <Loader2 size={20} />
                          </motion.div>
                        ) : null}
                        {getButtonText()}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                //  <PitchBlackInterviewForm/>
                <motion.div
                  key="study-plan"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    {/* Loading indicator */}
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-600 rounded-full mb-4"
                        />
                        <p className="text-gray-600 dark:text-gray-400">
                          Creating your personalized study plan...
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="-mx-10"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="bg-white dark:bg-gray-800 border rounded-xl shadow-lg overflow-hidden p-6"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mx-10">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Your Study Plan
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {prepDays}-day preparation plan for{" "}
                                {jobTitle || "your interview"}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "#e0e7ff",
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                              onClick={() => {
                                setPlanGenerated(false);
                                setCurrentStep(1);
                              }}
                              className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium border border-indigo-200 dark:border-indigo-800/50 flex items-center gap-2"
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
                                className="motion-safe:group-hover:animate-pulse"
                              >
                                <path d="M12 19l-7-7 7-7"></path>
                                <path d="M19 12H5"></path>
                              </svg>
                              Start Over
                            </motion.button>
                          </div>
                        </motion.div>

                        <div className="flex flex-col items-center rounded-xl min-h-screen bg-gray-50 dark:bg-gray-800 py-8 px-4 transition-colors duration-200">
                          <div className="w-full  ">
                            <motion.div
                              className="relative"
                              variants={container}
                              initial="hidden"
                              animate="show"
                              viewport={{ once: true }}
                            >
                              {/* Main horizontal timeline container */}
                              <div className="w-full py-12 overflow-x-auto mt-40">
                                <div className="relative min-w-max px-4 mt-40">
                                  {/* Animated timeline line with gradient glow effect */}
                                  <motion.div
                                    className="absolute top-24 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 dark:from-blue-600 dark:via-blue-400 dark:to-blue-600"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{
                                      duration: 1.5,
                                      ease: "easeOut",
                                    }}
                                  >
                                    {/* Animated glowing dot that moves across the timeline */}
                                    <motion.div
                                      className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 top-1/2 transform -translate-y-1/2"
                                      animate={{
                                        left: ["0%", "100%"],
                                        opacity: [0, 1, 0],
                                      }}
                                      transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  </motion.div>

                                  {/* Timeline items container with flexbox */}
                                  <div className="flex">
                                    {studyPlan.map((day, index) => {
                                      const isEven = index % 2 === 0;
                                      const cardWidth = 280; // Fixed width for all cards

                                      return (
                                        <motion.div
                                          key={day.day}
                                          className="relative mx-6 first:ml-0 last:mr-0"
                                          style={{ width: cardWidth }}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                          }}
                                        >
                                          {/* Timeline node/dot with ripple effect */}
                                          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                            <motion.div
                                              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 flex items-center justify-center shadow-lg cursor-pointer"
                                              whileHover={{
                                                scale: 1.2,
                                                boxShadow:
                                                  "0 0 15px rgba(59, 130, 246, 0.7)",
                                              }}
                                              whileTap={{ scale: 0.9 }}
                                              transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 10,
                                              }}
                                            >
                                              {/* Multiple ripple animations */}
                                              <motion.div
                                                className="absolute w-full h-full rounded-full bg-blue-400 opacity-60"
                                                animate={{
                                                  scale: [1, 1.8, 1],
                                                  opacity: [0.6, 0, 0.6],
                                                }}
                                                transition={{
                                                  duration: 2,
                                                  repeat: Infinity,
                                                  repeatType: "loop",
                                                  delay: index * 0.2,
                                                }}
                                              />
                                              <motion.div
                                                className="absolute w-full h-full rounded-full bg-blue-300 opacity-40"
                                                animate={{
                                                  scale: [1, 2.2, 1],
                                                  opacity: [0.4, 0, 0.4],
                                                }}
                                                transition={{
                                                  duration: 2.5,
                                                  repeat: Infinity,
                                                  repeatType: "loop",
                                                  delay: index * 0.2 + 0.3,
                                                }}
                                              />
                                              <span className="text-white font-bold text-sm">
                                                {day.day}
                                              </span>
                                            </motion.div>
                                          </div>

                                          {/* Animated connecting lines */}
                                          <motion.div
                                            className={`absolute left-1/2 transform -translate-x-1/2 w-px ${
                                              isEven
                                                ? "top-24 h-20 bg-gradient-to-b from-blue-500 to-blue-300"
                                                : "bottom-[calc(100%-24px)] h-20 bg-gradient-to-b from-blue-300 to-blue-500"
                                            } dark:from-blue-500 dark:to-blue-400`}
                                            initial={{ height: 0 }}
                                            animate={{ height: "80px" }}
                                            transition={{
                                              delay: index * 0.15,
                                              duration: 0.5,
                                            }}
                                          />

                                          {/* Content card with enhanced interactions */}
                                          <motion.div
                                            className={`w-full p-4 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-800/30 overflow-hidden ${
                                              isEven
                                                ? "mt-36"
                                                : "mb-36 transform translate-y-[-180px]"
                                            }`}
                                            initial={{
                                              y: isEven ? -20 : 20,
                                              opacity: 0,
                                              scale: 0.9,
                                            }}
                                            animate={{
                                              y: isEven ? 0 : -180,
                                              opacity: 1,
                                              scale: 1,
                                            }}
                                            transition={{
                                              delay: index * 0.15,
                                              duration: 0.6,
                                            }}
                                            whileHover={{
                                              scale: 1.05,
                                              boxShadow:
                                                "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                                              borderTopColor: "#3b82f6",
                                              borderTopWidth: "4px",
                                            }}
                                          >
                                            {/* Animated gradient border on hover */}
                                            <motion.div
                                              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0"
                                              initial={{ opacity: 0 }}
                                              whileHover={{ opacity: 0.1 }}
                                              style={{
                                                borderRadius: "inherit",
                                              }}
                                            />

                                            <div className="flex items-center mb-3 pb-2 border-b border-blue-100 dark:border-blue-800/50">
                                              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-2">
                                                <motion.div
                                                  whileHover={{ rotate: 360 }}
                                                  transition={{ duration: 0.5 }}
                                                >
                                                  <Calendar
                                                    size={16}
                                                    className="text-blue-600 dark:text-blue-400"
                                                  />
                                                </motion.div>
                                              </div>
                                              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                                                Day {day.day}
                                              </h3>
                                            </div>

                                            <div className="mb-3">
                                              <div className="flex items-start mb-2">
                                                <motion.div
                                                  whileHover={{ rotate: 15 }}
                                                  transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                  }}
                                                >
                                                  <BookOpen
                                                    size={16}
                                                    className="text-blue-500 dark:text-blue-400 mt-1 mr-2 flex-shrink-0"
                                                  />
                                                </motion.div>
                                                <div className="flex-1">
                                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                                                    Topics:
                                                  </h4>
                                                  <motion.ul
                                                    className="space-y-1 pl-1 text-gray-700 dark:text-gray-300 text-xs"
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={{
                                                      visible: {
                                                        transition: {
                                                          staggerChildren: 0.1,
                                                        },
                                                      },
                                                    }}
                                                  >
                                                    {day.topics &&
                                                    day.topics.length > 0 ? (
                                                      day.topics.map(
                                                        (topic, i) => (
                                                          <motion.li
                                                            key={i}
                                                            className="flex items-center"
                                                            variants={{
                                                              hidden: {
                                                                opacity: 0,
                                                                x: -10,
                                                              },
                                                              visible: {
                                                                opacity: 1,
                                                                x: 0,
                                                              },
                                                            }}
                                                            whileHover={{
                                                              x: 5,
                                                              color: "#3b82f6",
                                                            }}
                                                          >
                                                            <motion.div
                                                              className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 mr-1.5"
                                                              whileHover={{
                                                                scale: 2,
                                                              }}
                                                            ></motion.div>
                                                            {topic.topic ||
                                                              "Unnamed Topic"}
                                                          </motion.li>
                                                        ),
                                                      )
                                                    ) : (
                                                      <li className="flex items-center text-yellow-600 dark:text-yellow-400">
                                                        <div className="w-1 h-1 rounded-full bg-yellow-500 mr-1.5"></div>
                                                        No topics assigned
                                                      </li>
                                                    )}
                                                  </motion.ul>
                                                </div>
                                              </div>
                                            </div>

                                            {/* @ts-ignore */}
                                            {day.notes && (
                                              <motion.div
                                                className="flex items-start p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 text-xs overflow-hidden relative"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                  delay: index * 0.25,
                                                }}
                                              >
                                                <motion.div
                                                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                                                  initial={{
                                                    opacity: 0,
                                                    x: "-100%",
                                                  }}
                                                  whileHover={{
                                                    opacity: 0.3,
                                                    x: "100%",
                                                  }}
                                                  transition={{ duration: 0.8 }}
                                                />
                                                <AlertCircle
                                                  size={14}
                                                  className="text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                                                />
                                                <p className="line-clamp-2">
                                                  {day.notes}
                                                </p>
                                              </motion.div>
                                            )}

                                            <div className="mt-3 pt-2 border-t border-blue-100 dark:border-blue-800/50">
                                              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                                <span>Progress</span>
                                                <span>
                                                  {Math.floor(
                                                    ((index + 1) /
                                                      studyPlan.length) *
                                                      100,
                                                  )}
                                                  %
                                                </span>
                                              </div>
                                              <div className="mt-1 h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                                <motion.div
                                                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-300 rounded-full relative"
                                                  initial={{ width: 0 }}
                                                  animate={{
                                                    width: `${Math.floor(((index + 1) / studyPlan.length) * 100)}%`,
                                                  }}
                                                  transition={{
                                                    delay: index * 0.3,
                                                    duration: 0.8,
                                                  }}
                                                >
                                                  <motion.div
                                                    className="absolute right-0 top-0 bottom-0 w-4 bg-white/50"
                                                    animate={{
                                                      x: [10, -5, 10],
                                                      opacity: [0, 0.5, 0],
                                                    }}
                                                    transition={{
                                                      duration: 1.5,
                                                      repeat: Infinity,
                                                      repeatType: "loop",
                                                    }}
                                                  />
                                                </motion.div>
                                              </div>
                                            </div>
                                          </motion.div>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Enhanced navigation controls */}
                              </div>
                              {/* <HorizontalScrollButtons /> */}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

        
          </div>
        </div>
      </motion.div>
    </div>
  );
}
