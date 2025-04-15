"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  BookOpen,
  Timer,
  Award,
  AlignLeft,
  CheckCircle,
  XCircle,
  Moon,
  Sun,
  Lightbulb,
  Play,
  ChevronLeft,
  Brain,
  Smile,
  LineChart,
  Zap,
  Clock,
  Lock,
  BarChart,
  AlertCircle,
  PlusCircle,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import QuizLoader from "./_components/QuizLoader";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { title } from "process";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useSavingToast } from "./_components/useSavingToast";
import { useRouter } from "next/navigation";

export default function QuizUI() {
  const { user } = useUser();
  const [answerTrackingData, setAnswerTrackingData] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [currentStep, setCurrentStep] = useState(0);
  const [quizConfig, setQuizConfig] = useState({
    topic: "",
    difficulty: "",
    questionType: "",
    numberOfQuestions: 5,
    timePerQuestion: 45,
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45); // Default time per question
  const [isSaving, setIsSaving] = useState(false);
  const [savedQuizData, setSavedQuizData] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState({
    score: 0,
    totalTime: 0,
    questionTimes: [],
    answers: [],
  });
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, SetSaveSuccess] = useState(false);
  const timerRef = useRef(null);
  const questionStartTimeRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [demoQuestions, setDemoQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
    },
  ]);
  // Add this function to calculate time spent
  const calculateTimeSpent = () => {
    const endTime = Date.now();
    const timeSpentInSeconds = Math.round((endTime - questionStartTime) / 1000);
    const minutes = Math.floor(timeSpentInSeconds / 60);
    const seconds = timeSpentInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  //     ).length;
  //     const incorrectAnswers = quizResults.answers.filter(
  //       (ans) => ans && !ans.isCorrect,
  //     ).length;
  //     const skippedAnswers = quizResults.answers.filter(
  //       (ans) => ans === null,
  //     ).length;
  //     const scorePercentage = Math.round(
  //       (correctAnswers / demoQuestions.length) * 100,
  //     );

  //     let questionAnalysis; // Identify strong and weak areas
  //     const keywordPerformance = {};
  //     questionAnalysis.forEach((item) => {
  //       item.keywords.forEach((keyword) => {
  //         if (!keywordPerformance[keyword]) {
  //           keywordPerformance[keyword] = { correct: 0, total: 0 };
  //         }
  //         keywordPerformance[keyword].total++;
  //         if (item.isCorrect) keywordPerformance[keyword].correct++;
  //       });
  //     });

  //     // Filter for keywords with at least 2 occurrences
  //     let strongAreas, weakAreas;
  //     // Generate badges based on performance
  //     const badges = [];
  //     if (scorePercentage >= 90) badges.push("Expert");
  //     else if (scorePercentage >= 75) badges.push("Proficient");
  //     else if (scorePercentage >= 50) badges.push("Intermediate");
  //     else badges.push("Beginner");

  //     if (quizResults.totalTime / demoQuestions.length < 15)
  //       badges.push("Speed Demon");
  //     if (correctAnswers === demoQuestions.length) badges.push("Perfect Score");
  //     if (quizConfig.difficulty === "hard") badges.push("Challenger");

  //     const totalTimeFormatted = formatTime(quizResults.totalTime);

  //     const questionsData = demoQuestions.map((q, idx) => {
  //       const answer = quizResults.answers[idx];
  //       return {
  //         id: `q-${idx + 1}`,
  //         question: q.question,
  //         yourAnswer: answer ? q.options[answer.selectedAnswer] : "Skipped",
  //         correctAnswer: q.options[q.correct],
  //         isCorrect: answer ? answer.isCorrect : false,
  //         timeSpent: formatTime(quizResults.questionTimes[idx] || 0),
  //       };
  //     });

  //     const recommendedResources = [];

  //     // Create the quiz record
  //     const quizRecord = {
  //       userId: user.id, // Replace with actual user ID from auth
  //       quizId: `quiz-${Date.now()}`,
  //       title: `${quizConfig.topic} Quiz`,
  //       category: quizConfig.topic,
  //       description: `A ${quizConfig.difficulty} level quiz on ${quizConfig.topic} with ${demoQuestions.length} questions`,
  //       totalQuestions: demoQuestions.length,
  //       // badges,
  //       // strongAreas,
  //       // weakAreas,
  //       attempts: 1,
  //       attemptsHistory: [
  //         {
  //           attemptId: 1,
  //           completedOn: new Date().toISOString(),
  //           score: scorePercentage,
  //           correctAnswers,
  //           incorrectAnswers,
  //           skippedAnswers,
  //           timeSpent: totalTimeFormatted,
  //           questions: questionsData,
  //         },
  //       ],
  //       // recommendedResources,
  //     };

  //     console.log("Saving quiz to database:", quizRecord);

  //     setSavedQuizData(quizRecord);
  //     setIsSaving(false);
  //     toast.success("Quiz results saved successfully!");
  //     return quizRecord;
  //   } catch (error) {
  //     console.error("Error saving quiz results:", error);
  //     toast.error("Failed to save quiz results");
  //     setIsSaving(false);
  //     return null;
  //   }
  // };

  const addToDB = useMutation(api.quizzes.saveQuizRecord);
  const { startSaving, endSaving } = useSavingToast();
  const saveQuizToDB = async () => {
    try {
      setIsSaving(true);
      startSaving();
      const correctAnswers = quizResults.answers.filter(
        (ans) => ans && ans.isCorrect,
      ).length;
      const incorrectAnswers = quizResults.answers.filter(
        (ans) => ans && !ans.isCorrect,
      ).length;
      const skippedAnswers = quizResults.answers.filter(
        (ans) => ans === null,
      ).length;

      const scorePercentage = Math.round(
        (correctAnswers / demoQuestions.length) * 100,
      );
      const totalTimeFormatted = formatTime(quizResults.totalTime);

      let badges = [];

      if (scorePercentage >= 90) badges.push("Expert");
      else if (scorePercentage >= 75) badges.push("Proficient");
      else if (scorePercentage >= 50) badges.push("Intermediate");
      else badges.push("Beginner");

      if (quizResults.totalTime / demoQuestions.length < 15)
        badges.push("Speed Demon");
      if (correctAnswers === demoQuestions.length) badges.push("Perfect Score");
      if (quizConfig.difficulty === "hard") badges.push("Challenger");

      const questionsData = demoQuestions.map((q, idx) => {
        const answer = quizResults.answers[idx];
        return {
          id: `q-${idx + 1}`,
          question: q.question,
          yourAnswer: answer ? q.options[answer.selectedAnswer] : "Skipped",
          correctAnswer: q.options[q.correct],
          isCorrect: answer ? answer.isCorrect : false,
          timeSpent: formatTime(quizResults.questionTimes[idx] || 0),
        };
      });

      const req_body = {
        quizId: `quiz-${Date.now()}`,
        title: `${quizConfig.topic} Quiz`,
        category: quizConfig.topic,
        description: `A ${quizConfig.difficulty} level quiz on ${quizConfig.topic} with ${demoQuestions.length} questions`,
        totalQuestions: demoQuestions.length,
        attempts: 1,
        attemptsHistory: [
          {
            attemptId: 1,
            completedOn: new Date().toISOString(),
            score: scorePercentage,
            correctAnswers,
            incorrectAnswers,
            skippedAnswers,
            timeSpent: totalTimeFormatted,
            questions: questionsData,
          },
        ],
      };

      const res = await axios.post("/api/get-user-personal", req_body);
      console.log("Response from get-user-personal:", res.data);
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      const strongAreas = res.data.strong_topics || [];
      const weakAreas = res.data.weak_topics || [];
      const recommendedResources = res.data.study_materials || [];

      badges = [...badges, ...(res.data.badges?.map((b) => b.title) || [])];

      const quizRecord = {
        userId: user.id,
        quizId: req_body.quizId,
        title: req_body.title,
        category: req_body.category,
        description: req_body.description,
        totalQuestions: req_body.totalQuestions,
        totalTime: quizResults.totalTime,
        badges,
        strongAreas,
        weakAreas,
        attempts: 1,
        attemptsHistory: req_body.attemptsHistory,
        recommendedResources,
      };

      const dbres = await addToDB(quizRecord);
      setSavedQuizData(quizRecord);
      setIsSaving(false);
      SetSaveSuccess(true);
      endSaving(true);
      return quizRecord;
    } catch (error) {
      console.error("Error saving quiz results:", error);
      toast.error("Failed to save quiz results");
      setIsSaving(false);
      SetSaveSuccess(false);
      endSaving(false);
      return null;
    }
  };
  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };
  const router = useRouter();

  const difficulties = ["easy", "medium", "hard"];
  const questionTypes = ["multiple-choice", "true-false"];

  // Initialize timer when question changes
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      // Set time per question based on difficulty
      let timeLimit = quizConfig.timePerQuestion;
      if (quizConfig.difficulty === "easy") timeLimit = 15;
      if (quizConfig.difficulty === "medium") timeLimit = 25;
      if (quizConfig.difficulty === "hard") timeLimit = 35;

      setTimeLeft(timeLimit);

      questionStartTimeRef.current = Date.now();

      // Clear any existing timer
      if (timerRef.current) clearInterval(timerRef.current);

      // Start new timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up - auto-select no answer and move to next
            clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestion, quizStarted, quizFinished, quizConfig.difficulty]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTimeUp = () => {
    const timeSpent = Math.floor(
      (Date.now() - questionStartTimeRef.current) / 1000,
    );
    const updatedResults = { ...quizResults };
    updatedResults.questionTimes[currentQuestion] = timeSpent;
    updatedResults.totalTime += timeSpent;

    updatedResults.answers[currentQuestion] = {
      questionIndex: currentQuestion,
      selectedAnswer: null,
      isCorrect: false,
      timeTaken: timeSpent,
    };

    setQuizResults(updatedResults);

    setShowResult(true);
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };
  const generateQuiz = async () => {
    if (
      !quizConfig.topic.trim() ||
      !quizConfig.difficulty ||
      !quizConfig.questionType ||
      quizConfig.numberOfQuestions < 3
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    toast.success("Generating quiz...");

    try {
      const res = await axios.post("/api/generate-quiz", {
        topic: quizConfig.topic,
        difficulty: quizConfig.difficulty,
        question_type: quizConfig.questionType,
        number_of_questions: quizConfig.numberOfQuestions,
        time_per_question: quizConfig.timePerQuestion,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        setIsLoading(false);
        return;
      }

      const data = await res.data;
      console.log("Quiz data:", data);

      if (Array.isArray(data) && data.length > 0) {
        setDemoQuestions(data);
        setQuizStarted(true);

        // Initialize quiz results
        setQuizResults({
          score: 0,
          totalTime: 0,
          questionTimes: Array(data.length).fill(0),
          answers: Array(data.length).fill(null),
        });
      } else {
        toast.error("Failed to generate valid quiz questions");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Validate all fields before generating quiz
      if (
        !quizConfig.topic.trim() ||
        !quizConfig.difficulty ||
        !quizConfig.questionType ||
        quizConfig.numberOfQuestions < 3
      ) {
        toast.error("Please fill in all fields to generate a quiz");
        return;
      }

      generateQuiz();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizConfig({
      ...quizConfig,
      [name]: value,
    });
  };

  const handleSelectAnswer = (index) => {
    if (showResult) return;
    clearInterval(timerRef.current);

    // Record time spent on this question
    const timeSpent = Math.floor(
      (Date.now() - questionStartTimeRef.current) / 1000,
    );

    // Update quiz results
    const updatedResults = { ...quizResults };
    updatedResults.questionTimes[currentQuestion] = timeSpent;
    updatedResults.totalTime += timeSpent;

    const isCorrect = index === demoQuestions[currentQuestion].correct;
    if (isCorrect) {
      updatedResults.score += 1;
    }

    updatedResults.answers[currentQuestion] = {
      questionIndex: currentQuestion,
      selectedAnswer: index,
      isCorrect,
      timeTaken: timeSpent,
    };

    setQuizResults(updatedResults);
    setSelectedAnswer(index);
    const currentQ = demoQuestions[currentQuestion];
    const trackingData = {
      id: `q${currentQuestion + 1}`,
      question: currentQ.question,
      yourAnswer: currentQ.options[index],
      correctAnswer: currentQ.options[currentQ.correct],
      isCorrect: index === currentQ.correct,
      timeSpent: timeSpent,
    };

    setAnswerTrackingData((prevData) => [...prevData, trackingData]);

    // Optional: console log for debugging
    console.log("Answer recorded:", trackingData);

    setTimeout(() => {
      setShowResult(true);
    }, 500);
    setSelectedAnswer(index);
    setShowResult(true);

    // Add this code to track answer data
  };

  const handleNextQuestion = () => {
    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(quizConfig.timePerQuestion);
      setQuestionStartTime(Date.now()); // Add this line to reset timer
    } else {
      // Quiz is complete
      console.log("Quiz completed! Final data:", answerTrackingData);
      saveQuizToDB();
      setQuizFinished(true);
      // You could navigate to a results page here or show a summary
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetQuiz = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentStep(0);
    setQuizResults({
      score: 0,
      totalTime: 0,
      questionTimes: [],
      answers: [],
    });
    setQuizConfig({
      topic: "",
      difficulty: "medium",
      questionType: "multiple-choice",
      numberOfQuestions: 5,
      timePerQuestion: 45,
    });
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Timeline step animation
  const timelineStepVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  // Card animation
  const cardVariants = {
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

  // Setup screens
  const setupSteps = [
    {
      title: "Choose Topic",
      icon: <BookOpen className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <label
            className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
          >
            Quiz Topic
          </label>
          <div className="relative">
            <input
              type="text"
              name="topic"
              value={quizConfig.topic}
              onChange={handleChange}
              placeholder="e.g. Javascript, Python, Promises"
              className={`w-full p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
              } border`}
            />
            <BookOpen
              className={`absolute left-4 top-4 w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
            />
          </div>
          <p
            className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
          >
            Tip: Be specific for better questions (e.g. "Ancient Egypt" instead
            of just "History")
          </p>
        </div>
      ),
    },
    {
      title: "Select Difficulty",
      icon: <Award className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <label
            className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
          >
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <motion.button
                key={diff}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                  quizConfig.difficulty === diff
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                      : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow"
                }`}
                onClick={() =>
                  setQuizConfig({ ...quizConfig, difficulty: diff })
                }
              >
                <div className="flex flex-col items-center">
                  {diff === "easy" && <Smile className="w-5 h-5 mb-2" />}
                  {diff === "medium" && <LineChart className="w-5 h-5 mb-2" />}
                  {diff === "hard" && <Zap className="w-5 h-5 mb-2" />}
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </div>
              </motion.button>
            ))}
          </div>
          <p
            className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
          >
            Tip: Medium difficulty offers a balanced challenge with 45 seconds
            per question
          </p>
        </div>
      ),
    },
    {
      title: "Question Type",
      icon: <AlignLeft className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <label
            className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
          >
            Question Format
          </label>
          <div className=" flex  items-center justify-center gap-8">
            {questionTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl font-medium text-left flex items-center transition-all duration-300 ${
                  quizConfig.questionType === type
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg ring-2 ring-blue-300"
                    : darkMode
                      ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:border-blue-400"
                      : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow hover:border-blue-300"
                }`}
                onClick={() =>
                  setQuizConfig({ ...quizConfig, questionType: type })
                }
              >
                <div
                  className={`w-6 h-6 mr-4 rounded-full border-2 flex items-center justify-center ${
                    quizConfig.questionType === type
                      ? "border-white"
                      : darkMode
                        ? "border-gray-500"
                        : "border-gray-400"
                  }`}
                >
                  {quizConfig.questionType === type && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 rounded-full bg-white"
                    ></motion.div>
                  )}
                </div>
                <div>
                  <div
                    className={
                      quizConfig.questionType === type ? "font-bold" : ""
                    }
                  >
                    {type
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      quizConfig.questionType === type
                        ? "text-blue-100"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                  >
                    {type === "multiple-choice" &&
                      "Select the correct answer from given options"}
                    {type === "true-false" &&
                      "Determine whether statements are true or false"}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Number of Questions",
      icon: <Timer className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <label
            className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
          >
            Questions ({quizConfig.numberOfQuestions})
          </label>

          <div className="p-1 rounded-lg">
            <input
              type="range"
              name="numberOfQuestions"
              min="3"
              max="20"
              value={quizConfig.numberOfQuestions}
              onChange={handleChange}
              className={`w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
              style={{
                background: `linear-gradient(to right, ${
                  darkMode ? "#3B82F6" : "#3B82F6"
                } 0%, ${
                  darkMode ? "#3B82F6" : "#3B82F6"
                } ${(quizConfig.numberOfQuestions - 3) * (100 / 17)}%, ${
                  darkMode ? "#374151" : "#E5E7EB"
                } ${(quizConfig.numberOfQuestions - 3) * (100 / 17)}%, ${
                  darkMode ? "#374151" : "#E5E7EB"
                } 100%)`,
                WebkitAppearance: "none",
                height: "8px",
              }}
            />
          </div>

          <div
            className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-600"} text-sm font-medium`}
          >
            <span>3</span>
            <span>10</span>
            <span>20</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div
              className={`p-4 rounded-xl ${
                quizConfig.numberOfQuestions <= 5
                  ? darkMode
                    ? "bg-blue-800 border-blue-700"
                    : "bg-blue-50 border-blue-200"
                  : darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
              } border shadow-sm flex flex-col items-center transition-colors`}
            >
              <Clock
                className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions <= 5 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
              />
              <span
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Quick
              </span>
              <span
                className={`font-medium ${quizConfig.numberOfQuestions <= 5 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                3-5
              </span>
            </div>

            <div
              className={`p-4 rounded-xl ${
                quizConfig.numberOfQuestions > 5 &&
                quizConfig.numberOfQuestions <= 12
                  ? darkMode
                    ? "bg-blue-800 border-blue-700"
                    : "bg-blue-50 border-blue-200"
                  : darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
              } border shadow-sm flex flex-col items-center transition-colors`}
            >
              <Clock
                className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions > 5 && quizConfig.numberOfQuestions <= 12 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
              />
              <span
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Standard
              </span>
              <span
                className={`font-medium ${quizConfig.numberOfQuestions > 5 && quizConfig.numberOfQuestions <= 12 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                6-12
              </span>
            </div>

            <div
              className={`p-4 rounded-xl ${
                quizConfig.numberOfQuestions > 12
                  ? darkMode
                    ? "bg-blue-800 border-blue-700"
                    : "bg-blue-50 border-blue-200"
                  : darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
              } border shadow-sm flex flex-col items-center transition-colors`}
            >
              <Clock
                className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions > 12 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
              />
              <span
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Extended
              </span>
              <span
                className={`font-medium ${quizConfig.numberOfQuestions > 12 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                13-20
              </span>
            </div>
          </div>

          <p
            className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
          >
            Tip: 10 questions takes about 5-7 minutes to complete
          </p>
        </div>
      ),
    },
  ];

  // Results Screen
  const ResultsScreen = () => {
    const correctAnswers = quizResults.answers.filter(
      (ans) => ans && ans.isCorrect,
    ).length;
    const totalQuestions = demoQuestions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const fastestQuestion = [...quizResults.questionTimes].sort(
      (a, b) => a - b,
    )[0];
    const slowestQuestion = [...quizResults.questionTimes].sort(
      (a, b) => b - a,
    )[0];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto mt-8"
      >
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mx-auto"
            >
              <BarChart className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
            Quiz Complete!
          </h1>
          <p
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            You scored {correctAnswers} out of {totalQuestions} (
            {scorePercentage}%)
          </p>
        </div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            darkMode
              ? "bg-gray-800 shadow-md shadow-gray-900/60"
              : "bg-white shadow-xl"
          } rounded-xl p-6 mb-8`}
        >
          <h3
            className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"} mb-6`}
          >
            Performance Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-blue-50"} flex flex-col items-center`}
            >
              <Clock
                className={`w-6 h-6 mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Total Time
              </span>
              <span
                className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {formatTime(quizResults.totalTime)}
              </span>
            </div>

            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-blue-50"} flex flex-col items-center`}
            >
              <Zap
                className={`w-6 h-6 mb-2 ${darkMode ? "text-yellow-400" : "text-yellow-500"}`}
              />
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Avg. Time per Question
              </span>
              <span
                className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {formatTime(
                  Math.round(quizResults.totalTime / demoQuestions.length),
                )}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h4
              className={`font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Question Performance
            </h4>
            <div className={`rounded-lg ${darkMode ? "bg-gray-700" : ""} p-4`}>
              <div className="space-y-3">
                {quizResults.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex justify-between items-center ${
                      answer && answer.isCorrect
                        ? darkMode
                          ? "bg-green-900/30 border border-green-800"
                          : "bg-green-50 border border-green-200"
                        : darkMode
                          ? "bg-red-900/30 border border-red-800"
                          : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center">
                      {answer && answer.isCorrect ? (
                        <CheckCircle
                          className={`w-4 h-4 mr-2 ${darkMode ? "text-green-400" : "text-green-500"}`}
                        />
                      ) : (
                        <XCircle
                          className={`w-4 h-4 mr-2 ${darkMode ? "text-red-400" : "text-red-500"}`}
                        />
                      )}
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        Question {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Timer
                        className={`w-4 h-4 mr-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                      <span
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {formatTime(answer ? answer.timeTaken : 0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : ""} flex flex-col`}
            >
              <div className="flex items-center mb-2">
                <Zap
                  className={`w-5 h-5 mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
                />
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}
                >
                  Fastest Answer
                </span>
              </div>
              <span
                className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {formatTime(fastestQuestion || 0)}
              </span>
            </div>

            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : ""} flex flex-col`}
            >
              <div className="flex items-center mb-2">
                <Clock
                  className={`w-5 h-5 mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
                />
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}
                >
                  Slowest Answer
                </span>
              </div>
              <span
                className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {formatTime(slowestQuestion || 0)}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              Try Another Quiz
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                router.push("/quiz/view");
              }}
              className="px-8  flex items-center 
              py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Quizzes
            </motion.button>

            {!saveSuccess && (
              <button
                onClick={() => saveQuizToDB()}
                disabled={isSaving}
                className="group relative px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-medium rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70"
              >
                <div className="flex items-center justify-center">
                  {isSaving ? (
                    <div className="mr-2 animate-spin rounded-full h-4 w-4 border-2 border-gray-100 border-t-transparent"></div>
                  ) : (
                    <svg
                      className="mr-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                  )}
                  Try Again
                </div>
                <div className="absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-opacity-20 bg-white transition-all duration-300"></div>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (quizFinished) {
    return (
      <div
        className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? "" : ""} mt-16`}
      >
        <ResultsScreen />
      </div>
    );
  }

  if (!quizStarted && !isLoading) {
    return (
      <div
        className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? "" : ""} mt-16`}
      >
        {/* Theme toggle */}
        <div className="fixed top-6 right-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 text-gray-400 hover:text-yellow-400"
                : "bg-white text-gray-600 hover:text-blue-500 shadow-md"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-block mb-4">
              <div
                className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mx-auto`}
              >
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1
              className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2`}
            >
              Quick Quiz
            </h1>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Test your knowledge with customized quizzes.
            </p>
          </motion.div>

          {/* Setup timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="relative flex items-center justify-between mb-8 px-2">
              {setupSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center relative z-10"
                  variants={timelineStepVariants}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                        : darkMode
                          ? "bg-gray-700"
                          : "bg-white border border-gray-200"
                    }`}
                  >
                    <div
                      className={`${
                        index <= currentStep
                          ? "text-white"
                          : darkMode
                            ? "text-gray-400"
                            : "text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      index <= currentStep
                        ? darkMode
                          ? "text-blue-400"
                          : "text-blue-600"
                        : darkMode
                          ? "text-gray-500"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.div>
              ))}

              {/* Progress line */}
              <div
                className={`absolute top-5 left-0 h-0.5 ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } w-full -z-10`}
              ></div>
              <div
                className={`absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 -z-10 transition-all duration-300`}
                style={{
                  width: `${(currentStep / (setupSteps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </motion.div>

          {/* Current step content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <motion.div
              variants={cardVariants}
              className={`rounded-2xl p-6 ${
                darkMode
                  ? "bg-gray-800 shadow-md shadow-gray-900/60"
                  : "bg-white shadow-xl"
              }`}
            >
              {setupSteps[currentStep].content}
            </motion.div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-xl flex items-center font-medium ${
                currentStep === 0
                  ? darkMode
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNextStep}
              className={`px-6 py-2 rounded-xl flex items-center font-medium ${
                currentStep === setupSteps.length - 1
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              }`}
            >
              {currentStep === setupSteps.length - 1 ? "Start Quiz" : "Next"}
              <ChevronRight className="w-5 h-5 ml-1" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) return <QuizLoader />;
  // Quiz in progress
  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "" : ""
      } mt-16`}
    >
      <div className="max-w-3xl mx-auto mb-6">
        <div
          className={`flex justify-between items-center p-4 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white shadow-md"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                darkMode ? "bg-gray-700" : "bg-blue-100"
              }`}
            >
              <Lightbulb
                className={`w-5 h-5 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
            <div>
              <div
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Question {currentQuestion + 1}/{demoQuestions.length}
              </div>
              <div
                className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {quizConfig.topic || "General Knowledge"} Quiz
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`mr-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`}>
              <Timer
                className={`w-5 h-5 ${
                  timeLeft <= 10
                    ? "text-red-500"
                    : darkMode
                      ? "text-blue-400"
                      : "text-blue-500"
                }`}
              />
            </div>
            <div
              className={`font-mono font-medium ${
                timeLeft <= 10
                  ? "text-red-500"
                  : darkMode
                    ? "text-white"
                    : "text-gray-800"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-300 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full ${
              timeLeft <= 10 ? "bg-red-500" : "bg-blue-500"
            } transition-all duration-1000 ease-linear`}
            style={{
              width: `${(timeLeft / quizConfig.timePerQuestion) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl p-6 mb-8 ${
            darkMode
              ? "bg-gray-800 shadow-md shadow-gray-900/60"
              : "bg-white shadow-xl"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {demoQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {demoQuestions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={showResult}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 rounded-xl font-medium text-left transition-all duration-200 ${
                  showResult && index === demoQuestions[currentQuestion].correct
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : showResult && selectedAnswer === index
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                      : selectedAnswer === index
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : darkMode
                          ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                          : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center border-2 ${
                      showResult &&
                      index === demoQuestions[currentQuestion].correct
                        ? "border-white"
                        : showResult && selectedAnswer === index
                          ? "border-white"
                          : selectedAnswer === index
                            ? "border-white"
                            : darkMode
                              ? "border-gray-500"
                              : "border-gray-400"
                    }`}
                  >
                    {showResult &&
                      index === demoQuestions[currentQuestion].correct && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    {showResult &&
                      selectedAnswer === index &&
                      index !== demoQuestions[currentQuestion].correct && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    {!showResult && selectedAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>

          {showResult && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === demoQuestions[currentQuestion].correct
                  ? darkMode
                    ? "bg-green-900/30 border border-green-800"
                    : "bg-green-50 border border-green-200"
                  : darkMode
                    ? "bg-red-900/30 border border-red-800"
                    : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-start">
                {selectedAnswer === demoQuestions[currentQuestion].correct ? (
                  <CheckCircle
                    className={`w-5 h-5 mr-2 mt-0.5 ${
                      darkMode ? "text-green-400" : "text-green-500"
                    }`}
                  />
                ) : (
                  <AlertCircle
                    className={`w-5 h-5 mr-2 mt-0.5 ${
                      darkMode ? "text-red-400" : "text-red-500"
                    }`}
                  />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      selectedAnswer === demoQuestions[currentQuestion].correct
                        ? darkMode
                          ? "text-green-300"
                          : "text-green-700"
                        : darkMode
                          ? "text-red-300"
                          : "text-red-700"
                    }`}
                  >
                    {selectedAnswer === demoQuestions[currentQuestion].correct
                      ? "Correct!"
                      : "Incorrect"}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {selectedAnswer === demoQuestions[currentQuestion].correct
                      ? "Great job! You've selected the right answer."
                      : `The correct answer is "${
                          demoQuestions[currentQuestion].options[
                            demoQuestions[currentQuestion].correct
                          ]
                        }".`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Next question button */}
        {showResult && (
          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl flex items-center font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            >
              {currentQuestion < demoQuestions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              ) : (
                <>
                  Complete Quiz
                  <CheckCircle className="w-5 h-5 ml-1" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
