// "use client";
// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   ChevronRight,
//   BookOpen,
//   Timer,
//   Award,
//   AlignLeft,
//   CheckCircle,
//   XCircle,
//   Moon,
//   Sun,
//   Lightbulb,
//   Play,
//   ChevronLeft,
//   Brain,
//   Smile,
//   LineChart,
//   Zap,
//   Clock,
//   Lock,
//   BarChart,
//   AlertCircle,
//   PlusCircle,
//   Save,
//   Database,
// } from "lucide-react";
// import { useTheme } from "next-themes";
// import toast from "react-hot-toast";
// import LoaderUI from "@/components/LoaderUI";
// import QuizLoader from "./_components/QuizLoader";
// import axios from "axios";
// import { Button } from "@/components/ui/button";

// export default function QuizUI() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [quizConfig, setQuizConfig] = useState({
//     topic: "",
//     difficulty: "medium",
//     questionType: "multiple-choice",
//     numberOfQuestions: 5,
//     timePerQuestion: 45, // Time in seconds per question
//   });
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showResult, setShowResult] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(45); // Default time per question
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [quizResults, setQuizResults] = useState({
//     score: 0,
//     totalTime: 0,
//     questionTimes: [],
//     answers: [],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [savedQuizData, setSavedQuizData] = useState(null);
//   const timerRef = useRef(null);
//   const questionStartTimeRef = useRef(null);
//   const { theme, setTheme } = useTheme();
//   const [demoQuestions, setDemoQuestions] = useState([
//     {
//       question: "What is the capital of France?",
//       options: ["London", "Berlin", "Paris", "Madrid"],
//       correct: 2,
//     },
//   ]);

//   // Check system preference for dark mode
//   useEffect(() => {
//     setDarkMode(theme === "dark");
//   }, [theme]);

//   // Toggle theme
//   const toggleTheme = () => {
//     setTheme(darkMode ? "light" : "dark");
//     setDarkMode(!darkMode);
//   };

//   const difficulties = ["easy", "medium", "hard"];
//   const questionTypes = ["multiple-choice", "true-false"];

//   // Save quiz results to database
//   const saveQuizToDB = async () => {
//     try {
//       setIsSaving(true);

//       // Calculate statistics for the completed quiz
//       const correctAnswers = quizResults.answers.filter(
//         (ans) => ans && ans.isCorrect,
//       ).length;
//       const incorrectAnswers = quizResults.answers.filter(
//         (ans) => ans && !ans.isCorrect,
//       ).length;
//       const skippedAnswers = quizResults.answers.filter(
//         (ans) => ans === null,
//       ).length;
//       const scorePercentage = Math.round(
//         (correctAnswers / demoQuestions.length) * 100,
//       );

//       // Identify strong and weak areas based on performance
//       const topicKeywords = quizConfig.topic.toLowerCase().split(/\s+/);
//       const questionAnalysis = demoQuestions.map((q, index) => {
//         const userAnswer = quizResults.answers[index];
//         return {
//           question: q.question,
//           isCorrect: userAnswer && userAnswer.isCorrect,
//           timeTaken: quizResults.questionTimes[index] || 0,
//           // Extract keywords from the question
//           keywords: q.question
//             .toLowerCase()
//             .split(/\W+/)
//             .filter(
//               (word) =>
//                 word.length > 3 &&
//                 ![
//                   "what",
//                   "when",
//                   "where",
//                   "which",
//                   "how",
//                   "does",
//                   "this",
//                   "that",
//                   "with",
//                   "from",
//                 ].includes(word),
//             ),
//         };
//       });

//       // Identify strong and weak areas
//       const keywordPerformance = {};
//       questionAnalysis.forEach((item) => {
//         item.keywords.forEach((keyword) => {
//           if (!keywordPerformance[keyword]) {
//             keywordPerformance[keyword] = { correct: 0, total: 0 };
//           }
//           keywordPerformance[keyword].total++;
//           if (item.isCorrect) keywordPerformance[keyword].correct++;
//         });
//       });

//       // Filter for keywords with at least 2 occurrences
//       const significantKeywords = Object.entries(keywordPerformance).filter(
//         ([_, stats]) => stats.total >= 2,
//       );

//       // Identify strong and weak areas
//       const strongAreas = significantKeywords
//         .filter(([_, stats]) => stats.correct / stats.total >= 0.7)
//         .map(([keyword]) => keyword);

//       const weakAreas = significantKeywords
//         .filter(([_, stats]) => stats.correct / stats.total < 0.5)
//         .map(([keyword]) => keyword);

//       // Generate badges based on performance
//       const badges = [];
//       if (scorePercentage >= 90) badges.push("Expert");
//       else if (scorePercentage >= 75) badges.push("Proficient");
//       else if (scorePercentage >= 50) badges.push("Intermediate");
//       else badges.push("Beginner");

//       if (quizResults.totalTime / demoQuestions.length < 15)
//         badges.push("Speed Demon");
//       if (correctAnswers === demoQuestions.length) badges.push("Perfect Score");
//       if (quizConfig.difficulty === "hard") badges.push("Challenger");

//       // Format the total time spent
//       const totalTimeFormatted = formatTime(quizResults.totalTime);

//       // Format detailed question data
//       const questionsData = demoQuestions.map((q, idx) => {
//         const answer = quizResults.answers[idx];
//         return {
//           id: `q-${idx + 1}`,
//           question: q.question,
//           yourAnswer: answer ? q.options[answer.selectedAnswer] : "Skipped",
//           correctAnswer: q.options[q.correct],
//           isCorrect: answer ? answer.isCorrect : false,
//           timeSpent: formatTime(quizResults.questionTimes[idx] || 0),
//         };
//       });

//       // Generate recommended resources based on weak areas
//       const recommendedResources = [];
//       if (weakAreas.length > 0) {
//         weakAreas.forEach((area) => {
//           recommendedResources.push({
//             title: `Understanding ${area.charAt(0).toUpperCase() + area.slice(1)}`,
//             type: "article",
//             url: `https://example.com/learn/${area}`,
//           });
//         });
//       }

//       // If there are few weak areas, add general resources for the topic
//       if (recommendedResources.length < 3) {
//         recommendedResources.push({
//           title: `Complete Guide to ${quizConfig.topic}`,
//           type: "course",
//           url: `https://example.com/courses/${quizConfig.topic.toLowerCase().replace(/\s+/g, "-")}`,
//         });
//         recommendedResources.push({
//           title: `${quizConfig.topic} Practice Problems`,
//           type: "exercises",
//           url: `https://example.com/practice/${quizConfig.topic.toLowerCase().replace(/\s+/g, "-")}`,
//         });
//       }

//       // Create the quiz record
//       const quizRecord = {
//         userId: "current-user-id", // Replace with actual user ID from auth
//         quizId: `quiz-${Date.now()}`,
//         title: `${quizConfig.topic} Quiz`,
//         category: quizConfig.topic,
//         description: `A ${quizConfig.difficulty} level quiz on ${quizConfig.topic} with ${demoQuestions.length} questions`,
//         totalQuestions: demoQuestions.length,
//         badges,
//         strongAreas,
//         weakAreas,
//         attempts: 1,
//         attemptsHistory: [
//           {
//             attemptId: 1,
//             completedOn: new Date().toISOString(),
//             score: scorePercentage,
//             correctAnswers,
//             incorrectAnswers,
//             skippedAnswers,
//             timeSpent: totalTimeFormatted,
//             questions: questionsData,
//           },
//         ],
//         recommendedResources,
//       };

//       console.log("Saving quiz to database:", quizRecord);

//       // Here you would make the API call to save to your database
//       // For now, we'll just simulate an API call with a delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // In a real implementation, you would do:
//       // const response = await axios.post('/api/save-quiz', quizRecord);
//       // const savedData = response.data;

//       setSavedQuizData(quizRecord);
//       setIsSaving(false);
//       toast.success("Quiz results saved successfully!");
//       return quizRecord;
//     } catch (error) {
//       console.error("Error saving quiz results:", error);
//       toast.error("Failed to save quiz results");
//       setIsSaving(false);
//       return null;
//     }
//   };

//   // Initialize timer when question changes
//   useEffect(() => {
//     if (quizStarted && !quizFinished) {
//       // Set time per question based on difficulty
//       let timeLimit;
//       switch (quizConfig.difficulty) {
//         case "easy":
//           timeLimit = 30;
//           break;
//         case "medium":
//           timeLimit = 45;
//           break;
//         case "hard":
//           timeLimit = 60;
//           break;
//         default:
//           timeLimit = quizConfig.timePerQuestion;
//       }

//       setTimeLeft(timeLimit);

//       // Record when the question started
//       questionStartTimeRef.current = Date.now();

//       // Clear any existing timer
//       if (timerRef.current) clearInterval(timerRef.current);

//       // Start new timer
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             // Time's up - auto-select no answer and move to next
//             clearInterval(timerRef.current);
//             handleTimeUp();
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [currentQuestion, quizStarted, quizFinished, quizConfig.difficulty]);

//   // Clean up timer on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, []);

//   const handleTimeUp = () => {
//     // Record time spent
//     const timeSpent = Math.floor(
//       (Date.now() - questionStartTimeRef.current) / 1000,
//     );
//     const updatedResults = { ...quizResults };
//     updatedResults.questionTimes[currentQuestion] = timeSpent;
//     updatedResults.totalTime += timeSpent;

//     // Record no answer selected
//     updatedResults.answers[currentQuestion] = {
//       questionIndex: currentQuestion,
//       selectedAnswer: null,
//       isCorrect: false,
//       timeTaken: timeSpent,
//     };

//     setQuizResults(updatedResults);

//     // Auto show result and proceed
//     setShowResult(true);
//     setTimeout(() => {
//       handleNextQuestion();
//     }, 1500);
//   };

//   const generateQuiz = async () => {
//     if (
//       !quizConfig.topic.trim() ||
//       !quizConfig.difficulty ||
//       !quizConfig.questionType ||
//       quizConfig.numberOfQuestions < 3
//     ) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);
//     toast.success("Generating quiz...");

//     try {
//       const res = await axios.post("/api/generate-quiz", {
//         topic: quizConfig.topic,
//         difficulty: quizConfig.difficulty,
//         question_type: quizConfig.questionType,
//         number_of_questions: quizConfig.numberOfQuestions,
//         time_per_question: quizConfig.timePerQuestion,
//       });

//       if (res.data.error) {
//         toast.error(res.data.error);
//         setIsLoading(false);
//         return;
//       }

//       const data = await res.data;
//       console.log("Quiz data:", data);

//       if (Array.isArray(data) && data.length > 0) {
//         setDemoQuestions(data);
//         setQuizStarted(true);

//         // Initialize quiz results
//         setQuizResults({
//           score: 0,
//           totalTime: 0,
//           questionTimes: Array(data.length).fill(0),
//           answers: Array(data.length).fill(null),
//         });
//       } else {
//         toast.error("Failed to generate valid quiz questions");
//       }
//     } catch (error) {
//       console.error("Error generating quiz:", error);
//       toast.error("Failed to generate quiz. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setQuizConfig({
//       ...quizConfig,
//       [name]: value,
//     });
//   };

//   const handleSelectAnswer = (index) => {
//     // Stop the timer
//     clearInterval(timerRef.current);

//     // Record time spent on this question
//     const timeSpent = Math.floor(
//       (Date.now() - questionStartTimeRef.current) / 1000,
//     );

//     // Update quiz results
//     const updatedResults = { ...quizResults };
//     updatedResults.questionTimes[currentQuestion] = timeSpent;
//     updatedResults.totalTime += timeSpent;

//     const isCorrect = index === demoQuestions[currentQuestion].correct;
//     if (isCorrect) {
//       updatedResults.score += 1;
//     }

//     updatedResults.answers[currentQuestion] = {
//       questionIndex: currentQuestion,
//       selectedAnswer: index,
//       isCorrect,
//       timeTaken: timeSpent,
//     };

//     setQuizResults(updatedResults);
//     setSelectedAnswer(index);

//     setTimeout(() => {
//       setShowResult(true);
//     }, 500);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < demoQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setShowResult(false);
//     } else {
//       // Quiz is complete - save to database before showing results
//       saveQuizToDB().then((savedQuiz) => {
//         console.log("Quiz saved:", savedQuiz);
//         setQuizFinished(true);
//       });
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const resetQuiz = () => {
//     setQuizFinished(false);
//     setQuizStarted(false);
//     setCurrentQuestion(0);
//     setSelectedAnswer(null);
//     setShowResult(false);
//     setCurrentStep(0);
//     setSavedQuizData(null);
//     setQuizResults({
//       score: 0,
//       totalTime: 0,
//       questionTimes: [],
//       answers: [],
//     });
//     setQuizConfig({
//       topic: "",
//       difficulty: "medium",
//       questionType: "multiple-choice",
//       numberOfQuestions: 5,
//       timePerQuestion: 45,
//     });
//   };

//   // Timer display component with dynamic color
//   const TimerDisplay = ({ timeLeft, totalTime }) => {
//     const getTimePercentage = () => {
//       let maxTime;
//       switch (quizConfig.difficulty) {
//         case "easy":
//           maxTime = 30;
//           break;
//         case "medium":
//           maxTime = 45;
//           break;
//         case "hard":
//           maxTime = 60;
//           break;
//         default:
//           maxTime = quizConfig.timePerQuestion;
//       }
//       return (timeLeft / maxTime) * 100;
//     };

//     const percentage = getTimePercentage();

//     const getTimerColor = () => {
//       if (percentage <= 25) return "text-red-500";
//       if (percentage <= 50) return "text-yellow-500";
//       return darkMode ? "text-blue-400" : "text-blue-500";
//     };

//     return (
//       <div className="flex items-center">
//         <div className={`mr-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`}>
//           <Timer className={`w-5 h-5 ${getTimerColor()}`} />
//         </div>
//         <div className={`font-mono font-medium ${getTimerColor()}`}>
//           {formatTime(timeLeft)}
//         </div>
//       </div>
//     );
//   };

//   // Container animation
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   // Timeline step animation
//   const timelineStepVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { scale: 1, opacity: 1 },
//   };

//   // Card animation
//   const cardVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   // Setup screens
//   const setupSteps = [
//     {
//       title: "Choose Topic",
//       icon: <BookOpen className="w-6 h-6" />,
//       content: (
//         <div className="space-y-4">
//           <label
//             className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
//           >
//             Quiz Topic
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               name="topic"
//               value={quizConfig.topic}
//               onChange={handleChange}
//               placeholder="e.g. Javascript, Python, Promises"
//               className={`w-full p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
//                 darkMode
//                   ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//                   : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
//               } border`}
//             />
//             <BookOpen
//               className={`absolute left-4 top-4 w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
//             />
//           </div>
//           <p
//             className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
//           >
//             Tip: Be specific for better questions (e.g. "Ancient Egypt" instead
//             of just "History")
//           </p>
//         </div>
//       ),
//     },
//     {
//       title: "Select Difficulty",
//       icon: <Award className="w-6 h-6" />,
//       content: (
//         <div className="space-y-4">
//           <label
//             className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
//           >
//             Difficulty Level
//           </label>
//           <div className="grid grid-cols-3 gap-4">
//             {difficulties.map((diff) => (
//               <motion.button
//                 key={diff}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className={`p-4 rounded-xl font-medium transition-all duration-200 ${
//                   quizConfig.difficulty === diff
//                     ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
//                     : darkMode
//                       ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
//                       : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow"
//                 }`}
//                 onClick={() =>
//                   setQuizConfig({ ...quizConfig, difficulty: diff })
//                 }
//               >
//                 <div className="flex flex-col items-center">
//                   {diff === "easy" && <Smile className="w-5 h-5 mb-2" />}
//                   {diff === "medium" && <LineChart className="w-5 h-5 mb-2" />}
//                   {diff === "hard" && <Zap className="w-5 h-5 mb-2" />}
//                   {diff.charAt(0).toUpperCase() + diff.slice(1)}
//                 </div>
//               </motion.button>
//             ))}
//           </div>
//           <p
//             className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
//           >
//             {quizConfig.difficulty === "easy" &&
//               "Easy mode gives you 30 seconds per question"}
//             {quizConfig.difficulty === "medium" &&
//               "Medium difficulty offers a balanced challenge with 45 seconds per question"}
//             {quizConfig.difficulty === "hard" &&
//               "Hard mode challenges you with 60 seconds for complex questions"}
//           </p>
//         </div>
//       ),
//     },
//     {
//       title: "Question Type",
//       icon: <AlignLeft className="w-6 h-6" />,
//       content: (
//         <div className="space-y-4">
//           <label
//             className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
//           >
//             Question Format
//           </label>
//           <div className="flex items-center justify-center gap-8">
//             {questionTypes.map((type) => (
//               <motion.button
//                 key={type}
//                 whileHover={{ scale: 1.02, translateY: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`w-full p-4 rounded-xl font-medium text-left flex items-center transition-all duration-300 ${
//                   quizConfig.questionType === type
//                     ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg ring-2 ring-blue-300"
//                     : darkMode
//                       ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:border-blue-400"
//                       : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow hover:border-blue-300"
//                 }`}
//                 onClick={() =>
//                   setQuizConfig({ ...quizConfig, questionType: type })
//                 }
//               >
//                 <div
//                   className={`w-6 h-6 mr-4 rounded-full border-2 flex items-center justify-center ${
//                     quizConfig.questionType === type
//                       ? "border-white"
//                       : darkMode
//                         ? "border-gray-500"
//                         : "border-gray-400"
//                   }`}
//                 >
//                   {quizConfig.questionType === type && (
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="w-3 h-3 rounded-full bg-white"
//                     ></motion.div>
//                   )}
//                 </div>
//                 <div>
//                   <div
//                     className={
//                       quizConfig.questionType === type ? "font-bold" : ""
//                     }
//                   >
//                     {type
//                       .split("-")
//                       .map(
//                         (word) => word.charAt(0).toUpperCase() + word.slice(1),
//                       )
//                       .join(" ")}
//                   </div>
//                   <div
//                     className={`text-xs mt-1 ${
//                       quizConfig.questionType === type
//                         ? "text-blue-100"
//                         : darkMode
//                           ? "text-gray-400"
//                           : "text-gray-500"
//                     }`}
//                   >
//                     {type === "multiple-choice" &&
//                       "Select the correct answer from given options"}
//                     {type === "true-false" &&
//                       "Determine whether statements are true or false"}
//                   </div>
//                 </div>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Number of Questions",
//       icon: <Timer className="w-6 h-6" />,
//       content: (
//         <div className="space-y-6">
//           <label
//             className={`block ${darkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-2`}
//           >
//             Questions ({quizConfig.numberOfQuestions})
//           </label>

//           <div className="p-1 rounded-lg">
//             <input
//               type="range"
//               name="numberOfQuestions"
//               min="3"
//               max="20"
//               value={quizConfig.numberOfQuestions}
//               onChange={handleChange}
//               className={`w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 darkMode ? "bg-gray-700" : "bg-gray-200"
//               }`}
//               style={{
//                 background: `linear-gradient(to right, ${
//                   darkMode ? "#3B82F6" : "#3B82F6"
//                 } 0%, ${
//                   darkMode ? "#3B82F6" : "#3B82F6"
//                 } ${(quizConfig.numberOfQuestions - 3) * (100 / 17)}%, ${
//                   darkMode ? "#374151" : "#E5E7EB"
//                 } ${(quizConfig.numberOfQuestions - 3) * (100 / 17)}%, ${
//                   darkMode ? "#374151" : "#E5E7EB"
//                 } 100%)`,
//                 WebkitAppearance: "none",
//                 height: "8px",
//               }}
//             />
//           </div>

//           <div
//             className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-600"} text-sm font-medium`}
//           >
//             <span>3</span>
//             <span>10</span>
//             <span>20</span>
//           </div>

//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div
//               className={`p-4 rounded-xl ${
//                 quizConfig.numberOfQuestions <= 5
//                   ? darkMode
//                     ? "bg-blue-800 border-blue-700"
//                     : "bg-blue-50 border-blue-200"
//                   : darkMode
//                     ? "bg-gray-700 border-gray-600"
//                     : "bg-white border-gray-200"
//               } border shadow-sm flex flex-col items-center transition-colors`}
//             >
//               <Clock
//                 className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions <= 5 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
//               />
//               <span
//                 className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//               >
//                 Quick
//               </span>
//               <span
//                 className={`font-medium ${quizConfig.numberOfQuestions <= 5 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
//               >
//                 3-5
//               </span>
//             </div>

//             <div
//               className={`p-4 rounded-xl ${
//                 quizConfig.numberOfQuestions > 5 &&
//                 quizConfig.numberOfQuestions <= 12
//                   ? darkMode
//                     ? "bg-blue-800 border-blue-700"
//                     : "bg-blue-50 border-blue-200"
//                   : darkMode
//                     ? "bg-gray-700 border-gray-600"
//                     : "bg-white border-gray-200"
//               } border shadow-sm flex flex-col items-center transition-colors`}
//             >
//               <Clock
//                 className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions > 5 && quizConfig.numberOfQuestions <= 12 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
//               />
//               <span
//                 className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//               >
//                 Standard
//               </span>
//               <span
//                 className={`font-medium ${quizConfig.numberOfQuestions > 5 && quizConfig.numberOfQuestions <= 12 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
//               >
//                 6-12
//               </span>
//             </div>

//             <div
//               className={`p-4 rounded-xl ${
//                 quizConfig.numberOfQuestions > 12
//                   ? darkMode
//                     ? "bg-blue-800 border-blue-700"
//                     : "bg-blue-50 border-blue-200"
//                   : darkMode
//                     ? "bg-gray-700 border-gray-600"
//                     : "bg-white border-gray-200"
//               } border shadow-sm flex flex-col items-center transition-colors`}
//             >
//               <Clock
//                 className={`w-5 h-5 mb-2 ${quizConfig.numberOfQuestions > 12 ? "text-blue-400" : darkMode ? "text-blue-400" : "text-blue-500"}`}
//               />
//               <span
//                 className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//               >
//                 Comprehensive
//               </span>
//               <span
//                 className={`font-medium ${quizConfig.numberOfQuestions > 12 ? (darkMode ? "text-blue-200" : "text-blue-700") : darkMode ? "text-gray-200" : "text-gray-700"}`}
//               >
//                 13-20
//               </span>
//             </div>
//           </div>

//           <p
//             className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} italic mt-2`}
//           >
//             Est. time:{" "}
//             {quizConfig.numberOfQuestions *
//               (quizConfig.difficulty === "easy"
//                 ? 0.5
//                 : quizConfig.difficulty === "medium"
//                   ? 0.75
//                   : 1)}{" "}
//             minutes for the entire quiz
//           </p>
//         </div>
//       ),
//     },
//   ];

//   // Quiz UI components
//   const renderQuizSetupUI = () => {
//     return (
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-2xl mt-18 mx-auto"
//       >
//         {/* Setup timeline */}
//         <div className="flex justify-between mb-8 px-2">
//           {setupSteps.map((step, index) => (
//             <motion.div
//               key={index}
//               variants={timelineStepVariants}
//               className="flex flex-col items-center"
//             >
//               <div
//                 className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
//                   index <= currentStep
//                     ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                     : darkMode
//                       ? "bg-gray-700 text-gray-400"
//                       : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {index < currentStep ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : (
//                   step.icon
//                 )}
//               </div>
//               <span
//                 className={`text-xs font-medium ${
//                   index <= currentStep
//                     ? darkMode
//                       ? "text-blue-400"
//                       : "text-blue-600"
//                     : darkMode
//                       ? "text-gray-400"
//                       : "text-gray-500"
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </motion.div>
//           ))}
//         </div>

//         {/* Current step content */}
//         <motion.div
//           variants={cardVariants}
//           className={`p-6 rounded-xl mb-6 ${
//             darkMode
//               ? "bg-gray-800 border border-gray-700"
//               : "bg-white border border-gray-200 shadow-sm"
//           }`}
//         >
//           {setupSteps[currentStep].content}
//         </motion.div>

//         {/* Navigation buttons */}
//         <div className="flex justify-between mt-8">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors ${
//               currentStep > 0
//                 ? darkMode
//                   ? "bg-gray-700 hover:bg-gray-600 text-white"
//                   : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//                 : "opacity-50 cursor-not-allowed"
//             } text-sm`}
//             onClick={handlePrevStep}
//             disabled={currentStep === 0}
//           >
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors ${
//               darkMode
//                 ? "bg-blue-600 hover:bg-blue-700 text-white"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             } text-sm`}
//             onClick={handleNextStep}
//           >
//             {currentStep < 3 ? (
//               <>
//                 Next
//                 <ChevronRight className="w-4 h-4 ml-2" />
//               </>
//             ) : (
//               <>
//                 Generate Quiz
//                 <Play className="w-4 h-4 ml-2" />
//               </>
//             )}
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   };

//   const renderQuizUI = () => {
//     if (isLoading) {
//       return <QuizLoader />;
//     }

//     if (quizFinished) {
//       return renderQuizResults();
//     }

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-2xl mx-auto"
//       >
//         {/* Quiz header */}
//         <div
//           className={`flex items-center justify-between mb-4 p-4 rounded-xl ${
//             darkMode
//               ? "bg-gray-800 border border-gray-700"
//               : "bg-white border border-gray-200 shadow-sm"
//           }`}
//         >
//           <div className="flex items-center">
//             <div
//               className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
//                 darkMode
//                   ? "bg-blue-600 text-white"
//                   : "bg-blue-100 text-blue-600"
//               }`}
//             >
//               <BookOpen className="w-5 h-5" />
//             </div>
//             <div>
//               <h3
//                 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
//               >
//                 {quizConfig.topic}
//               </h3>
//               <div
//                 className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//               >
//                 {quizConfig.difficulty.charAt(0).toUpperCase() +
//                   quizConfig.difficulty.slice(1)}{" "}
//                 &middot;{" "}
//                 {quizConfig.questionType
//                   .split("-")
//                   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                   .join(" ")}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <TimerDisplay
//               timeLeft={timeLeft}
//               totalTime={quizConfig.timePerQuestion}
//             />
//           </div>
//         </div>

//         {/* Progress */}
//         <div className="mb-6">
//           <div className="flex justify-between mb-2 text-sm">
//             <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//               Question {currentQuestion + 1} of {demoQuestions.length}
//             </span>
//             <span
//               className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}
//             >
//               {Math.round(((currentQuestion + 1) / demoQuestions.length) * 100)}
//               %
//             </span>
//           </div>
//           <div
//             className={`h-2 rounded-full overflow-hidden ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           >
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{
//                 width: `${((currentQuestion + 1) / demoQuestions.length) * 100}%`,
//               }}
//               className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
//             ></motion.div>
//           </div>
//         </div>

//         {/* Question card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className={`p-6 rounded-xl mb-6 ${
//             darkMode
//               ? "bg-gray-800 border border-gray-700"
//               : "bg-white border border-gray-200 shadow-lg"
//           }`}
//         >
//           <h3
//             className={`text-lg font-medium mb-6 ${
//               darkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             {demoQuestions[currentQuestion].question}
//           </h3>

//           {/* Answer options */}
//           <div className="space-y-3">
//             {demoQuestions[currentQuestion].options.map((option, index) => {
//               const isSelected = selectedAnswer === index;
//               const isCorrect =
//                 showResult && index === demoQuestions[currentQuestion].correct;
//               const isWrong = showResult && isSelected && !isCorrect;

//               return (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: !showResult ? 1.01 : 1 }}
//                   whileTap={{ scale: !showResult ? 0.99 : 1 }}
//                   disabled={showResult}
//                   className={`w-full p-4 rounded-xl font-medium text-left flex items-center transition-all ${
//                     isCorrect
//                       ? "bg-green-500 border-green-400 text-white"
//                       : isWrong
//                         ? "bg-red-500 border-red-400 text-white"
//                         : isSelected
//                           ? "bg-blue-500 border-blue-400 text-white"
//                           : darkMode
//                             ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
//                             : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//                   } border`}
//                   onClick={() => {
//                     if (!showResult) handleSelectAnswer(index);
//                   }}
//                 >
//                   <div
//                     className={`w-6 h-6 mr-4 rounded-full flex items-center justify-center ${
//                       isCorrect
//                         ? "bg-green-400 text-white"
//                         : isWrong
//                           ? "bg-red-400 text-white"
//                           : isSelected
//                             ? "bg-blue-400 text-white"
//                             : darkMode
//                               ? "bg-gray-600 text-gray-300"
//                               : "bg-gray-100 text-gray-500"
//                     } `}
//                   >
//                     {isCorrect ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : isWrong ? (
//                       <XCircle className="w-4 h-4" />
//                     ) : (
//                       <span>{String.fromCharCode(65 + index)}</span>
//                     )}
//                   </div>
//                   {option}
//                 </motion.button>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Action buttons */}
//         <div className="flex justify-between mt-6">
//           <div></div>
//           {showResult && (
//             <motion.button
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex items-center px-6 py-3 rounded-lg font-medium ${
//                 darkMode
//                   ? "bg-blue-600 hover:bg-blue-700 text-white"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//               onClick={() => handleNextQuestion()}
//             >
//               {currentQuestion < demoQuestions.length - 1 ? (
//                 <>
//                   Next Question
//                   <ChevronRight className="w-5 h-5 ml-2" />
//                 </>
//               ) : (
//                 <>
//                   View Results
//                   <BarChart className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </motion.button>
//           )}
//         </div>
//       </motion.div>
//     );
//   };

//   const renderQuizResults = () => {
//     // If still saving to DB, show loading state
//     if (isSaving) {
//       return (
//         <div className="flex flex-col items-center justify-center py-12">
//           <LoaderUI />
//           <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
//             Saving your quiz results...
//           </p>
//         </div>
//       );
//     }

//     const totalCorrect = quizResults.answers.filter(
//       (ans) => ans && ans.isCorrect,
//     ).length;
//     const score = Math.round((totalCorrect / demoQuestions.length) * 100);

//     // Get badges for display
//     const badges = savedQuizData ? savedQuizData.badges : [];
//     // Get strong areas
//     const strongAreas = savedQuizData ? savedQuizData.strongAreas : [];
//     // Get weak areas
//     const weakAreas = savedQuizData ? savedQuizData.weakAreas : [];
//     // Get recommended resources
//     const resources = savedQuizData ? savedQuizData.recommendedResources : [];

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="max-w-3xl mx-auto"
//       >
//         {/* Results header */}
//         <div
//           className={`p-6 rounded-xl mb-6 border ${
//             darkMode
//               ? score >= 70
//                 ? "bg-green-900/30 border-green-800"
//                 : score >= 40
//                   ? "bg-yellow-900/30 border-yellow-800"
//                   : "bg-red-900/30 border-red-800"
//               : score >= 70
//                 ? "bg-green-50 border-green-200"
//                 : score >= 40
//                   ? "bg-yellow-50 border-yellow-200"
//                   : "bg-red-50 border-red-200"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h2
//                 className={`text-2xl font-bold mb-2 ${
//                   darkMode ? "text-white" : "text-gray-800"
//                 }`}
//               >
//                 Quiz Results: {quizConfig.topic}
//               </h2>
//               <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                 {quizConfig.difficulty.charAt(0).toUpperCase() +
//                   quizConfig.difficulty.slice(1)}{" "}
//                 &middot; {demoQuestions.length} questions &middot; Total time:{" "}
//                 {formatTime(quizResults.totalTime)}
//               </p>
//             </div>
//             <div
//               className={`text-4xl font-bold ${
//                 score >= 70
//                   ? "text-green-500"
//                   : score >= 40
//                     ? "text-yellow-500"
//                     : "text-red-500"
//               }`}
//             >
//               {score}%
//             </div>
//           </div>

//           <div className="mt-4 flex flex-wrap gap-2">
//             {badges.map((badge, index) => (
//               <span
//                 key={index}
//                 className={`px-3 py-1 rounded-full text-xs font-medium
//                   ${
//                     darkMode
//                       ? "bg-blue-900/50 text-blue-200 border border-blue-700"
//                       : "bg-blue-100 text-blue-700 border border-blue-200"
//                   }`}
//               >
//                 {badge}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Performance breakdown */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Score breakdown */}
//           <motion.div
//             variants={cardVariants}
//             className={`p-6 rounded-xl border ${
//               darkMode
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200 shadow-sm"
//             }`}
//           >
//             <h3
//               className={`text-lg font-medium mb-4 flex items-center ${
//                 darkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               <BarChart className="w-5 h-5 mr-2" />
//               Score Breakdown
//             </h3>

//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between mb-1 text-sm">
//                   <span
//                     className={darkMode ? "text-gray-400" : "text-gray-600"}
//                   >
//                     Correct
//                   </span>
//                   <span
//                     className={`font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}
//                   >
//                     {totalCorrect}/{demoQuestions.length}
//                   </span>
//                 </div>
//                 <div
//                   className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
//                 >
//                   <div
//                     className="h-full bg-green-500 rounded-full"
//                     style={{
//                       width: `${(totalCorrect / demoQuestions.length) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between mb-1 text-sm">
//                   <span
//                     className={darkMode ? "text-gray-400" : "text-gray-600"}
//                   >
//                     Incorrect
//                   </span>
//                   <span
//                     className={`font-medium ${darkMode ? "text-red-400" : "text-red-600"}`}
//                   >
//                     {
//                       quizResults.answers.filter((ans) => ans && !ans.isCorrect)
//                         .length
//                     }
//                     /{demoQuestions.length}
//                   </span>
//                 </div>
//                 <div
//                   className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
//                 >
//                   <div
//                     className="h-full bg-red-500 rounded-full"
//                     style={{
//                       width: `${(quizResults.answers.filter((ans) => ans && !ans.isCorrect).length / demoQuestions.length) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between mb-1 text-sm">
//                   <span
//                     className={darkMode ? "text-gray-400" : "text-gray-600"}
//                   >
//                     Skipped
//                   </span>
//                   <span
//                     className={`font-medium ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
//                   >
//                     {quizResults.answers.filter((ans) => ans === null).length}/
//                     {demoQuestions.length}
//                   </span>
//                 </div>
//                 <div
//                   className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
//                 >
//                   <div
//                     className="h-full bg-yellow-500 rounded-full"
//                     style={{
//                       width: `${(quizResults.answers.filter((ans) => ans === null).length / demoQuestions.length) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Areas */}
//           <motion.div
//             variants={cardVariants}
//             className={`p-6 rounded-xl border ${
//               darkMode
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200 shadow-sm"
//             }`}
//           >
//             <h3
//               className={`text-lg font-medium mb-4 flex items-center ${
//                 darkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               <Brain className="w-5 h-5 mr-2" />
//               Knowledge Areas
//             </h3>

//             <div className="space-y-4">
//               {strongAreas.length > 0 && (
//                 <div>
//                   <h4
//                     className={`text-sm font-medium mb-2 flex items-center ${darkMode ? "text-green-400" : "text-green-600"}`}
//                   >
//                     <CheckCircle className="w-4 h-4 mr-1" />
//                     Strong Areas
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {strongAreas.map((area, index) => (
//                       <span
//                         key={index}
//                         className={`px-2 py-1 rounded text-xs font-medium
//                           ${
//                             darkMode
//                               ? "bg-green-900/30 text-green-200 border border-green-700"
//                               : "bg-green-50 text-green-700 border border-green-200"
//                           }`}
//                       >
//                         {area}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {weakAreas.length > 0 && (
//                 <div>
//                   <h4
//                     className={`text-sm font-medium mb-2 flex items-center ${darkMode ? "text-amber-400" : "text-amber-600"}`}
//                   >
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     Areas to Improve
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {weakAreas.map((area, index) => (
//                       <span
//                         key={index}
//                         className={`px-2 py-1 rounded text-xs font-medium
//                           ${
//                             darkMode
//                               ? "bg-amber-900/30 text-amber-200 border border-amber-700"
//                               : "bg-amber-50 text-amber-700 border border-amber-200"
//                           }`}
//                       >
//                         {area}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         {/* Recommended Resources */}
//         {resources && resources.length > 0 && (
//           <motion.div
//             variants={cardVariants}
//             className={`p-6 rounded-xl border mb-6 ${
//               darkMode
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200 shadow-sm"
//             }`}
//           >
//             <h3
//               className={`text-lg font-medium mb-4 flex items-center ${
//                 darkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               <Lightbulb className="w-5 h-5 mr-2" />
//               Recommended Resources
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {resources.map((resource, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 rounded-lg border ${
//                     darkMode
//                       ? "bg-gray-700 border-gray-600"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-start">
//                     <div
//                       className={`p-2 rounded-lg mr-3 ${
//                         darkMode ? "bg-gray-600" : "bg-blue-50"
//                       }`}
//                     >
//                       {resource.type === "article" && (
//                         <BookOpen
//                           className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
//                         />
//                       )}
//                       {resource.type === "course" && (
//                         <Play
//                           className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
//                         />
//                       )}
//                       {resource.type === "exercises" && (
//                         <PlusCircle
//                           className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
//                         />
//                       )}
//                     </div>
//                     <div>
//                       <h4
//                         className={`font-medium mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}
//                       >
//                         {resource.title}
//                       </h4>
//                       <p
//                         className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                       >
//                         {resource.type.charAt(0).toUpperCase() +
//                           resource.type.slice(1)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Action buttons */}
//         <div className="flex justify-center gap-4 mt-8">
//           <Button
//             variant="outline"
//             onClick={resetQuiz}
//             className={`px-6 py-3 flex items-center ${
//               darkMode
//                 ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
//                 : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Create New Quiz
//           </Button>

//           <Button
//             onClick={() => {
//               toast.success("Quiz results saved to your profile");
//             }}
//             className="px-6 py-3 flex items-center bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             <Database className="w-4 h-4 mr-2" />
//             View All Results
//           </Button>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
//       } transition-colors duration-200`}
//     >
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header with theme toggle */}
//         <div className="flex justify-between items-center mb-8">
//           <h1
//             className={`text-2xl font-bold ${
//               darkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             Interactive Quiz Platform
//           </h1>
//           <button
//             onClick={toggleTheme}
//             className={`p-2 rounded-full ${
//               darkMode
//                 ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
//                 : "bg-white text-blue-600 hover:bg-gray-100 shadow-sm"
//             }`}
//           >
//             {darkMode ? (
//               <Sun className="w-5 h-5" />
//             ) : (
//               <Moon className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {/* Main content */}
//         {!quizStarted && renderQuizSetupUI()}
//         {quizStarted && renderQuizUI()}
//       </div>
//     </div>
//   );
// }

import React from "react";

const _new_page = () => {
  return <div>_new_page</div>;
};

export default _new_page;
