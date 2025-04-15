"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  Calendar,
  BarChart3,
  Clock,
  ArrowUpRight,
  Award,
  Loader,
  PlusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function QuizHistory() {
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const { theme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [quizHistory, setUserQuizHistory] = useState([]);

  // Check for dark mode on component mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  // Safely fetch quiz data once user is loaded
  const quizSummariesResult = useQuery(
    api.quizzes.getQuizSummaries,
    userLoaded && user ? { userId: user.id } : "skip",
  );

  // Handle loading states and quiz data
  useEffect(() => {
    // If user isn't loaded yet or query is in progress, keep loading state
    if (!userLoaded || quizSummariesResult === undefined) {
      setIsLoading(true);
      return;
    }

    // Data has been fetched
    // @ts-ignore
    if (quizSummariesResult !== "skip") {
      setIsLoading(false);
      // Check if the data contains summaries before setting state
      if (quizSummariesResult && quizSummariesResult.summaries) {
        setUserQuizHistory(quizSummariesResult.summaries);
      } else {
        // Handle the case where summaries is undefined
        setUserQuizHistory([]);
        console.warn("No quiz summaries returned from API");
      }
    }
  }, [userLoaded, quizSummariesResult]);

  // Theme configuration
  const theme2 = {
    dark: {
      bg: "",
      card: {
        bg: "bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-900/30 shadow-xl shadow-blue-500/5",
        highlight:
          "bg-gradient-to-br from-blue-700 to-indigo-800 shadow-lg shadow-blue-500/20",
        badge: "bg-indigo-900/50 text-indigo-300 border border-indigo-700/50",
        badgeSuccess:
          "bg-green-900/50 text-green-300 border border-green-700/50",
        badgeWarning:
          "bg-amber-900/50 text-amber-300 border border-amber-700/50",
      },
      button: {
        primary:
          "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
        secondary:
          "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
      },
      text: {
        primary: "text-white",
        secondary: "text-blue-200",
        muted: "text-slate-400",
      },
      input:
        "bg-slate-900 border-slate-700 text-blue-200 focus:border-blue-500 focus:ring-blue-500",
      modal: "bg-slate-900 border border-blue-800",
    },
    light: {
      bg: "",
      card: {
        bg: "bg-white border border-blue-100 shadow-xl shadow-blue-100/30",
        highlight:
          "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-200/50",
        badge: "bg-indigo-100 text-indigo-700 border border-indigo-200",
        badgeSuccess: "bg-green-100 text-green-700 border border-green-200",
        badgeWarning: "bg-amber-100 text-amber-700 border border-amber-200",
      },
      button: {
        primary:
          "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200",
        secondary:
          "bg-white hover:bg-gray-50 text-blue-800 border border-blue-200 shadow-sm",
      },
      text: {
        primary: "text-gray-900",
        secondary: "text-blue-600",
        muted: "text-gray-500",
      },
      input:
        "bg-white border-blue-300 text-blue-800 focus:border-blue-500 focus:ring-blue-500",
      modal: "bg-white border border-blue-200",
    },
  };

  const currentTheme = theme === "dark" ? theme2.dark : theme2.light;

  // Filter functions
  const filterQuizzes = () => {
    // Return empty array if no quiz history
    if (!quizHistory || quizHistory.length === 0) {
      return [];
    }

    let filtered = [...quizHistory];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (quiz) =>
          (quiz.title && quiz.title.toLowerCase().includes(query)) ||
          (quiz.category && quiz.category.toLowerCase().includes(query)),
      );
    }

    // Apply time filter
    const now = new Date();
    if (selectedFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (quiz) => quiz.completedOn && new Date(quiz.completedOn) >= weekAgo,
      );
    } else if (selectedFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (quiz) => quiz.completedOn && new Date(quiz.completedOn) >= monthAgo,
      );
    } else if (selectedFilter === "high-scores") {
      filtered = filtered.filter((quiz) => quiz.score && quiz.score > 85);
    } else if (selectedFilter === "needs-improvement") {
      filtered = filtered.filter((quiz) => quiz.score && quiz.score < 80);
    }

    // Sort by most recent
    return filtered.sort((a, b) => {
      if (!a.completedOn || !b.completedOn) return 0;
      return (
        new Date(b.completedOn).getTime() - new Date(a.completedOn).getTime()
      );
    });
  };

  const filteredQuizzes = filterQuizzes();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const getScoreColor = (score) => {
    if (!score) return "text-gray-500";
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const navigateToQuizDetail = (quizId) => {
    if (!quizId) {
      console.error("Cannot navigate to quiz with undefined ID");
      return;
    }
    router.push(`/quiz/history/${quizId}`);
  };

  // Show auth state if user not loaded
  if (!userLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg">Loading your account...</p>
      </div>
    );
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
        <p className="mb-6">Please sign in to view your quiz history</p>
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`mt-16 ${currentTheme.bg} transition-colors duration-500 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header with title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between mb-12 gap-4"
        >
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 },
              }}
              className="bg-blue-600 text-white p-3 rounded-2xl"
            >
              <BarChart3 className="w-8 h-8" />
            </motion.div>

            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Your Quizzes
              </h1>
              <p className={`${currentTheme.text.secondary} text-lg`}>
                Track your progress and performance
              </p>
            </div>
          </div>

          {/* Right: Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0"
          >
            <Button
              variant="ghost"
              className="hover:opacity-90 transition-all duration-300"
              style={{ backgroundColor: "#2563eb", color: "white" }}
              onClick={() => router.push("/quiz/create")}
            >
              <PlusCircle className="mr-2" />
              Create Another Quiz
            </Button>
          </motion.div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className={`pl-10 pr-4 py-3 w-full rounded-xl ${currentTheme.input} border outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap justify-end w-full md:w-auto">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "all"
                    ? "bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setSelectedFilter("week")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "week"
                    ? "bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setSelectedFilter("month")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "month"
                    ? "bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedFilter("high-scores")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "high-scores"
                    ? "bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                High Scores
              </button>
              <button
                onClick={() => setSelectedFilter("needs-improvement")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "needs-improvement"
                    ? "bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
                }`}
              >
                Needs Improvement
              </button>
            </div>
          </div>

          {/* Results counter */}
          <p className={`${currentTheme.text.secondary} text-sm`}>
            Showing {filteredQuizzes.length}{" "}
            {filteredQuizzes.length === 1 ? "quiz" : "quizzes"}
            {searchQuery ? ` matching "${searchQuery}"` : null}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className={`${currentTheme.text.secondary} text-lg`}>
              Loading your quiz history...
            </p>
          </div>
        )}

        {/* Error State for Convex Query */}
        {quizSummariesResult instanceof Error && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
              <p className="font-bold">Error loading quiz data</p>
              <p>{quizSummariesResult.message || "Please try again later."}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Quiz History List */}
        {!isLoading && !(quizSummariesResult instanceof Error) && (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${currentTheme.card.bg} rounded-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer`}
                  onClick={() => navigateToQuizDetail(quiz.id)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left color bar to indicate score */}
                    <div
                      className="md:w-2 w-full h-2 md:h-auto"
                      style={{
                        backgroundColor: !quiz.score
                          ? "#6B7280"
                          : quiz.score >= 90
                            ? "#10B981"
                            : quiz.score >= 80
                              ? "#3B82F6"
                              : quiz.score >= 70
                                ? "#F59E0B"
                                : "#EF4444",
                      }}
                    />

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full p-6">
                      {/* Quiz title and info */}
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${currentTheme.card.badge}`}
                          >
                            {quiz.category || "Uncategorized"}
                          </span>
                          <span
                            className={`ml-2 text-sm ${currentTheme.text.muted}`}
                          >
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(quiz.completedOn)}
                          </span>
                        </div>

                        <h3
                          className={`text-xl font-bold ${currentTheme.text.primary} mb-2`}
                        >
                          {quiz.title || "Untitled Quiz"}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {quiz.badges &&
                            quiz.badges.map((badge) => (
                              <span
                                key={badge}
                                className={`px-2 py-1 rounded-md text-xs ${currentTheme.card.badgeSuccess}`}
                              >
                                {badge}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Quiz stats */}
                      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4 md:mt-0">
                        <div className="text-center p-3 rounded-lg bg-blue-500/10">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(quiz.score)}`}
                          >
                            {quiz.score ?? "N/A"}%
                          </div>
                          <div className={`text-xs ${currentTheme.text.muted}`}>
                            Score
                          </div>
                        </div>

                        <div className="text-center p-3 rounded-lg bg-blue-500/10">
                          <div
                            className={`text-xl font-semibold ${currentTheme.text.primary}`}
                          >
                            {quiz.totalQuestions ?? "0"}
                          </div>
                          <div className={`text-xs ${currentTheme.text.muted}`}>
                            Questions
                          </div>
                        </div>

                        <div className="text-center p-3 rounded-lg bg-blue-500/10">
                          <div
                            className={`text-xl font-semibold ${currentTheme.text.primary}`}
                          >
                            <Clock className="w-4 h-4 inline mr-1" />
                            {quiz.timeSpent || "N/A"}
                          </div>
                          <div className={`text-xs ${currentTheme.text.muted}`}>
                            Time
                          </div>
                        </div>

                        {quiz.improvement !== undefined &&
                          quiz.improvement !== 0 && (
                            <div className="text-center p-3 rounded-lg bg-blue-500/10">
                              <div
                                className={`text-xl font-semibold ${quiz.improvement > 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {quiz.improvement > 0 ? "+" : ""}
                                {quiz.improvement}%
                              </div>
                              <div
                                className={`text-xs ${currentTheme.text.muted}`}
                              >
                                vs. Previous
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Arrow icon */}
                      <div
                        className={`ml-2 mt-4 md:mt-0 ${currentTheme.text.secondary}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !(quizSummariesResult instanceof Error) &&
          filteredQuizzes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-20 ${currentTheme.text.secondary}`}
            >
              <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold">No quiz history found</h3>
              <p className="mt-2">
                {searchQuery || selectedFilter !== "all"
                  ? "Try changing your search or selecting a different filter"
                  : "You haven't taken any quizzes yet. Start learning!"}
              </p>
            </motion.div>
          )}
      </div>
    </div>
  );
}
