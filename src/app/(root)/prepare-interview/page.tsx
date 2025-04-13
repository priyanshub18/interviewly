"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MeetingCard from "@/components/MeetingCard";
import UpcomingInterviews from "./_components/UpcomingInterviews";
import {
  AlertCircle,
  ArrowDownIcon,
  BookOpen,
  Calendar,
  Loader,
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

  const interviews = useQuery(api.interviews.getUpcomingInterviews);
  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: {
      scale: 0.97,
    },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Loader animation
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

  // Text fade animation
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
        staggerChildren: 0.05, // Reduced from 0.1 for faster appearance
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    //console.log("interviews", interviews);
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
  const getButtonText = () => {
    if (isLoading) return "Loading...";
    if (currentStep === totalSteps) return "Generate Plan";
    return "Next";
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
    //console.log("Study plan response:", data);
    if (data.error) {
      toast.error(data.error);
      setIsLoading(false);
      return;
    }
    setStudyPlan(data.study_plan);
    setPlanGenerated(true);

    setIsLoading(false);
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
    // @ts-ignore
    if (newSkill && !userSkills.includes(newSkill)) {
      // @ts-ignore
      setUserSkills([...userSkills, newSkill]);
      setNewSkill("");
    }
  };

  const addRequiredSkill = () => {
    // @ts-ignore
    if (newRequiredSkill && !requiredSkills.includes(newRequiredSkill)) {
      // @ts-ignore
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
          {/* Decorative elements */}
          <motion.div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-400/30 dark:bg-blue-900/30 mix-blend-soft-light blur-3xl opacity-60"
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
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-600/30 mix-blend-soft-light blur-3xl opacity-60"
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
            className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-700"
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
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-lg shadow-lg">
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
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2">
                    Prepare for Interview
                    <ArrowDownIcon className="size-5" />
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="border border-blue-200/20 dark:border-blue-300/20 text-blue-500 dark:text-blue-300 py-2 px-4 rounded-lg font-medium">
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
                  className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Progress bar */}
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 w-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-600"
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
                                  ? "bg-blue-500 dark:bg-blue-600 text-white"
                                  : currentStep === idx + 1
                                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
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
                          <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">
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
                      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
                        <motion.div
                          className="h-full bg-blue-500 dark:bg-blue-600"
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
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Job Information
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Let's start with some basic information about the
                            position you're applying for.
                          </p>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                              placeholder="e.g. Frontend Developer"
                              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
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
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Your Skills
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Enter the skills you currently possess
                          </p>

                          <div className="flex mb-4">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="e.g. React, JavaScript, UI Design"
                              className="flex-grow p-3 rounded-l-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                              onKeyDown={(e) =>
                                e.key === "Enter" && addUserSkill()
                              }
                            />
                            <button
                              onClick={addUserSkill}
                              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-r-md flex items-center justify-center"
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
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-full flex items-center"
                              >
                                <span className="text-sm text-gray-800 dark:text-white">
                                  {skill}
                                </span>
                                <button
                                  onClick={() =>
                                    setUserSkills(
                                      userSkills.filter((_, i) => i !== index),
                                    )
                                  }
                                  className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
                              <p className="text-gray-500 dark:text-gray-500 text-sm italic">
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
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Job Requirements
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
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
                              className="flex-grow p-3 rounded-l-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                              onKeyDown={(e) =>
                                e.key === "Enter" && addRequiredSkill()
                              }
                            />
                            <button
                              onClick={addRequiredSkill}
                              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-r-md flex items-center justify-center"
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
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-full flex items-center"
                              >
                                <span className="text-sm text-gray-800 dark:text-white">
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
                                  className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
                              <p className="text-gray-500 dark:text-gray-500 text-sm italic">
                                No required skills added yet
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
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Time Planning
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            How much time do you have to prepare for the
                            interview?
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 dark:text-gray-500">
                                  days
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 dark:text-gray-500">
                                  hours
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                              <AlertCircle
                                className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5"
                                size={18}
                              />
                              <div>
                                <p className="text-blue-800 dark:text-blue-300 text-sm">
                                  Your study plan will include {prepDays} days
                                  with {hoursPerDay} hours of focused
                                  preparation each day.
                                  {skillsToImprove.length > 0 && (
                                    <>
                                      <br />
                                      <span className="font-medium mt-1 inline-block">
                                        Skills to improve:{" "}
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
                    <div className="flex justify-between mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        className={`px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          currentStep === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={currentStep === 1}
                      >
                        Back
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        animate={isLoading ? "loading" : "initial"}
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`
        px-6 py-3 
        flex justify-center items-center gap-3 
        rounded-lg
        bg-blue-500 hover:bg-blue-600 
        dark:bg-blue-600 dark:hover:bg-blue-700 
        text-white font-medium
        transition-colors duration-300
        ${isLoading ? "cursor-not-allowed opacity-90" : "cursor-pointer"}
        shadow-md
      `}
                      >
                        {isLoading && (
                          <motion.div
                            variants={loaderVariants}
                            animate="animate"
                          >
                            <Loader className="h-5 w-5" />
                          </motion.div>
                        )}

                        <motion.span
                          key={getButtonText()}
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          {getButtonText()}
                        </motion.span>
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
                  className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.h2
                          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          Your Interview Prep Plan for {jobTitle}
                        </motion.h2>
                        <motion.p
                          className="text-gray-600 dark:text-gray-400 text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          {prepDays} days with {hoursPerDay} hours per day
                        </motion.p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-6 md:mt-0"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                          onClick={() => setPlanGenerated(false)}
                          className="px-6 py-3 rounded-lg text-blue-500 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium flex items-center gap-2"
                        >
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ rotate: [0, 15, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </motion.svg>
                          Edit Plan
                        </motion.button>
                      </motion.div>
                    </div>

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
                      >
                        <div className="flex flex-col items-center rounded-xl min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-200">
                          <div className="w-full max-w-4xl">
                            <div className="flex justify-center items-center mb-6">
                              <h1 className="text-3xl font-bold text-gray-800 text-center dark:text-gray-100">
                                Your {prepDays}-Days Study Plan
                              </h1>
                            </div>

                            <motion.div
                              className="relative"
                              variants={container}
                              initial="hidden"
                              animate="show"
                            >
                              {/* Timeline line */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400 dark:bg-blue-600" />

                              {studyPlan.map((day, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                  <motion.div
                                    key={day.day}
                                    variants={item}
                                    className={`flex items-center mb-6 relative ${isEven ? "justify-start" : "justify-end"}`}
                                  >
                                    {/* Timeline dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400 z-10 flex items-center justify-center">
                                      <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>

                                    {/* Content box */}
                                    <motion.div
                                      className={`w-5/12 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-blue-400 ${isEven ? "mr-auto" : "ml-auto"}`}
                                      whileHover={{ scale: 1.02 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                      }}
                                    >
                                      <div className="flex items-center mb-2">
                                        <Calendar
                                          size={18}
                                          className="text-blue-600 dark:text-blue-400 mr-2"
                                        />
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                          Day {day.day}
                                        </h3>
                                      </div>

                                      <div className="mb-2">
                                        <div className="flex items-start mb-1">
                                          <BookOpen
                                            size={16}
                                            className="text-blue-500 dark:text-blue-400 mt-1 mr-2"
                                          />
                                          <div>
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                              Topics:
                                            </h4>
                                            <ul className="list-disc list-inside pl-1 text-gray-600 dark:text-gray-400 text-sm">
                                              {day.topics &&
                                              day.topics.length > 0 ? (
                                                day.topics.map((topic, i) => (
                                                  <li key={i}>
                                                    {topic.topic ||
                                                      "Unnamed Topic"}
                                                  </li>
                                                ))
                                              ) : (
                                                <li className="text-yellow-600 dark:text-yellow-400">
                                                  No topics assigned
                                                </li>
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      {/* @ts-ignore */}
                                      {day.notes && (
                                        <div className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                                          <AlertCircle
                                            size={14}
                                            className="text-blue-400 dark:text-blue-300 mt-1 mr-2"
                                          />

                                          <p>{day.notes}</p>
                                        </div>
                                      )}
                                    </motion.div>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upcoming Interviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <UpcomingInterviews />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
