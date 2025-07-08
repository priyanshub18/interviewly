"use client";

import ActionCard from "@/app/(root)/_components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRoles } from "@/hooks/useUserRoles";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MeetingModal from "@/app/(root)/meeting/_components/MeetingModal";
import MeetingCard from "@/components/MeetingCard";
import { Badge } from "@/components/ui/badge";
import { groupCandidateInterviews } from "@/lib/utils";
import { useTheme } from "next-themes";

const Home = () => {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const { theme } = useTheme();
  const interviews = useQuery(api.interviews.getMyInterviewsWithInterviewers);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  const [expandPassed, setExpandPassed] = useState(false);
  const [expandFailed, setExpandFailed] = useState(false);

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
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
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto mt-24 flex items-center my-20 justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-4 border-t-blue-600 border-b-blue-500 border-l-blue-400 border-r-blue-300 rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is interviewer, redirect to admin dashboard
  if (isInterviewer) {
    router.push("/dashboard");
    return null;
  }

  const groupedInterviews = groupCandidateInterviews(interviews || []);

  return (
    <div className="mt-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Flashcard-style Header */}
        <div className="relative flex flex-col items-center justify-center mb-12 mt-4">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-black/80 border border-blue-600/40 rounded-full px-6 py-3 mb-6 backdrop-blur-xl shadow-lg shadow-blue-600/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <div className="absolute inset-0 animate-ping">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400 opacity-20"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-blue-300 font-semibold tracking-wide">
              Interview Dashboard
            </span>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Interviews
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-blue-300 mb-2 leading-relaxed max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Track and manage all your interview sessions in one place.
          </motion.p>
        </div>

        {/* Quick Actions Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-12"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
              <span className="h-6 w-1.5 bg-blue-600 rounded-full mr-3"></span>
              Quick Actions
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {QUICK_ACTIONS.map((action, index) => (
              <motion.div
                key={action.title}
                variants={itemVariants}
                custom={index}
              >
                <ActionCard
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              </motion.div>
            ))}
          </motion.div>
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </motion.div>

        {/* Interview Sections */}
        <div className="space-y-12">
          {/* UPCOMING INTERVIEWS */}
          {groupedInterviews.upcoming?.length > 0 && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="border-l-4 pl-4 border-blue-500 dark:border-blue-400"
            >
              <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
                <h2 className="text-2xl font-semibold">Upcoming Interviews</h2>
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {groupedInterviews.upcoming.length}
                </Badge>
              </motion.div>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
                {groupedInterviews.upcoming.map((interview) => (
                  <motion.div 
                    key={interview._id} 
                    variants={itemVariants} 
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <MeetingCard 
                      interview={interview} 
                      isCandidateView={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* COMPLETED INTERVIEWS */}
          {groupedInterviews.completed?.length > 0 && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="border-l-4 pl-4 border-gray-400 dark:border-blue-400"
            >
              <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
                <h2 className="text-2xl font-semibold">Completed Interviews</h2>
                <Badge className="bg-gray-600 hover:bg-blue-700">
                  {groupedInterviews.completed.length}
                </Badge>
              </motion.div>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
                {groupedInterviews.completed.map((interview) => (
                  <motion.div 
                    key={interview._id} 
                    variants={itemVariants} 
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <MeetingCard 
                      interview={interview} 
                      isCandidateView={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* PASSED INTERVIEWS */}
          {groupedInterviews.passed?.length > 0 && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="border-l-4 pl-4 border-green-500 dark:border-green-400"
            >
              <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
                <h2 className="text-2xl font-semibold">Passed Interviews</h2>
                <Badge className="bg-green-600 hover:bg-green-700">
                  {groupedInterviews.passed.length}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="ml-2" 
                  onClick={() => setExpandPassed((v) => !v)}
                >
                  {expandPassed ? "Collapse" : "Expand"}
                </Button>
              </motion.div>
              {expandPassed && (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
                  {groupedInterviews.passed.map((interview) => (
                    <motion.div 
                      key={interview._id} 
                      variants={itemVariants} 
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <MeetingCard 
                        interview={interview} 
                        isCandidateView={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>
          )}

          {/* FAILED INTERVIEWS */}
          {groupedInterviews.failed?.length > 0 && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="border-l-4 pl-4 border-red-500 dark:border-red-400"
            >
              <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
                <h2 className="text-2xl font-semibold">Failed Interviews</h2>
                <Badge className="bg-red-600 hover:bg-red-700">
                  {groupedInterviews.failed.length}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="ml-2" 
                  onClick={() => setExpandFailed((v) => !v)}
                >
                  {expandFailed ? "Collapse" : "Expand"}
                </Button>
              </motion.div>
              {expandFailed && (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
                  {groupedInterviews.failed.map((interview) => (
                    <motion.div 
                      key={interview._id} 
                      variants={itemVariants} 
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <MeetingCard 
                        interview={interview} 
                        isCandidateView={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>
          )}

          {/* NO INTERVIEWS STATE */}
          {(!interviews || interviews.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 p-8 rounded-xl bg-card border border-border/40 shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-foreground">
                No interviews scheduled
              </h3>
              <p className="text-muted-foreground mt-2">
                When interviews are scheduled, they will appear here
              </p>
              <Button 
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
                onClick={() => router.push("/prepare-interview")}
              >
                Prepare for Interviews
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
