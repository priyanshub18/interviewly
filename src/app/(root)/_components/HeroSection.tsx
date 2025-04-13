"use client";
import { motion } from "framer-motion";
import {
  Code,
  Calendar,
  Camera,
  MessageSquare,
  Users,
  Mic,
  Coffee,
  ArrowRight,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const StickyHeroSection = ({
  appName = "Interviewly",
  tagline = "Unlock Your Interview Potential",
  primaryblue = "#3b82f6",
}) => {
  const commonIconSize = 24;
  const numberOfDots = 30;

  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const taglineVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const router = useRouter();
  const icons = [Calendar, Camera, MessageSquare, Users];

  const appNameVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const featuresVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.8 },
    },
  };

  const featureItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Calculate opacity based on scroll position
  const calculateOpacity = () => {
    const opacity = Math.max(0, 1 - scrollY / 1000);
    return opacity;
  };

  // Features data
  const features = [
    {
      title: "AI-Powered Interview Prep",
      description:
        "Generate personalized interview questions, simulate mock interviews, and get instant feedback using cutting-edge AI.",
    },
    {
      title: "Screen Sharing & Interview Mode",
      description:
        "Seamlessly conduct mock or real interviews with built-in screen sharing, timed questions, and evaluation tools.",
    },
    {
      title: "Sending Mail to Candidates",
      description:
        "Send personalized emails to candidates with their reminders, interview notes, and performance metrics.",
    },

    {
      title: "Session Review Mechanism",
      description:
        "Revisit your interview recordings, AI-generated transcripts, and performance reviews to improve iteratively.",
    },
  ];

  return (
    <>
      {/* Sticky container */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          {/* Main Content at Top - fades as you scroll */}
          <div
            className="text-center pt-20 md:pt-24 relative z-10"
            style={{ opacity: calculateOpacity() }}
          >
            <motion.h2
              className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2"
              initial="initial"
              animate="animate"
              variants={taglineVariants}
            >
              {tagline}
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12"
              initial="initial"
              animate="animate"
              variants={appNameVariants}
              whileHover="hover"
              style={{ cursor: "default", color: primaryblue }}
            >
              {appName}
            </motion.h1>

            {/* Add CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 pointer-events-auto"
                onClick={() => router.push("/home")}
              >
                Scroll More to Know <ArrowDown size={16} className="ml-2" />
              </button>
            </motion.div>

            {/* Add feature highlights in the middle */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 px-4"
              variants={featuresVariants}
              initial="initial"
              animate="animate"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
                  variants={featureItemVariants}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800/40 p-4 rounded-xl mr-4 shadow-md group-hover:shadow-blue-400/40 transition-all duration-300">
                      <div className="text-blue-500 dark:text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]">
                        {React.createElement(icons[index % 4], {
                          size: 28,
                          className:
                            "transition-transform duration-300 group-hover:scale-110",
                        })}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Optional Glow Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 rounded-2xl blur-md pointer-events-none transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
          </div>

          {/* Icons positioned at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 md:h-2/5 overflow-visible">
            {/* Animated Icons - all positioned in lower part */}
            <motion.div
              className="absolute bottom-24 right-16 md:right-24"
              animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                <Code size={commonIconSize} className="text-primary-500" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-36 right-32 md:right-48"
              animate={{ y: [-5, 5, -5], rotate: [5, -5, 5] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-md">
                <Calendar size={commonIconSize} className="text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-48 left-1/4 md:left-1/3"
              animate={{ y: [-8, 8, -8], rotate: [-7, 7, -7] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                <Camera size={commonIconSize} className="text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-12 md:left-16"
              animate={{ y: [4, -4, 4], rotate: [2, -2, 2] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1.5,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                <MessageSquare
                  size={commonIconSize}
                  className="text-green-400"
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2"
              animate={{ y: [-3, 10, -3], x: [5, -5, 5], rotate: [-2, 2, -2] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-md">
                <Users size={commonIconSize} className="text-blue-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-40 right-1/4 md:right-1/3"
              animate={{ y: [6, -10, 6], rotate: [3, -3, 3] }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.7,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                <Mic size={commonIconSize} className="text-red-400" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-24 left-24 md:left-40"
              animate={{ y: [-5, 8, -5], rotate: [-4, 4, -4] }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1.2,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                <Coffee size={commonIconSize} className="text-amber-400" />
              </div>
            </motion.div>

            {/* Floating dots confined to bottom section */}
            {[...Array(numberOfDots)].map((_, i) => {
              const startTop = 50 + Math.random() * 40;
              const startLeft = Math.random() * 100;
              const size = 3 + Math.random() * 5;
              const hue = Math.random() * 360;
              const opacity = 0.4 + Math.random() * 0.3;
              const duration = 15 + Math.random() * 15;
              const yOffset =
                Math.random() > 0.5 ? -Math.random() * 40 : Math.random() * 40;
              const xOffset =
                Math.random() > 0.5 ? -Math.random() * 30 : Math.random() * 30;

              return (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute rounded-full"
                  style={{
                    bottom: `${startTop}%`,
                    left: `${startLeft}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `hsl(${hue}, 60%, 70%)`,
                    opacity: opacity,
                  }}
                  animate={{
                    y: [yOffset * 0.5, yOffset, yOffset * 0.5],
                    x: [xOffset * 0.5, xOffset, xOffset * 0.5],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              );
            })}
          </div>

          {/* Background gradient circles in bottom area */}
          <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-primary-400/10 blur-2xl" />
          <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl" />
          <div className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full bg-blue-400/10 blur-2xl" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        {/* Animated particles - confined to bottom half */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const startTop = Math.random() * 80;
            const startLeft = Math.random() * 100;
            const size = 1 + Math.random() * 3;
            const opacity = 0.15 + Math.random() * 0.25;
            const duration = 20 + Math.random() * 25;
            const yOffset =
              Math.random() > 0.5 ? -Math.random() * 60 : Math.random() * 60;
            const xOffset =
              Math.random() > 0.5 ? -Math.random() * 40 : Math.random() * 40;
            let backgroundColor;
            if (i % 3 === 0)
              backgroundColor = "#6366f1"; // indigo
            else if (i % 3 === 1)
              backgroundColor = "#a855f7"; // purple
            else backgroundColor = "#3b82f6"; // blue

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  bottom: `${startTop}%`,
                  left: `${startLeft}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: backgroundColor,
                  opacity: opacity,
                }}
                animate={{
                  y: [yOffset * 0.5, yOffset, yOffset * 0.5],
                  x: [xOffset * 0.5, xOffset, xOffset * 0.5],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StickyHeroSection;
