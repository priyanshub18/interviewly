"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Globe,
  Clock,
  TrendingUp,
  Award,
  Target,
  Rocket,
  Brain,
  BarChart3,
  VideoIcon,
  Headphones,
  Lock,
  Building,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Avatar = ({ children, className = "" }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = "" }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>
    {children}
  </div>
);

// Video Panel Component
const VideoPanel = ({ name, role, active }) => (
  <div className={`bg-slate-800/50 rounded-xl p-4 border ${active ? 'border-purple-500/50' : 'border-white/10'}`}>
    <div className="flex items-center gap-3 mb-3">
      <Avatar className="bg-gradient-to-br from-purple-500 to-pink-500">
        <AvatarFallback className="text-white font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-white">{name}</div>
        <div className="text-sm text-white/60">{role}</div>
      </div>
      {active && (
        <div className="ml-auto w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      )}
    </div>
    <div className="bg-slate-900/50 rounded-lg h-24 flex items-center justify-center">
      <div className="text-white/40 text-sm">Video Feed</div>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
      {React.cloneElement(icon, { size: 24, className: "text-purple-400" })}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

// Step Item Component
const StepItem = ({ number, title, description, icon, index }) => (
  <motion.div
    className="relative flex items-center"
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
          {number}
        </div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
    
    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
        {React.cloneElement(icon, { size: 28, className: "text-purple-400" })}
      </div>
    </div>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({ name, role, company, content, avatar, rating, index }) => (
  <motion.div
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-400 fill-current" : "text-white/20"}
        />
      ))}
    </div>
    <p className="text-white/80 mb-6 leading-relaxed">"{content}"</p>
    <div className="flex items-center gap-3">
      <Avatar className="bg-gradient-to-br from-purple-500 to-pink-500">
        <AvatarFallback className="text-white font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-white">{name}</div>
        <div className="text-sm text-white/60">{role} at {company}</div>
      </div>
    </div>
  </motion.div>
);

// Data Arrays
const features = [
  {
    icon: <Brain />,
    title: "AI-Powered Insights",
    description: "Get real-time analysis of candidate performance with advanced AI algorithms that evaluate technical skills and communication."
  },
  {
    icon: <Code />,
    title: "Live Code Editor",
    description: "Integrated development environment with syntax highlighting, auto-completion, and real-time collaboration features."
  },
  {
    icon: <VideoIcon />,
    title: "HD Video Conferencing",
    description: "Crystal clear video and audio with screen sharing, recording capabilities, and stable connections worldwide."
  },
  {
    icon: <BarChart3 />,
    title: "Performance Analytics",
    description: "Comprehensive reports and analytics to track candidate performance and improve your hiring process."
  },
  {
    icon: <Shield />,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption, SOC 2 compliance, and GDPR-ready data protection."
  },
  {
    icon: <Users />,
    title: "Team Collaboration",
    description: "Invite team members, share feedback, and collaborate in real-time during interviews and evaluations."
  }
];

const steps = [
  {
    number: 1,
    title: "Schedule Interview",
    description: "Create a new interview session and invite candidates with just a few clicks. Set up custom questions and evaluation criteria.",
    icon: <Calendar />
  },
  {
    number: 2,
    title: "Conduct Interview",
    description: "Use our integrated platform with live coding, video conferencing, and AI-powered insights to conduct comprehensive interviews.",
    icon: <VideoIcon />
  },
  {
    number: 3,
    title: "AI Analysis",
    description: "Our AI analyzes the interview in real-time, providing insights on technical skills, communication, and problem-solving abilities.",
    icon: <Brain />
  },
  {
    number: 4,
    title: "Get Results",
    description: "Receive detailed reports with scores, feedback, and recommendations to make informed hiring decisions.",
    icon: <Award />
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechCorp",
    content: "Interviewly has transformed our hiring process. The AI insights are incredibly accurate and the platform is so easy to use.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Engineering Manager",
    company: "StartupXYZ",
    content: "The live code editor and real-time collaboration features have made our technical interviews much more efficient.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "HR Director",
    company: "InnovateTech",
    content: "We've reduced our time-to-hire by 60% while improving the quality of our technical hires significantly.",
    rating: 5
  }
];

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "API", "Documentation"]
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Contact"]
  },
  {
    title: "Support",
    links: ["Help Center", "Community", "Status", "Contact Support"]
  }
];

export default function EnhancedLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,119,198,0.2),transparent_50%)]" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <VideoIcon size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Interviewly
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                onClick={() => console.log("Sign in clicked")}
              >
                <LogIn size={16} className="mr-2" />
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm font-medium">Next-Gen Interview Platform</span>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Technical Interviews
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform your hiring process with AI-powered insights, seamless collaboration, 
              and cutting-edge technology that makes every interview count.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 rounded-xl shadow-2xl group"
                  onClick={() => console.log("Start free trial clicked")}
                >
                  <span className="relative z-10 flex items-center text-lg font-semibold">
                    Start Free Trial
                    <Rocket size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl backdrop-blur-sm"
                  onClick={() => console.log("Watch demo clicked")}
                >
                  <Play size={20} className="mr-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { number: "100K+", label: "Interviews Conducted", icon: <Users /> },
              { number: "1000+", label: "Companies Trust Us", icon: <Building /> },
              { number: "99.99%", label: "Platform Uptime", icon: <Zap /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                  {React.cloneElement(stat.icon, { size: 24, className: "text-purple-400" })}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ display: isScrolled ? "none" : "block" }}
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Explore Features</span>
            <ChevronDown size={24} />
          </div>
        </motion.div>
      </motion.section>

      {/* Interactive Demo Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See It In <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Action</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience the power of our platform with this interactive preview
            </p>
          </motion.div>
          
          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 mb-4 p-4 bg-slate-800/50 rounded-t-2xl">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-2 bg-slate-700/50 rounded-lg px-4 py-1">
                    <Lock size={12} className="text-green-400" />
                    <span className="text-sm text-white/70">app.interviewly.com</span>
                  </div>
                </div>
              </div>
              
              {/* Main Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[400px]">
                {/* Code Editor */}
                <div className="lg:col-span-2 bg-slate-900/80 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Code size={16} className="text-purple-400" />
                      <span className="text-sm font-medium">Live Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Connected
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">// AI-Powered Code Analysis</div>
                    <div className="text-blue-400">function optimizeArray(arr) {'{'}</div>
                    <div className="ml-4 text-white/80">const result = new Set();</div>
                    <div className="ml-4 text-white/80">
                      <span className="text-purple-400">for</span> (
                      <span className="text-orange-400">const</span> item 
                      <span className="text-purple-400"> of</span> arr) {'{'}
                    </div>
                    <div className="ml-8 text-white/80">result.add(item);</div>
                    <div className="ml-4 text-white/80">{'}'}</div>
                    <div className="ml-4 text-purple-400">return [...result];</div>
                    <div className="text-blue-400">{'}'}</div>
                    
                    <motion.div
                      className="mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 text-purple-300 text-xs">
                        <Brain size={14} />
                        <span>AI Suggestion: Time complexity O(n), Space O(n)</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Video Panel */}
                <div className="space-y-4">
                  <VideoPanel name="Sarah Chen" role="Interviewer" active={true} />
                  <VideoPanel name="Alex Kumar" role="Candidate" active={false} />
                  
                  {/* Controls */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 bg-red-500/20 rounded-lg border border-red-500/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Mic size={16} className="text-red-400" />
                        </motion.button>
                        <motion.button
                          className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Camera size={16} className="text-blue-400" />
                        </motion.button>
                      </div>
                      <div className="text-xs text-white/60">45:23</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to conduct world-class technical interviews
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Four simple steps to transform your interview process
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-1/2 hidden lg:block" />
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <StepItem key={index} {...step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join thousands of companies that trust Interviewly
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Transform</span> Your Interviews?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join thousands of companies already using Interviewly to hire better, faster, and smarter.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
                  onClick={() => console.log("Start free trial clicked")}
                >
                  Start Your Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl"
                  onClick={() => console.log("Schedule demo clicked")}
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
            
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-purple-400" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <VideoIcon size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold">Interviewly</span>
              </div>
              <p className="text-white/60 text-sm mb-6">
                Revolutionizing technical interviews with AI-powered insights and seamless collaboration.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © 2024 Interviewly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Shield size={16} className="text-green-400" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Globe size={16} className="text-blue-400" />
                <span>Global CDN</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Zap size={16} className="text-purple-400" />
                <span>99.99% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}