"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRoles } from "@/hooks/useUserRoles";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MeetingModal from "@/components/MeetingModal";

const Home = () => {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto mt-24 flex items-center my-20 justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-4 border-t-purple-600 border-b-blue-500 border-l-purple-400 border-r-blue-300 rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60 pb-12 my-6">
      <div className="container max-w-7xl mx-auto pt-16 px-4 sm:px-6">
        {/* WELCOME SECTION */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl bg-card border border-border/40 shadow-lg mb-12 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <div className="p-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            >
              Welcome back!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground mt-3 text-lg"
            >
              {isInterviewer
                ? "Manage your interviews and review candidates effectively"
                : "Access your upcoming interviews and preparations"}
            </motion.p>
          </div>
        </motion.div> */}
        {/* 
        actual code will be implemented in the next commit. */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="rounded-xl bg-card border border-border/40 shadow-xl mb-12 overflow-hidden relative"
        >
          {/* Decorative elements - color changes based on theme */}
          <motion.div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-200/50 dark:bg-purple-900/30 mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-60"
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
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-purple-300/50 dark:bg-purple-800/30 mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-60"
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
            className="h-2 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"
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
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-lg shadow-lg">
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
                    <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent no-underline">
                      Welcome back!
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
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
                  className="text-muted-foreground mt-4 text-lg max-w-lg"
                >
                  {isInterviewer
                    ? "Manage your interviews and review candidates effectively"
                    : "Access your upcoming interviews and preparations"}
                </motion.p>

                {/* Additional information with staggered reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300"
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </motion.div>
                    <span>Your data is secure and updated in real-time</span>
                  </div>
                </motion.div>
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
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                  >
                    {isInterviewer
                      ? "Review Candidates"
                      : "Prepare for Interview"}
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
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                  >
                    View Dashboard
                  </Button>
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
                  label: isInterviewer
                    ? "Scheduled Interviews"
                    : "Upcoming Interviews",
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                  color: "bg-purple-600 dark:bg-purple-700",
                },
                {
                  label: isInterviewer
                    ? "Candidates Reviewed"
                    : "Practice Sessions",
                  value: "24",
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
                  color: "bg-purple-500 dark:bg-purple-600",
                },
                {
                  label: isInterviewer ? "Feedback Given" : "Skills Improved",
                  value: "16",
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
                  color: "bg-purple-700 dark:bg-purple-800",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="p-4 flex items-center gap-4 h-full">
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
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CONTENT SECTION */}
        <div className="mt-12">
          {isInterviewer ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
                  <span className="h-6 w-1.5 bg-purple-600 rounded-full mr-3"></span>
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
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold flex items-center">
                  <span className="h-6 w-1.5 bg-purple-600 rounded-full mr-3"></span>
                  Your Interviews
                </h2>
                <p className="text-muted-foreground mt-2 ml-4 text-lg">
                  View and join your scheduled interviews
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 p-8 rounded-xl bg-card border border-border/40 shadow-md text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-purple-600 dark:text-purple-400"
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
                  No upcoming interviews
                </h3>
                <p className="text-muted-foreground mt-2">
                  When interviews are scheduled, they will appear here
                </p>
                <button className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                  Check Schedule
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
