"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  CheckCircle,
  ChevronDown,
  Code,
  Coffee,
  LogIn,
  MessageSquare,
  Mic,
  MoveRight,
  UserCircle,
  Users,
  Sparkles,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cloneElement, useEffect, useState } from "react";
import FeatureCard from "../components/FeatureCard";
import TrustedCompanies from "../components/TrustedCompanies";
import StickyHeroSection from "./(root)/_components/HeroSection";
import { useTheme } from "next-themes";
import Enhanced3DHeroSection from "./(root)/_components/HeroSection";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  const numberOfDots = 20;
  const navigate = useRouter();
  const tagline = "Unlock Your Interview Potential";
  const appName = "Interviewly";

  return (
    <div className="min-h-screen overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 "></div>
      </div>

      <Enhanced3DHeroSection />

      <div className="h-screen relative z-10 bg-transparent" />

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [0, 10, 10, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          times: [0, 0.3, 0.7, 1],
        }}
        style={{ display: isScrolled ? "none" : "block" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2 font-medium">
            Discover More
          </span>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={20} className="text-white" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-sm min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
        <section className="pt-20 pb-20 md:pt-40 md:pb-28" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Enhanced Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <Sparkles size={16} className="text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">
                    AI-Powered Interview Platform
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">
                    Revolutionary
                  </span>{" "}
                  Technical Interviews
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Experience next-generation technical interviews with
                  AI-powered insights, crystal-clear video calls, and seamless
                  code collaboration—all in one beautifully designed platform.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {user == null ? (
                    <SignInButton>
                      <Button
                        size="lg"
                        className="relative overflow-hidden rounded-2xl px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
                        onClick={() => {}}
                      >
                        <span className="relative z-10 flex items-center">
                          Start Free Trial
                          <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Zap size={18} />
                          </motion.div>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      size="lg"
                      className="relative overflow-hidden rounded-2xl px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
                      onClick={() => {
                        navigate.push("/home");
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={18} />
                        </motion.div>
                      </span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-8 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-blue-500 transition-all duration-300 group"
                  >
                    <Play
                      size={18}
                      className="mr-2 group-hover:text-blue-400"
                    />
                    Watch Demo
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="flex gap-8 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50K+</div>
                    <div className="text-sm text-slate-400">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-slate-400">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-slate-400">Uptime</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="relative">
                  {/* Enhanced 3D Interview UI */}
                  <motion.div
                    className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-slate-700/50"
                    initial={{ rotateY: 15, rotateX: -10 }}
                    animate={{ rotateY: 0, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      rotateY: -5,
                      rotateX: 5,
                      scale: 1.02,
                      transition: { duration: 0.5 },
                    }}
                  >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>

                    <div className="relative bg-slate-900/90 rounded-2xl overflow-hidden shadow-lg border border-slate-700/50">
                      {/* Enhanced Header */}
                      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-white text-xs font-medium flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Senior Developer Interview - InterViewly
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={16} className="text-green-400" />
                          <span className="text-xs text-green-400">Secure</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 h-64">
                        {/* Enhanced Code Editor */}
                        <div className="col-span-3 border-r border-slate-700 p-4 bg-slate-900">
                          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono h-full overflow-hidden border border-slate-700">
                            <div className="text-green-400 mb-2">
                              // AI-Suggested: Optimized algorithm
                            </div>
                            <div className="text-blue-400 mb-1">
                              function findDuplicates(array) {"{"}
                            </div>
                            <div className="ml-4 text-slate-300">
                              const seen = new Set();
                            </div>
                            <div className="ml-4 text-slate-300">
                              const duplicates = new Set();
                            </div>
                            <div className="ml-4 mt-2">
                              <span className="text-purple-400">for</span>
                              <span className="text-slate-300"> (</span>
                              <span className="text-orange-400">const</span>
                              <span className="text-slate-300"> item </span>
                              <span className="text-purple-400">of</span>
                              <span className="text-slate-300">
                                {" "}
                                array) {"{"}
                              </span>
                            </div>
                            <div className="ml-8 text-slate-300">
                              <span className="text-purple-400">if</span>
                              <span className="text-slate-300">
                                {" "}
                                (seen.has(item)) {"{"}
                              </span>
                            </div>
                            <div className="ml-12 text-slate-300">
                              duplicates.add(item);
                            </div>
                            <div className="ml-8 text-slate-300">
                              {"}"}{" "}
                              <span className="text-purple-400">else</span>{" "}
                              {"{"}
                            </div>
                            <div className="ml-12 text-slate-300">
                              seen.add(item);
                            </div>
                            <div className="ml-8 text-slate-300">{"}"}</div>
                            <div className="ml-4 text-slate-300">{"}"}</div>
                            <div className="ml-4 mt-2 text-purple-400">
                              return [...duplicates];
                            </div>
                            <div className="text-blue-400">{"}"}</div>
                            {/* AI Suggestion */}
                            <div className="mt-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded text-purple-300 text-xs">
                              ✨ AI: Consider using Map for better performance
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Video Section */}
                        <div className="col-span-2 grid grid-rows-2 bg-slate-800">
                          <div className="p-2 border-b border-slate-700 relative">
                            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg h-full w-full flex items-center justify-center relative overflow-hidden">
                              <Avatar className="w-12 h-12 border-2 border-purple-400">
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
                                  <UserCircle
                                    size={24}
                                    className="text-white"
                                  />
                                </AvatarFallback>
                              </Avatar>
                              {/* Speaking indicator */}
                              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse delay-150"></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg h-full w-full flex items-center justify-center relative overflow-hidden">
                              <Avatar className="w-12 h-12 border-2 border-blue-400">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500">
                                  <UserCircle
                                    size={24}
                                    className="text-white"
                                  />
                                </AvatarFallback>
                              </Avatar>
                              {/* Mute indicator */}
                              <div className="absolute top-2 right-2">
                                <Mic size={12} className="text-slate-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Floating Elements */}
                  <motion.div
                    className="absolute -top-8 -right-2 bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg backdrop-blur-sm"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                  >
                    <Code size={24} className="text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg backdrop-blur-sm"
                    animate={{
                      y: [0, 10, 0],
                      // rotation: [0, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      delay: 1,
                    }}
                  >
                    <Camera size={24} className="text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-8 bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg shadow-lg backdrop-blur-sm"
                    animate={{
                      x: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      delay: 0.5,
                    }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <TrustedCompanies />

        {/* Enhanced Features Section */}
        <section className="py-20 md:py-32" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Star size={16} className="text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">
                  Powerful Features
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Everything You Need for Technical Interviews
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Our platform streamlines the entire interview process from
                scheduling to evaluation, saving you time and helping you find
                the best talent.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <EnhancedFeatureCard
                icon={<Camera />}
                title="Crystal-Clear Video"
                description="High-definition video calls with minimal latency, perfect for face-to-face interviews regardless of location."
                gradient="from-purple-500 to-pink-500"
              />
              <EnhancedFeatureCard
                icon={<Code />}
                title="Live Code Editor"
                description="Real-time collaborative code editor with syntax highlighting for over 30 programming languages."
                gradient="from-blue-500 to-cyan-500"
              />
              <EnhancedFeatureCard
                icon={<Sparkles />}
                title="AI-Powered Insights"
                description="Intelligent analysis of candidate performance with automated scoring and detailed feedback reports."
                gradient="from-green-500 to-emerald-500"
              />
              <EnhancedFeatureCard
                icon={<Calendar />}
                title="Smart Scheduling"
                description="Automated scheduling with calendar integration and time zone detection to eliminate booking hassles."
                gradient="from-orange-500 to-red-500"
              />
              <EnhancedFeatureCard
                icon={<Users />}
                title="Panel Interviews"
                description="Host multi-interviewer sessions with role-based permissions and private feedback channels."
                gradient="from-violet-500 to-purple-500"
              />
              <EnhancedFeatureCard
                icon={<Shield />}
                title="Enterprise Security"
                description="Bank-level security with end-to-end encryption, SSO integration, and compliance certifications."
                gradient="from-teal-500 to-blue-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section
          className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm"
          id="about"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                How InterViewly Works
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Our streamlined process makes technical interviews efficient and
                effective
              </p>
            </motion.div>

            <div className="relative">
              {/* Enhanced Connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-500 hidden md:block rounded-full"></div>

              <div className="space-y-12 md:space-y-0">
                <EnhancedStepItem
                  number="01"
                  title="Schedule Interview"
                  description="Send automatic invitations with custom interview details and let candidates pick from your available time slots."
                  isLeft={true}
                  gradient="from-blue-500 to-indigo-500"
                />

                <EnhancedStepItem
                  number="02"
                  title="Conduct Interview"
                  description="Join the video interview with access to code editor, virtual whiteboard, and customizable question templates."
                  isLeft={false}
                  gradient="from-blue-500 to-cyan-500"
                />

                <EnhancedStepItem
                  number="03"
                  title="AI Analysis"
                  description="Get instant AI-powered insights on candidate performance, technical skills, and communication abilities."
                  isLeft={true}
                  gradient="from-green-500 to-emerald-500"
                />

                <EnhancedStepItem
                  number="04"
                  title="Review & Decide"
                  description="Access detailed reports, team feedback, and data-driven recommendations to make informed hiring decisions."
                  isLeft={false}
                  gradient="from-orange-500 to-red-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                What Our Users Say
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Join thousands of companies that have transformed their
                technical interview process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EnhancedTestimonialCard
                quote="InterViewly has revolutionized our hiring process. The AI insights are incredibly accurate and the candidate experience is outstanding."
                author="Sarah Chen"
                role="CTO, TechVision"
                avatar="SC"
                gradient="from-purple-500 to-pink-500"
              />
              <EnhancedTestimonialCard
                quote="The collaborative features and detailed evaluation tools have helped us make better hiring decisions 3x faster."
                author="Michael Rivera"
                role="Engineering Manager, DataSync"
                avatar="MR"
                gradient="from-blue-500 to-cyan-500"
              />
              <EnhancedTestimonialCard
                quote="We've increased our technical hire quality by 60% since switching to InterViewly. The platform is a game-changer."
                author="Aisha Johnson"
                role="HR Director, CloudNative"
                avatar="AJ"
                gradient="from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 -mx-8 bg-gradient-to-br from-blue-900/50 via-indigo-900/30 to-blue-900/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-1 shadow-2xl border border-slate-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Glowing border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-blue-500/30 rounded-3xl blur-xl"></div>

              <div className="relative bg-slate-900/90 rounded-3xl p-8 md:p-12">
                <div className="text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Ready to Transform Your Technical Interviews?
                  </motion.h2>

                  <motion.p
                    className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Join thousands of companies already using InterViewly to
                    hire better, faster, and smarter.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {user == null ? (
                      <SignInButton>
                        <Button
                          size="lg"
                          className="relative overflow-hidden rounded-2xl px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
                        >
                          <span className="relative z-10 flex items-center">
                            Start Your Free Trial
                            <motion.div
                              className="ml-2"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight size={18} />
                            </motion.div>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>
                      </SignInButton>
                    ) : (
                      <Button
                        size="lg"
                        className="relative overflow-hidden rounded-2xl px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
                        onClick={() => navigate.push("/home")}
                      >
                        <span className="relative z-10 flex items-center">
                          Get Started Now
                          <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight size={18} />
                          </motion.div>
                        </span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-8 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-blue-500 transition-all duration-300"
                    >
                      Schedule Demo
                    </Button>
                  </motion.div>

                  <motion.div
                    className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Cancel anytime</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-slate-900 border-t -mx-8 border-slate-800 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mr-3"></div>
                  <span className="text-xl font-bold text-white">
                    InterViewly
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Revolutionizing technical interviews with AI-powered insights
                  and seamless collaboration.
                </p>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    GitHub
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      API
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-slate-400 text-sm">
                © 2024 InterViewly. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-400" />
                  <span className="text-slate-400 text-sm">
                    SOC 2 Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-slate-400 text-sm">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Enhanced Feature Card Component
function EnhancedFeatureCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 relative z-10`}
        >
          {cloneElement(icon, { size: 24, className: "text-white" })}
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
          {title}
        </h3>
        <p className="text-slate-300 leading-relaxed relative z-10">
          {description}
        </p>

        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <MoveRight size={20} className="text-purple-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Step Item Component
function EnhancedStepItem({ number, title, description, isLeft, gradient }) {
  return (
    <motion.div
      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="md:w-1/2">
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <span className="text-white font-bold text-lg">{number}</span>
        </div>
        {/* Connection dot */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
      </div>

      <div className="md:w-1/2 hidden md:block"></div>
    </motion.div>
  );
}

// Enhanced Testimonial Card Component
function EnhancedTestimonialCard({ quote, author, role, avatar, gradient }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10">
          <div className="mb-4">
            <MessageSquare size={24} className="text-purple-400" />
          </div>

          <blockquote className="text-slate-300 mb-6 italic leading-relaxed">
            "{quote}"
          </blockquote>

          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback
                className={`bg-gradient-to-br ${gradient} text-white font-semibold`}
              >
                {avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-white font-semibold">{author}</div>
              <div className="text-slate-400 text-sm">{role}</div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star size={16} className="text-yellow-400 fill-current" />
        </div>
      </div>
    </motion.div>
  );
}