import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Users,
  TrendingUp,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CTA = () => {
  const { user } = useUser();
  const navigate = useRouter();

  return (
    <section
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      id="cta"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Radial gradient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/10 via-transparent to-transparent" />

        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Shimmering particles */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-600 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-600 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Glassmorphism Card Container */}
        <motion.div
          className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-blue-600/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-600/20 to-blue-600/20 rounded-3xl blur-xl animate-pulse" />

          <div className="relative z-10 text-center">
            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-black/60 border border-blue-600/40 rounded-full px-6 py-3 mb-8 backdrop-blur-xl shadow-lg shadow-blue-600/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Sparkles size={18} className="text-blue-600" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles size={18} className="text-blue-600 opacity-20" />
                </div>
              </div>
              <span className="text-sm text-blue-600 font-semibold tracking-wide">
                Join the Future of Hiring
              </span>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-blue-600">
                Transform Your Hiring
              </span>
              <br />
              <span className="text-white">
                with AI-Powered Insights
                <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  and Seamless Collaboration
                </span>
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join thousands of forward-thinking companies using{" "}
              <span className="text-blue-600 font-semibold">Interviewly</span>{" "}
              to find top talent effortlessly. Experience AI-powered insights,
              crystal-clear video calls, and seamless code collaboration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {user == null ? (
                <SignInButton>
                  <Button
                    size="lg"
                    className="relative overflow-hidden rounded-2xl px-12 py-6 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white border-0 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 group text-lg font-semibold min-w-[200px]"
                  >
                    <span className="relative z-10 flex items-center">
                      Login
                      <motion.div
                        className="ml-3"
                        whileHover={{ x: 8, rotate: 15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Rocket size={24} />
                      </motion.div>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
                  </Button>
                </SignInButton>
              ) : (
                <Button
                  size="lg"
                  className="relative overflow-hidden rounded-2xl px-12 py-6 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white border-0 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 group text-lg font-semibold min-w-[200px]"
                  onClick={() => navigate.push("/home")}
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Now
                    <motion.div
                      className="ml-3"
                      whileHover={{ x: 8, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              )}

              {/* <Button
                variant="outline"
                size="lg"
                className="rounded-2xl px-10 py-6 border-2 border-blue-600/50 text-slate-300 hover:bg-blue-600/10 hover:border-blue-600 hover:text-white transition-all duration-300 group backdrop-blur-xl text-lg font-semibold min-w-[200px]"
              >
                <Play
                  size={24}
                  className="mr-3 group-hover:text-blue-600 transition-colors duration-300"
                />
                Watch Demo
              </Button> */}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-gray-400">
                <Users size={20} className="text-blue-600" />
                <span className="text-sm font-medium">
                  50K+ Interviews Conducted
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <TrendingUp size={20} className="text-blue-600" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Star size={20} className="text-blue-600" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        {/* <motion.div
          className="absolute top-1/4 -right-8 bg-gradient-to-br from-blue-600 to-blue-600 p-4 rounded-2xl shadow-2xl shadow-blue-600/30 backdrop-blur-sm border border-blue-600/50"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        >
          <Zap size={28} className="text-white" />
        </motion.div> */}

        {/* <motion.div
          className="absolute bottom-1/4 -left-8 bg-gradient-to-br from-blue-600 to-blue-600 p-4 rounded-2xl shadow-2xl shadow-blue-600/30 backdrop-blur-sm border border-blue-600/50"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: 1,
          }}
        >
          <Sparkles size={28} className="text-white" />
        </motion.div> */}
      </div>
    </section>
  );
};

export default CTA;
