"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

// Main Quiz Creator Component
export default function SkillQuizCreator() {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    skillName: "",
    topics: [],
    currentTopic: "",
    questionType: "mixed",
    difficultyLevel: "medium",
    numberOfQuestions: 10,
    timeLimit: 15,
    description: "",
  });
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [sampleQuiz, setSampleQuiz] = useState([]);

  // Check user's preferred color scheme on component mount
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Add topic to the list
  const addTopic = () => {
    if (
      quizData.currentTopic.trim() !== "" &&
      !quizData.topics.includes(quizData.currentTopic.trim())
    ) {
      setQuizData({
        ...quizData,
        topics: [...quizData.topics, quizData.currentTopic.trim()],
        currentTopic: "",
      });
    }
  };

  // Remove topic from the list
  const removeTopic = (topicToRemove) => {
    setQuizData({
      ...quizData,
      topics: quizData.topics.filter((topic) => topic !== topicToRemove),
    });
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === 1 && quizData.skillName.trim() === "") {
      alert("Please enter a skill name");
      return;
    }

    if (step === 2 && quizData.topics.length === 0) {
      alert("Please add at least one topic");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      generateQuiz();
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Generate quiz
  const generateQuiz = () => {
    // In a real app, this would call an API to generate questions
    // For now, we'll create sample questions based on the topics
    const questions = quizData.topics
      .flatMap((topic) => {
        return [
          {
            topic: topic,
            question: `What is the most important concept in ${topic}?`,
            type: "objective",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
          },
          {
            topic: topic,
            question: `Explain the significance of ${topic} in ${quizData.skillName}.`,
            type: "subjective",
            sampleAnswer: `This is a sample answer about the significance of ${topic} in ${quizData.skillName}.`,
          },
        ];
      })
      .slice(0, quizData.numberOfQuestions);

    setSampleQuiz(questions);
    setQuizGenerated(true);
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuizGenerated(false);
    setStep(1);
    setQuizData({
      skillName: "",
      topics: [],
      currentTopic: "",
      questionType: "mixed",
      difficultyLevel: "medium",
      numberOfQuestions: 10,
      timeLimit: 15,
      description: "",
    });
    setSampleQuiz([]);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"}`}
    >
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with theme toggle */}
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className={`text-4xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              >
                Skill Quiz Creator
              </h1>
              <p
                className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Create personalized quizzes to enhance any skill
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-3 rounded-full ${darkMode ? "bg-gray-800 text-yellow-300" : "bg-white text-blue-600 shadow-md"}`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {!quizGenerated ? (
              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
                key="quiz-creator"
              >
                {/* Progress indicator */}
                <div
                  className={`px-8 pt-6 pb-4 ${darkMode ? "border-b border-gray-700" : "border-b border-gray-200"}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    {[1, 2, 3].map((num) => (
                      <motion.div
                        key={num}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{
                          scale: step === num ? 1 : 0.8,
                          opacity: step === num ? 1 : 0.5,
                        }}
                        className="flex flex-col items-center relative"
                      >
                        <motion.div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            step === num
                              ? darkMode
                                ? "bg-blue-500 text-white"
                                : "bg-blue-600 text-white"
                              : darkMode
                                ? "bg-gray-700 text-gray-400"
                                : "bg-gray-200 text-gray-600"
                          }`}
                          whileHover={step !== num ? { scale: 1.1 } : {}}
                          whileTap={step !== num ? { scale: 0.95 } : {}}
                          onClick={() => num < step && setStep(num)}
                        >
                          {num}
                          {step > num && (
                            <motion.div
                              className="absolute -right-1 -top-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              ✓
                            </motion.div>
                          )}
                        </motion.div>
                        <span
                          className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                          {num === 1
                            ? "Basic Info"
                            : num === 2
                              ? "Topics"
                              : "Details"}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="w-full bg-gray-300 h-1 mt-4 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.div variants={itemVariants} className="mb-6">
                          <label
                            className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                          >
                            Skill Name
                          </label>
                          <input
                            type="text"
                            name="skillName"
                            value={quizData.skillName}
                            onChange={handleInputChange}
                            placeholder="e.g. JavaScript Programming, Public Speaking"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                              darkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-800"
                            }`}
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-4">
                          <label
                            className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                          >
                            Description (Optional)
                          </label>
                          <textarea
                            name="description"
                            value={quizData.description}
                            onChange={handleInputChange}
                            placeholder="Describe what this quiz will cover..."
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 h-32 ${
                              darkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-800"
                            }`}
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.div variants={itemVariants} className="mb-6">
                          <label
                            className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                          >
                            Add Topics
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="currentTopic"
                              value={quizData.currentTopic}
                              onChange={handleInputChange}
                              placeholder="e.g. Variables, Functions, Arrays"
                              className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                              onKeyPress={(e) =>
                                e.key === "Enter" && addTopic()
                              }
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={addTopic}
                              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                                darkMode
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                            >
                              <Plus size={18} className="mr-1" />
                              Add
                            </motion.button>
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <div className="mb-4">
                            <h3
                              className={`font-medium mb-3 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Selected Topics:
                            </h3>
                            {quizData.topics.length === 0 ? (
                              <p
                                className={`italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
                                No topics added yet
                              </p>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {quizData.topics.map((topic, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`px-3 py-1 rounded-full flex items-center transition-colors duration-300 ${
                                      darkMode
                                        ? "bg-blue-900 text-blue-200"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    <span>{topic}</span>
                                    <motion.button
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.8 }}
                                      onClick={() => removeTopic(topic)}
                                      className="ml-2 flex items-center justify-center w-5 h-5 rounded-full bg-opacity-30 hover:bg-opacity-50 transition-colors"
                                    >
                                      <X size={14} />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div variants={itemVariants} className="mb-4">
                            <label
                              className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Question Type
                            </label>
                            <select
                              name="questionType"
                              value={quizData.questionType}
                              onChange={handleInputChange}
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            >
                              <option value="objective">
                                Objective (Multiple Choice)
                              </option>
                              <option value="subjective">
                                Subjective (Written Answers)
                              </option>
                              <option value="mixed">Mixed</option>
                            </select>
                          </motion.div>

                          <motion.div variants={itemVariants} className="mb-4">
                            <label
                              className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Difficulty Level
                            </label>
                            <select
                              name="difficultyLevel"
                              value={quizData.difficultyLevel}
                              onChange={handleInputChange}
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="medium">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </motion.div>

                          <motion.div variants={itemVariants} className="mb-4">
                            <label
                              className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Number of Questions
                            </label>
                            <input
                              type="number"
                              name="numberOfQuestions"
                              value={quizData.numberOfQuestions}
                              onChange={handleInputChange}
                              min="5"
                              max="50"
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            />
                          </motion.div>

                          <motion.div variants={itemVariants} className="mb-4">
                            <label
                              className={`block font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Time Limit (minutes)
                            </label>
                            <input
                              type="number"
                              name="timeLimit"
                              value={quizData.timeLimit}
                              onChange={handleInputChange}
                              min="5"
                              max="120"
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePreviousStep}
                      disabled={step === 1}
                      className={`px-6 py-2 rounded-lg flex items-center transition-colors duration-300 ${
                        step === 1
                          ? darkMode
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      <ChevronLeft size={18} className="mr-1" />
                      Previous
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextStep}
                      className={`px-6 py-2 rounded-lg flex items-center transition-colors duration-300 ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {step < 3 ? (
                        <>
                          Next
                          <ChevronRight size={18} className="ml-1" />
                        </>
                      ) : (
                        "Generate Quiz"
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz-result"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
              >
                <div
                  className={`px-6 py-5 flex justify-between items-center ${darkMode ? "border-b border-gray-700" : "border-b border-gray-200"}`}
                >
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                      {quizData.skillName} Quiz
                    </motion.h2>
                    <p
                      className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Ready to test your knowledge
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`text-sm px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {quizData.difficultyLevel}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`text-sm px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {quizData.numberOfQuestions} questions
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`text-sm px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {quizData.timeLimit} minutes
                    </motion.span>
                  </div>
                </div>

                <div className="p-6">
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3
                      className={`font-medium mb-3 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Topics Covered:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {quizData.topics.map((topic, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`px-3 py-1 rounded-full ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {topic}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-6">
                    <h3
                      className={`font-medium mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Sample Questions:
                    </h3>
                    <div className="space-y-4">
                      {sampleQuiz.slice(0, 3).map((question, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ scale: 1.01 }}
                          className={`p-5 border rounded-lg transition-all duration-300 ${
                            darkMode
                              ? "border-gray-700 hover:border-blue-700 bg-gray-800 hover:bg-gray-750"
                              : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span
                              className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}
                            >
                              Topic: {question.topic}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                question.type === "objective"
                                  ? darkMode
                                    ? "bg-purple-900 text-purple-200"
                                    : "bg-purple-100 text-purple-800"
                                  : darkMode
                                    ? "bg-green-900 text-green-200"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {question.type === "objective"
                                ? "Multiple Choice"
                                : "Written Answer"}
                            </span>
                          </div>
                          <p
                            className={`font-medium mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}
                          >
                            {index + 1}. {question.question}
                          </p>

                          {question.type === "objective" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                              {question.options.map((option, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={{ scale: 1.02 }}
                                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                                    darkMode
                                      ? "hover:bg-gray-700"
                                      : "hover:bg-blue-50"
                                  }`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                      darkMode
                                        ? "border-blue-500"
                                        : "border-blue-500"
                                    }`}
                                  >
                                    <div className="w-3 h-3 rounded-full bg-transparent"></div>
                                  </div>
                                  <label
                                    className={`cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    {option}
                                  </label>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {question.type === "subjective" && (
                            <textarea
                              placeholder="Type your answer here..."
                              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 h-24 mt-3 ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-800"
                              }`}
                            />
                          )}
                        </motion.div>
                      ))}

                      {sampleQuiz.length > 3 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className={`text-center italic py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          ...and {sampleQuiz.length - 3} more questions
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetQuiz}
                      className={`px-6 py-3 rounded-lg transition-colors duration-300 ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      Create New Quiz
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-lg flex items-center transition-colors duration-300 ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Start Quiz
                      <ChevronRight size={18} className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <QuizInterface
            darkMode={darkMode}
            quizData={quizData}
            onExit={() => false}
          />
          {/* Footer information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-6 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            <p>
              Customize your quiz experience with personalized settings and
              topics.
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} Skill Quiz Creator
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import {
  Clock,
  CheckCircle,
  XCircle,
  Award,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

// Quiz Interface Component - shown after clicking "Start Quiz"
 function QuizInterface({ darkMode = false, quizData, onExit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(quizData.timeLimit * 60); // in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const timerRef = useRef(null);

  const questions = quizData.sampleQuiz || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Timer setup
  useEffect(() => {
    if (timerActive && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, quizCompleted]);

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (currentQuestion.type === "objective" && selectedOption === null) return;
    if (currentQuestion.type === "subjective" && writtenAnswer.trim() === "")
      return;

    setIsAnswered(true);
    setShowFeedback(true);

    // For objective questions, check if the answer is correct
    if (currentQuestion.type === "objective") {
      const correct = selectedOption === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore((prev) => prev + 1);
    } else {
      // For subjective questions, just acknowledge the answer
      setIsCorrect(true); // We won't grade subjective answers in this demo
      setScore((prev) => prev + 1);
    }

    // Hide feedback after a delay
    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      endQuiz();
    }
  };

  // Move to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      resetQuestionState();
    }
  };

  // Reset question state
  const resetQuestionState = () => {
    setSelectedOption(null);
    setWrittenAnswer("");
    setIsAnswered(false);
    setIsCorrect(null);
  };

  // End the quiz
  const endQuiz = () => {
    setTimerActive(false);
    clearInterval(timerRef.current);
    setQuizCompleted(true);
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    resetQuestionState();
    setScore(0);
    setRemainingTime(quizData.timeLimit * 60);
    setQuizCompleted(false);
    setTimerActive(true);
  };

  // Calculate progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  // Time warning threshold
  const isTimeWarning = remainingTime <= 60; // Warning when less than 60 seconds remain

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"}`}
    >
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {!quizCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="quiz-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
              >
                {/* Header with timer and quiz info */}
                <div
                  className={`px-6 py-4 flex justify-between items-center ${
                    darkMode
                      ? "border-b border-gray-700"
                      : "border-b border-gray-200"
                  }`}
                >
                  <div>
                    <h2
                      className={`text-xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                      {quizData.skillName} Quiz
                    </h2>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                  </div>

                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isTimeWarning
                        ? darkMode
                          ? "bg-red-900 text-red-200"
                          : "bg-red-100 text-red-800"
                        : darkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                    }`}
                    animate={
                      isTimeWarning
                        ? {
                            scale: [1, 1.05, 1],
                            transition: { repeat: Infinity, duration: 1.5 },
                          }
                        : {}
                    }
                  >
                    <Clock
                      size={18}
                      className={isTimeWarning ? "text-red-500" : ""}
                    />
                    <span className="font-mono text-lg font-medium">
                      {formatTime(remainingTime)}
                    </span>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <div
                  className={`w-full h-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                >
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: `${progressPercentage}%` }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question content */}
                <div className="p-6">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}
                      >
                        Topic: {currentQuestion?.topic}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          currentQuestion?.type === "objective"
                            ? darkMode
                              ? "bg-purple-900 text-purple-200"
                              : "bg-purple-100 text-purple-800"
                            : darkMode
                              ? "bg-green-900 text-green-200"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {currentQuestion?.type === "objective"
                          ? "Multiple Choice"
                          : "Written Answer"}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-medium mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}
                    >
                      {currentQuestion?.question}
                    </h3>

                    {/* Answer options */}
                    {currentQuestion?.type === "objective" ? (
                      <div className="space-y-3 mt-4">
                        {currentQuestion?.options.map((option, index) => (
                          <motion.div
                            key={index}
                            whileHover={!isAnswered ? { scale: 1.02 } : {}}
                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                            onClick={() => handleOptionSelect(option)}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                              selectedOption === option
                                ? isAnswered
                                  ? isCorrect
                                    ? darkMode
                                      ? "border-green-500 bg-green-900 bg-opacity-20"
                                      : "border-green-500 bg-green-50"
                                    : darkMode
                                      ? "border-red-500 bg-red-900 bg-opacity-20"
                                      : "border-red-500 bg-red-50"
                                  : darkMode
                                    ? "border-blue-500 bg-blue-900 bg-opacity-20"
                                    : "border-blue-500 bg-blue-50"
                                : darkMode
                                  ? "border-gray-700 hover:border-gray-600"
                                  : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                  selectedOption === option
                                    ? isAnswered
                                      ? isCorrect
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                      : darkMode
                                        ? "bg-blue-500 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                      ? "border border-gray-500"
                                      : "border border-gray-400"
                                }`}
                              >
                                {selectedOption === option &&
                                  isAnswered &&
                                  (isCorrect ? (
                                    <CheckCircle size={16} />
                                  ) : (
                                    <XCircle size={16} />
                                  ))}
                                {selectedOption === option && !isAnswered && (
                                  <motion.div className="w-3 h-3 rounded-full bg-white" />
                                )}
                              </div>
                              <span
                                className={
                                  darkMode ? "text-gray-200" : "text-gray-800"
                                }
                              >
                                {option}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <textarea
                          value={writtenAnswer}
                          onChange={(e) => setWrittenAnswer(e.target.value)}
                          disabled={isAnswered}
                          placeholder="Type your answer here..."
                          className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 h-32 ${
                            isAnswered
                              ? darkMode
                                ? "bg-gray-700 border-green-500 text-white"
                                : "bg-green-50 border-green-500 text-gray-800"
                              : darkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                        />
                      </div>
                    )}

                    {/* Feedback animation */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`mt-6 p-4 rounded-lg ${
                            isCorrect
                              ? darkMode
                                ? "bg-green-900 text-green-200"
                                : "bg-green-100 text-green-800"
                              : darkMode
                                ? "bg-red-900 text-red-200"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          <div className="flex items-center">
                            {isCorrect ? (
                              <CheckCircle size={20} className="mr-2" />
                            ) : (
                              <XCircle size={20} className="mr-2" />
                            )}
                            <span className="font-medium">
                              {isCorrect ? "Correct!" : "Incorrect!"}
                            </span>
                          </div>
                          {!isCorrect &&
                            currentQuestion?.type === "objective" && (
                              <p className="mt-2">
                                The correct answer is:{" "}
                                {currentQuestion.correctAnswer}
                              </p>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`px-5 py-2 rounded-lg flex items-center ${
                        currentQuestionIndex === 0
                          ? darkMode
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      <ChevronLeft size={18} className="mr-1" />
                      Previous
                    </motion.button>

                    {!isAnswered ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmitAnswer}
                        disabled={
                          (currentQuestion?.type === "objective" &&
                            selectedOption === null) ||
                          (currentQuestion?.type === "subjective" &&
                            writtenAnswer.trim() === "")
                        }
                        className={`px-5 py-2 rounded-lg ${
                          (currentQuestion?.type === "objective" &&
                            selectedOption === null) ||
                          (currentQuestion?.type === "subjective" &&
                            writtenAnswer.trim() === "")
                            ? darkMode
                              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : darkMode
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Submit Answer
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextQuestion}
                        className={`px-5 py-2 rounded-lg flex items-center ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {currentQuestionIndex < questions.length - 1 ? (
                          <>
                            Next Question
                            <ChevronRight size={18} className="ml-1" />
                          </>
                        ) : (
                          "Finish Quiz"
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                key="quiz-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-xl shadow-lg overflow-hidden ${
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
              >
                <div
                  className={`p-8 text-center ${
                    darkMode
                      ? "border-b border-gray-700"
                      : "border-b border-gray-200"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-6"
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center ${
                        score / questions.length >= 0.7
                          ? darkMode
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                          : score / questions.length >= 0.4
                            ? darkMode
                              ? "bg-yellow-900 text-yellow-200"
                              : "bg-yellow-100 text-yellow-800"
                            : darkMode
                              ? "bg-red-900 text-red-200"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      <Award size={48} />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Quiz Completed!
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <p
                      className={`text-lg mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Your Score
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <span
                        className={`text-4xl font-bold ${
                          score / questions.length >= 0.7
                            ? darkMode
                              ? "text-green-400"
                              : "text-green-600"
                            : score / questions.length >= 0.4
                              ? darkMode
                                ? "text-yellow-400"
                                : "text-yellow-600"
                              : darkMode
                                ? "text-red-400"
                                : "text-red-600"
                        }`}
                      >
                        {score}
                      </span>
                      <span
                        className={`text-2xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        / {questions.length}
                      </span>
                    </div>
                    <p
                      className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {score / questions.length >= 0.7
                        ? "Excellent work!"
                        : score / questions.length >= 0.4
                          ? "Good effort!"
                          : "Keep practicing!"}
                    </p>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3
                    className={`font-medium mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Performance Summary:
                  </h3>

                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between mb-3">
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        Accuracy
                      </span>
                      <span
                        className={`font-medium ${
                          score / questions.length >= 0.7
                            ? darkMode
                              ? "text-green-400"
                              : "text-green-600"
                            : score / questions.length >= 0.4
                              ? darkMode
                                ? "text-yellow-400"
                                : "text-yellow-600"
                              : darkMode
                                ? "text-red-400"
                                : "text-red-600"
                        }`}
                      >
                        {Math.round((score / questions.length) * 100)}%
                      </span>
                    </div>

                    <div
                      className={`h-2 rounded-full overflow-hidden ${
                        darkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(score / questions.length) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className={`h-full ${
                          score / questions.length >= 0.7
                            ? "bg-green-500"
                            : score / questions.length >= 0.4
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div
                      className={`text-center px-4 py-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Time Spent
                      </p>
                      <p
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
                      >
                        {formatTime(quizData.timeLimit * 60 - remainingTime)}
                      </p>
                    </div>

                    <div
                      className={`text-center px-4 py-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Questions
                      </p>
                      <p
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
                      >
                        {questions.length}
                      </p>
                    </div>

                    <div
                      className={`text-center px-4 py-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Topics
                      </p>
                      <p
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
                      >
                        {quizData.topics.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onExit}
                      className={`px-5 py-2 rounded-lg flex items-center ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      <ArrowLeft size={18} className="mr-1" />
                      Exit Quiz
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={restartQuiz}
                      className={`px-5 py-2 rounded-lg flex items-center ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <RefreshCw size={18} className="mr-1" />
                      Retry Quiz
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
