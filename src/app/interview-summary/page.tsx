"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  User,
  Users,
  MessageSquare,
  Check,
  FileText,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewSummary() {
  const [interviewData, setInterviewData] = useState({
    creationTime: 1744556239099.4805,
    id: "j971fg7x6ct1m83cvfec6krh417dzt21",
    candidateId: "user_2vgA8Cy9Q2ix9ggYfIyHDs5E9iy",
    description: "new interview",
    endTime: 1744556331843,
    interviewerIds: ["user_2vbQ6Ly1NtfBhUjeQx2LqqehwJ5"],
    questions: ["two-sum", "regular-expression-matching"],
    startTime: 1744552800627,
    status: "completed",
    streamCallId: "72ffa3d2-2595-42a7-8d37-2851a59d3ceb",
    title: "MicroSoft",
  });

  const [candidateInfo, setCandidateInfo] = useState(null);
  const [interviewerInfo, setInterviewerInfo] = useState(null);
  const [callRecording, setCallRecording] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format the time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate interview duration in minutes
  const calculateDuration = () => {
    const duration = (interviewData.endTime - interviewData.startTime) / 60000; // convert ms to minutes
    return Math.round(duration);
  };

  // Mock function to fetch candidate info
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      setCandidateInfo({
        name: "Jane Doe",
        email: "jane.doe@example.com",
        position: "Senior Software Engineer",
        experience: "5 years",
      });
    }, 500);
  }, [interviewData.candidateId]);

  // Mock function to fetch interviewer info
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      setInterviewerInfo({
        name: "John Smith",
        position: "Tech Lead",
        company: "Microsoft",
        department: "Cloud Computing Division",
      });
    }, 700);
  }, [interviewData.interviewerIds]);

  // Mock function to fetch call recording
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      setCallRecording({
        url: "https://example.com/recordings/72ffa3d2-2595-42a7-8d37-2851a59d3ceb",
        duration: calculateDuration() + " minutes",
      });
    }, 600);
  }, [interviewData.streamCallId]);

  // Check system preference for dark mode
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Get the status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return darkMode
          ? "bg-green-900 text-green-100"
          : "bg-green-100 text-green-800";
      case "scheduled":
        return darkMode
          ? "bg-blue-900 text-blue-100"
          : "bg-blue-100 text-blue-800";
      case "cancelled":
        return darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-800";
      default:
        return darkMode
          ? "bg-gray-700 text-gray-100"
          : "bg-gray-100 text-gray-800";
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-300`}>
      <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-blue-100 text-blue-800"}`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          <motion.div
            className={`rounded-xl shadow-xl p-6 dark:bg-gray-800 bg-white`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div
              className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700"
              variants={itemVariants}
            >
              <div>
                <h1 className="text-3xl font-bold dark:text-white text-gray-800">
                  {interviewData.title} Interview
                </h1>
                <p className="dark:text-gray-300 text-gray-600">
                  {interviewData.description}
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(interviewData.status)}`}
                >
                  {interviewData.status.charAt(0).toUpperCase() +
                    interviewData.status.slice(1)}
                </span>
              </motion.div>
            </motion.div>

            {/* Main content - 2 columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Interview Details */}
              <div className="space-y-6">
                <motion.div
                  className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  variants={cardVariants}
                >
                  <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                    Interview Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar
                        className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                      />
                      <span className="dark:text-gray-300 text-gray-700">
                        {formatDate(interviewData.startTime)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock
                        className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                      />
                      <span className="dark:text-gray-300 text-gray-700">
                        {formatTime(interviewData.startTime)} -{" "}
                        {formatTime(interviewData.endTime)}(
                        {calculateDuration()} minutes)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare
                        className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                      />
                      <span className="dark:text-gray-300 text-gray-700">
                        ID: {interviewData.id.substring(0, 8)}...
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Candidate Information */}
                <AnimatePresence>
                  {candidateInfo ? (
                    <motion.div
                      key="candidate-info"
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Candidate
                      </h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User
                            className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                          />
                          <span className="dark:text-gray-300 text-gray-700">
                            {candidateInfo.name}
                          </span>
                        </div>
                        <p className="dark:text-gray-400 text-gray-600 ml-7">
                          {candidateInfo.email}
                        </p>
                        <p className="dark:text-gray-400 text-gray-600 ml-7">
                          {candidateInfo.position}
                        </p>
                        <p className="dark:text-gray-400 text-gray-600 ml-7">
                          {candidateInfo.experience} of experience
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Candidate
                      </h2>
                      <div className="flex items-center justify-center h-24">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className={`w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interviewer Information */}
                <AnimatePresence>
                  {interviewerInfo ? (
                    <motion.div
                      key="interviewer-info"
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Interviewer
                      </h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Users
                            className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                          />
                          <span className="dark:text-gray-300 text-gray-700">
                            {interviewerInfo.name}
                          </span>
                        </div>
                        <p className="dark:text-gray-400 text-gray-600 ml-7">
                          {interviewerInfo.position}
                        </p>
                        <p className="dark:text-gray-400 text-gray-600 ml-7">
                          {interviewerInfo.company},{" "}
                          {interviewerInfo.department}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Interviewer
                      </h2>
                      <div className="flex items-center justify-center h-24">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className={`w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right column - Questions and Recording */}
              <div className="space-y-6">
                {/* Questions */}
                <motion.div
                  className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  variants={cardVariants}
                >
                  <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                    Coding Questions
                  </h2>
                  <motion.ul className="space-y-3" variants={containerVariants}>
                    {interviewData.questions.map((question, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <Check
                          className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-500"} mr-2 mt-0.5`}
                        />
                        <div>
                          <span className="dark:text-gray-300 text-gray-700 font-medium">
                            {question
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </span>
                          <p className="dark:text-gray-400 text-gray-500 text-sm">
                            LeetCode Algorithm Challenge
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                {/* Recording */}
                <AnimatePresence>
                  {callRecording ? (
                    <motion.div
                      key="recording-info"
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Recording
                      </h2>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FileText
                            className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`}
                          />
                          <span className="dark:text-gray-300 text-gray-700">
                            Call Recording ({callRecording.duration})
                          </span>
                        </div>
                        <motion.button
                          className={`w-full ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 px-4 rounded transition duration-200`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Play Recording
                        </motion.button>
                        <motion.button
                          className={`w-full border ${darkMode ? "border-blue-500 text-blue-400 hover:bg-blue-900" : "border-blue-500 text-blue-500 hover:bg-blue-50"} py-2 px-4 rounded transition duration-200`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Download Recording
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      variants={cardVariants}
                    >
                      <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                        Recording
                      </h2>
                      <div className="flex items-center justify-center h-24">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className={`w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                  className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  variants={cardVariants}
                >
                  <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
                    Actions
                  </h2>
                  <div className="space-y-3">
                    <motion.button
                      className={`w-full ${darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white py-2 px-4 rounded transition duration-200`}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Generate Interview Report
                    </motion.button>
                    <motion.button
                      className={`w-full ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 px-4 rounded transition duration-200`}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Review Code Submissions
                    </motion.button>
                    <motion.button
                      className={`w-full border ${darkMode ? "border-gray-500 text-gray-300 hover:bg-gray-600" : "border-gray-300 text-gray-700 hover:bg-gray-100"} py-2 px-4 rounded transition duration-200`}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Schedule Follow-up
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              className="mt-6 pt-4 border-t dark:border-gray-700 dark:text-gray-400 text-gray-500 text-sm text-center"
              variants={itemVariants}
            >
              Interview created on {formatDate(interviewData.creationTime)} at{" "}
              {formatTime(interviewData.creationTime)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
