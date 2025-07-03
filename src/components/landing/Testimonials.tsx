import React, { useState, useEffect, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote:
        "Interviewly completely transformed my interview preparation. The AI-powered mock interviews felt incredibly realistic, and the feedback helped me land my dream job at a top tech company.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Full Stack Engineer",
      company: "StartupX",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote:
        "The platform's real-time coding challenges and system design questions are spot-on. I felt completely prepared for every technical interview I faced.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Patel",
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      quote:
        "What sets Interviewly apart is the personalized feedback. Every session helped me identify and improve my weak points systematically.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Kim",
      title: "Backend Developer",
      company: "DataFlow Corp",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote:
        "The interview scenarios are incredibly diverse and challenging. It's like having a personal interview coach available 24/7.",
      rating: 5,
    },
    {
      id: 5,
      name: "Emily Johnson",
      title: "Software Architect",
      company: "NextGen Systems",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote:
        "I went from failing interviews to receiving multiple offers. Interviewly's structured approach and detailed analytics made all the difference.",
      rating: 5,
    },
    {
      id: 6,
      name: "Alex Thompson",
      title: "Mobile Developer",
      company: "AppVenture",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      quote:
        "The platform adapts to your skill level and keeps challenging you. It's not just practice—it's intelligent preparation.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const TestimonialCard = ({ testimonial, index, isVisible }) => (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>

      {/* Main Card */}
      <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full transition-all duration-500 group-hover:bg-gray-800/30 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
            <Quote className="w-8 h-8 text-blue-400" />
          </div>

          {/* Rating */}
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
              >
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-gray-300 mb-6 italic leading-relaxed group-hover:text-white transition-colors duration-500">
            "{testimonial.quote}"
          </blockquote>

          {/* Profile */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="relative w-12 h-12 rounded-full border-2 border-white/20 object-cover group-hover:border-blue-500/50 transition-all duration-500"
              />
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-400 group-hover:text-blue-200 transition-colors duration-500">{testimonial.title}</p>
              <p className="text-xs text-gray-500 group-hover:text-blue-300 transition-colors duration-500">{testimonial.company}</p>
            </div>
          </div>
        </div>

        {/* Neon Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500"></div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-20">
      {/* Animated Grid Background - matching TrustedCompanies */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
        `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-blue-600/5" />

        {/* Animated grid glow effects */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  SUCCESS STORIES
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 relative"
          >
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent animate-pulse">
              Developers Love
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              Interviewly
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent blur-lg opacity-50 animate-pulse">
              Developers Love Interviewly
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of developers who've transformed their interview
            performance and landed their dream roles with our AI-powered
            platform.
          </motion.p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      index={0}
                      isVisible={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-black/70 hover:border-blue-500/50 transition-all z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-black/70 hover:border-blue-500/50 transition-all z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-blue-400 to-white w-8"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
