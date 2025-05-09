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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeatureCard from "../components/FeatureCard";
import TrustedCompanies from "../components/TrustedCompanies";
import StickyHeroSection from "./(root)/_components/HeroSection";
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useUser();

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
  const numberOfDots = 20;
  const navigate = useRouter();
  const tagline = "Unlock Your Interview Potential";
  const appName = "Interviewly";
  const primaryblue = "#2563eb"; // Tailwind blue-600
  const accentblue = "#3b82f6";

  const taglineVariants = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const appNameVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };
  const commonIconSize = 24;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden w-full">
      {/* Navbar */}
      {/* <BackgroundAnimation /> */}

      <StickyHeroSection />

      <div className="h-screen relative z-10 bg-transparent" />
      {/* Scroll Down Indicator */}
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
          <span className="text-foreground/70 text-sm mb-2 font-medium">
            Scroll Down
          </span>
          <div className="bg-primary/20 backdrop-blur-sm p-2 rounded-full">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} className="text-primary" />
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Hero Section */}
      <div className="relative z-10 bg-white dark:bg-gray-900 min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
        <section className="pt-20 pb-20 md:pt-40 md:pb-28" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    Seamless
                  </span>{" "}
                  Technical Interviews, Reimagined
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-foreground/70 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Connect with candidates through crystal-clear video calls,
                  real-time code collaboration, and intelligent evaluation
                  tools—all in one platform.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {user == null ? (
                    <SignInButton>
                      <Button
                        size="lg"
                        className="rounded-2xl px-8"
                        onClick={() => {}}
                      >
                        Sign Up
                        <LogIn />
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      size="lg"
                      className="rounded-2xl px-8"
                      onClick={() => {
                        navigate.push("/home");
                      }}
                    >
                      Get Started
                      <MoveRight />
                    </Button>
                  )}

                  {/* <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Watch Demo
                </Button> */}
                </motion.div>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="relative">
                  {/* 3D Effect for App Screenshot */}
                  <motion.div
                    className="bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl p-2 shadow-xl"
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
                    <div className="bg-background rounded-xl overflow-hidden shadow-lg">
                      {/* Fake interview UI */}
                      <div className="bg-gray-800 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-white text-xs">
                          Senior Developer Interview - InterViewly
                        </div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-5 h-64">
                        <div className="col-span-3 border-r border-gray-200 p-4">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs font-mono h-full overflow-hidden">
                            <div className="text-green-600 dark:text-green-400">
                              // Write a function to find duplicates in an array
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 mt-2">
                              function findDuplicates(array) {"{"}
                            </div>
                            <div className="ml-4">const seen = new Set();</div>
                            <div className="ml-4">
                              const duplicates = new Set();
                            </div>
                            <div className="ml-4"></div>
                            <div className="ml-4">
                              for (const item of array) {"{"}
                            </div>
                            <div className="ml-8">
                              if (seen.has(item)) {"{"}
                            </div>
                            <div className="ml-12">duplicates.add(item);</div>
                            <div className="ml-8">
                              {"}"} else {"{"}
                            </div>
                            <div className="ml-12">seen.add(item);</div>
                            <div className="ml-8">{"}"}</div>
                            <div className="ml-4">{"}"}</div>
                            <div className="ml-4"></div>
                            <div className="ml-4">return [...duplicates];</div>
                            <div className="text-blue-600 dark:text-blue-400">
                              {"}"}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 grid grid-rows-2">
                          <div className="p-2 border-b border-gray-200">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-full flex items-center justify-center">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-primary">
                                  <UserCircle size={24} />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-full flex items-center justify-center">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-blue-500">
                                  <UserCircle size={24} />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-8 -right-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                  >
                    <Code size={24} className="text-primary" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      delay: 1,
                    }}
                  >
                    <Camera size={24} className="text-blue-500" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Trusted By Section */}
        {/* <section className="py-16 bg-gradient-to-br from-gray-100/70 to-white dark:from-gray-900 dark:to-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Trusted by Leading Companies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Empowering innovation with global tech leaders
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {["Google", "Microsoft", "Amazon", "Meta", "Spotify"].map(
              (company, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900/60 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl px-8 py-5 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
                    {company}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section> */}
        <TrustedCompanies />
        {/* Features Section */}
        <section className="py-20 md:py-32" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need for Technical Interviews
              </h2>
              <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
                Our platform streamlines the entire interview process from
                scheduling to evaluation, saving you time and helping you find
                the best talent.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white dark:bg-gray-900/60 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <FeatureCard
                icon={<Camera />}
                title="Crystal-Clear Video"
                description="High-definition video calls with minimal latency, perfect for face-to-face interviews regardless of location."
              />
              <FeatureCard
                icon={<Code />}
                title="Live Code Editor"
                description="Real-time collaborative code editor with syntax highlighting for over 30 programming languages."
              />
              <FeatureCard
                icon={<CheckCircle />}
                title="Smart Evaluation"
                description="AI-powered insights and customizable scoring rubrics to objectively evaluate candidate performance."
              />
              <FeatureCard
                icon={<Calendar />}
                title="Seamless Scheduling"
                description="Automated scheduling with calendar integration and time zone detection to eliminate booking hassles."
              />
              <FeatureCard
                icon={<Users />}
                title="Panel Interviews"
                description="Host multi-interviewer sessions with role-based permissions and private feedback channels."
              />
              <FeatureCard
                icon={<MessageSquare />}
                title="Interview Recordings"
                description="Automatically record, transcribe and index interviews for easy reference and team collaboration."
              />
            </motion.div>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How InterViewly Works
              </h2>
              <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
                Our streamlined process makes technical interviews efficient and
                effective
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 hidden md:block"></div>

              <div className="space-y-12 md:space-y-0">
                <StepItem
                  number="01"
                  title="Schedule Interview"
                  description="Send automatic invitations with custom interview details and let candidates pick from your available time slots."
                  isLeft={true}
                />

                <StepItem
                  number="02"
                  title="Conduct Interview"
                  description="Join the video interview with access to code editor, virtual whiteboard, and customizable question templates."
                  isLeft={false}
                />

                <StepItem
                  number="03"
                  title="Evaluate & Collaborate"
                  description="Rate candidates on predefined criteria, add notes, and share results with your team for collaborative decision-making."
                  isLeft={true}
                />

                <StepItem
                  number="04"
                  title="Review & Analyze"
                  description="Access interview recordings, transcripts, and performance metrics to make data-driven hiring decisions."
                  isLeft={false}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
                Join thousands of companies that have transformed their
                technical interview process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="InterViewly has cut our hiring time in half. The coding environment is flawless and candidates love the experience."
                author="Sarah Chen"
                role="CTO, TechVision"
              />
              <TestimonialCard
                quote="The collaborative features and detailed evaluation tools have revolutionized how we assess technical talent."
                author="Michael Rivera"
                role="Engineering Manager, DataSync"
              />
              <TestimonialCard
                quote="We've increased our technical hire quality by 40% since switching to InterViewly. The insights are invaluable."
                author="Aisha Johnson"
                role="HR Director, CloudNative"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 bg-gradient-to-br from-primary/10 via-blue-500/10 to-primary/5"
          id="about"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-1 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-background rounded-3xl p-8 md:p-12">
                <div className="text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Ready to Transform Your Technical Interviews?
                  </motion.h2>

                  <motion.p
                    className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Join thousands of companies that have streamlined their
                    hiring process, improved candidate experience, and made
                    better technical hires with InterViewly.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button size="lg" className="rounded-full px-8">
                      Start Your Free 14-Day Trial
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8"
                    >
                      Request Demo
                    </Button>
                  </motion.div>

                  <motion.p
                    className="text-sm text-foreground/50 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    No credit card required. Cancel anytime.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Footer */}

        <footer
          className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8"
          id="contact"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2 lg:col-span-1">
                <div className="font-medium text-lg flex items-center gap-2 mb-4">
                  <Camera size={24} className="text-primary" />
                  <span className="text-foreground font-bold">InterViewly</span>
                </div>
                <p className="text-foreground/70 mb-4">
                  Transforming the technical interview experience for companies
                  and candidates alike.
                </p>
                <div className="flex space-x-4">
                  <SocialIcon icon={<Coffee size={18} />} />
                  <SocialIcon icon={<Mic size={18} />} />
                  <SocialIcon icon={<MessageSquare size={18} />} />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <FooterLinks
                  links={[
                    "Features",
                    "Pricing",
                    "Use Cases",
                    "Security",
                    "API",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <FooterLinks
                  links={["About Us", "Careers", "Blog", "Press", "Contact"]}
                />
              </div>

              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <FooterLinks
                  links={[
                    "Documentation",
                    "Help Center",
                    "Community",
                    "Webinars",
                    "Guides",
                  ]}
                />
              </div>

              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <FooterLinks
                  links={[
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookies",
                    "GDPR",
                    "Compliance",
                  ]}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-foreground/50 text-sm">
                © 2025 InterViewly By Priyanshu Bhardwaj. All Rights Reserved.
              </p>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button variant="ghost" size="sm" className="text-xs">
                  English (US)
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  USD ($)
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StepItem({
  number,
  title,
  description,
  isLeft,
}: {
  number: string;
  title: string;
  description: string;
  isLeft: boolean;
}) {
  return (
    <div className="md:flex items-center">
      {/* Left Section (Text if isLeft, Empty if not) */}
      <div className="md:w-5/12">
        {isLeft && (
          <motion.div
            className="bg-background rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800 md:text-right"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-foreground/70">{description}</p>
          </motion.div>
        )}
      </div>

      {/* Center Number Circle */}
      <motion.div
        className="md:w-2/12 flex justify-center my-4 md:my-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="bg-primary text-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
          {number}
        </div>
      </motion.div>

      {/* Right Section (Text if !isLeft, Empty if isLeft) */}
      <div className="md:w-5/12">
        {!isLeft && (
          <motion.div
            className="bg-background rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-foreground/70">{description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <motion.div
      className="bg-background rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="text-yellow-500 mb-4">{"★★★★★"}</div>
      <p className="text-foreground/80 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-foreground/60 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-foreground/70 hover:text-primary transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
    >
      {icon}
    </motion.a>
  );
}

function FooterLinks({ links }: { links: string[] }) {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href="#"
            className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}
