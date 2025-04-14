"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Download,
  Plus,
  X,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  BookOpen,
  Briefcase,
  User,
  Code,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("personal");
  const [enhancing, setEnhancing] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const [formData, setFormData] = useState({
    name: "Priyanshu Bhardwaj",
    title: "Senior Software Engineer",
    email: "priyanshub18.work@gmail.com",
    phone: "+91-8954319014",
    location: "Bangalore, India",
    portfolio: "github.com/priyanshub",
    summary:
      "Experienced software engineer with a passion for building intuitive user experiences and scalable applications.",
    experience: [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Senior Developer",
        duration: "2020 - Present",
        description:
          "Led development of multiple web applications using React and Node.js.",
      },
      {
        id: 2,
        company: "Digital Innovations",
        position: "Frontend Developer",
        duration: "2018 - 2020",
        description:
          "Developed responsive web interfaces and improved site performance.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of Technology",
        degree: "Master of Science in Computer Science",
        year: "2016 - 2018",
        gpa: "3.8/4.0",
      },
      {
        id: 2,
        institution: "City College",
        degree: "Bachelor of Engineering in Information Technology",
        year: "2012 - 2016",
        gpa: "3.7/4.0",
      },
    ],
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "CSS",
      "HTML",
      "Git",
      "AWS",
      "MongoDB",
      "Redux",
    ],
    languages: ["English (Native)", "Hindi (Fluent)", "Spanish (Basic)"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExperienceChange = (id, field, value) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const handleEducationChange = (id, field, value) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  const addExperience = () => {
    const newId =
      formData.experience.length > 0
        ? Math.max(...formData.experience.map((exp) => exp.id)) + 1
        : 1;

    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { id: newId, company: "", position: "", duration: "", description: "" },
      ],
    });
  };

  const removeExperience = (id) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newId =
      formData.education.length > 0
        ? Math.max(...formData.education.map((edu) => edu.id)) + 1
        : 1;

    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: newId, institution: "", degree: "", year: "", gpa: "" },
      ],
    });
  };

  const removeEducation = (id) => {
    setFormData({
      ...formData,
      education: formData.education.filter((edu) => edu.id !== id),
    });
  };

  const handleSkillChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleLanguageChange = (e) => {
    setFormData({
      ...formData,
      languages: e.target.value.split(",").map((language) => language.trim()),
    });
  };

  const handleCertificationChange = (e) => {
    setFormData({
      ...formData,
      certifications: e.target.value.split(",").map((cert) => cert.trim()),
    });
  };

  const enhanceText = (type, id = null, field = null) => {
    setEnhancing(`${type}${id ? `-${id}-${field}` : ""}`);

    // Simulate AI enhancement
    setTimeout(() => {
      if (type === "summary") {
        setFormData({
          ...formData,
          summary:
            "Results-driven Senior Software Engineer with 6+ years of expertise in full-stack development. Passionate about creating elegant, user-centric solutions with modern technologies. Proven track record of delivering high-performance applications that scale effectively and exceed client expectations.",
        });
      } else if (type === "experience" && id !== null) {
        setFormData({
          ...formData,
          experience: formData.experience.map((exp) =>
            exp.id === id
              ? {
                  ...exp,
                  description:
                    exp.company === "Tech Solutions Inc."
                      ? "Led a team of 5 developers to build and deploy 4 critical web applications using React, Node.js, and AWS, resulting in 45% improved user engagement and 60% faster load times. Implemented CI/CD pipelines that reduced deployment time by 80% and mentored junior developers to improve code quality."
                      : "Developed and optimized responsive web interfaces for 12+ enterprise clients using modern JavaScript frameworks, increasing mobile conversions by 35%. Reduced load times by 65% through advanced code splitting and asset optimization techniques, significantly improving SEO rankings and user retention.",
                }
              : exp,
          ),
        });
      }
      setEnhancing("");
    }, 1500);
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview-content");
    setShowPreviewModal(false);

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save(`${formData.name.replace(/\s+/g, "_")}_Resume.pdf`);
      toast.success("Resume Downloaded Successfully");
    });
  };

  const SectionButton = ({ name, label, icon }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setActiveSection(name)}
      className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all ${
        activeSection === name
          ? `bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-lg ${
              isDark ? "shadow-blue-900/30" : "shadow-blue-300/60"
            }`
          : `${
              isDark ? "hover:bg-gray-700/70" : "hover:bg-blue-50/70"
            } text-gray-600 hover:text-blue-600`
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.button>
  );

  const MotionFadeInDiv = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );

  const gradientButton = `
    bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
    text-white py-3 px-6 rounded-xl flex items-center gap-2 transition-all 
    shadow-lg ${isDark ? "shadow-blue-900/20" : "shadow-blue-300/50"}
    hover:shadow-xl ${isDark ? "hover:shadow-blue-900/30" : "hover:shadow-blue-300/70"}
  `;

  return (
    <div
      className={`min-h-screen mt-16 ${
        isDark
          ? " text-white"
          : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto py-12 px-4">
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-blue-600" : "bg-blue-100"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDark ? "white" : "#3b82f6"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M9 9h1" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Resume Builder
              </h1>
              <p
                className={`mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Create your professional resume in minutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreviewModal(true)}
              className={gradientButton}
            >
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
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview Resume
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            className="lg:col-span-3 z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`p-5 rounded-2xl shadow-2xl ${
                isDark
                  ? "bg-gray-800/80 backdrop-blur-lg border border-gray-700"
                  : "bg-white/90 backdrop-blur-lg border border-gray-100"
              } mb-8 sticky top-6`}
            >
              <div className="flex flex-col gap-3">
                <SectionButton
                  name="personal"
                  label="Personal Info"
                  icon={<User />}
                />
                <SectionButton
                  name="experience"
                  label="Experience"
                  icon={<Briefcase />}
                />
                <SectionButton
                  name="education"
                  label="Education"
                  icon={<BookOpen />}
                />
                <SectionButton
                  name="skills"
                  label="Skills & More"
                  icon={<Code />}
                />
              </div>

             
            </div>
          </motion.div>

          {/* Form Sections */}
          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              className={`p-8 rounded-2xl shadow-2xl ${
                isDark
                  ? "bg-gray-800/80 backdrop-blur-lg border border-gray-700"
                  : "bg-white/90 backdrop-blur-lg border border-gray-100"
              }`}
            >
              <AnimatePresence mode="wait">
                {/* Personal Information */}
                {activeSection === "personal" && (
                  <motion.div
                    key="personal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Personal Information
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => enhanceText("summary")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${
                          isDark
                            ? "bg-blue-900/40 hover:bg-blue-800/60"
                            : "bg-blue-100 hover:bg-blue-200"
                        } text-blue-600 transition-colors`}
                        disabled={enhancing === "summary"}
                      >
                        {enhancing === "summary" ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Sparkles size={18} />
                        )}
                        Enhance Summary
                      </motion.button>
                    </div>

                    <MotionFadeInDiv>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full p-3.5 rounded-xl border-2 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-gray-50 border-gray-200 focus:border-blue-400"
                            } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full p-3.5 rounded-xl border-2 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-gray-50 border-gray-200 focus:border-blue-400"
                            } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                          />
                        </div>
                      </div>
                    </MotionFadeInDiv>

                    <MotionFadeInDiv delay={0.1}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Mail size={16} className="text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full p-3.5 pl-10 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-gray-50 border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Phone size={16} className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full p-3.5 pl-10 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-gray-50 border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>
                      </div>
                    </MotionFadeInDiv>

                    <MotionFadeInDiv delay={0.2}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`w-full p-3.5 rounded-xl border-2 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-gray-50 border-gray-200 focus:border-blue-400"
                            } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Portfolio/Website
                          </label>
                          <input
                            type="text"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            className={`w-full p-3.5 rounded-xl border-2 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-gray-50 border-gray-200 focus:border-blue-400"
                            } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                          />
                        </div>
                      </div>
                    </MotionFadeInDiv>

                    <MotionFadeInDiv delay={0.3}>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Professional Summary
                        </label>
                        <textarea
                          name="summary"
                          value={formData.summary}
                          onChange={handleInputChange}
                          rows={5}
                          className={`w-full p-3.5 rounded-xl border-2 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-gray-50 border-gray-200 focus:border-blue-400"
                          } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                        ></textarea>
                      </div>
                    </MotionFadeInDiv>
                  </motion.div>
                )}

                {/* Experience Section */}
                {activeSection === "experience" && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Professional Experience
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addExperience}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${gradientButton}`}
                      >
                        <Plus size={18} /> Add Experience
                      </motion.button>
                    </div>

                    {formData.experience.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        className={`mb-8 p-7 rounded-xl ${
                          isDark
                            ? "bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-lg border border-gray-700"
                            : "bg-gradient-to-br from-blue-50/70 to-indigo-50/70 backdrop-blur-lg border border-blue-100"
                        } shadow-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-5">
                          <h3
                            className={`font-semibold text-xl ${
                              isDark ? "text-blue-400" : "text-blue-700"
                            }`}
                          >
                            {exp.position || `Position #${index + 1}`}
                          </h3>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                enhanceText("experience", exp.id, "description")
                              }
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${
                                isDark
                                  ? "bg-blue-900/40 hover:bg-blue-800/60"
                                  : "bg-blue-100 hover:bg-blue-200"
                              } text-blue-600 transition-colors`}
                              disabled={
                                enhancing === `experience-${exp.id}-description`
                              }
                            >
                              {enhancing ===
                              `experience-${exp.id}-description` ? (
                                <RefreshCw size={16} className="animate-spin" />
                              ) : (
                                <Sparkles size={16} />
                              )}
                              Enhance
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeExperience(exp.id)}
                              className={`flex items-center justify-center h-9 w-9 rounded-lg ${
                                isDark
                                  ? "bg-red-900/40 hover:bg-red-900/60"
                                  : "bg-red-100 hover:bg-red-200"
                              } text-red-500 transition-colors`}
                            >
                              <X size={18} />
                            </motion.button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) =>
                                handleExperienceChange(
                                  exp.id,
                                  "company",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Position
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) =>
                                handleExperienceChange(
                                  exp.id,
                                  "position",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>

                        <div className="mb-5">
                          <label className="block text-sm font-medium mb-2">
                            Duration
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Calendar size={16} className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) =>
                                handleExperienceChange(
                                  exp.id,
                                  "duration",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 pl-10 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Description
                          </label>
                          <textarea
                            value={exp.description}
                            onChange={(e) =>
                              handleExperienceChange(
                                exp.id,
                                "description",
                                e.target.value,
                              )
                            }
                            rows={4}
                            className={`w-full p-3.5 rounded-xl border-2 ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-white border-gray-200 focus:border-blue-400"
                            } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                          ></textarea>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Education Section */}
                {activeSection === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Education
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addEducation}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${gradientButton}`}
                      >
                        <Plus size={18} /> Add Education
                      </motion.button>
                    </div>

                    {formData.education.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        className={`mb-8 p-7 rounded-xl ${
                          isDark
                            ? "bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-lg border border-gray-700"
                            : "bg-gradient-to-br from-blue-50/70 to-indigo-50/70 backdrop-blur-lg border border-blue-100"
                        } shadow-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-5">
                          <h3
                            className={`font-semibold text-xl ${
                              isDark ? "text-blue-400" : "text-blue-700"
                            }`}
                          >
                            {edu.degree || `Degree #${index + 1}`}
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeEducation(edu.id)}
                            className={`flex items-center justify-center h-9 w-9 rounded-lg ${
                              isDark
                                ? "bg-red-900/40 hover:bg-red-900/60"
                                : "bg-red-100 hover:bg-red-200"
                            } text-red-500 transition-colors`}
                          >
                            <X size={18} />
                          </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "institution",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "degree",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Years
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Calendar size={16} className="text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) =>
                                  handleEducationChange(
                                    edu.id,
                                    "year",
                                    e.target.value,
                                  )
                                }
                                className={`w-full p-3.5 pl-10 rounded-xl border-2 ${
                                  isDark
                                    ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                    : "bg-white border-gray-200 focus:border-blue-400"
                                } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              GPA/Grade
                            </label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "gpa",
                                  e.target.value,
                                )
                              }
                              className={`w-full p-3.5 rounded-xl border-2 ${
                                isDark
                                  ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                  : "bg-white border-gray-200 focus:border-blue-400"
                              } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Skills Section */}
                {activeSection === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-8">
                      Skills & Qualifications
                    </h2>

                    <MotionFadeInDiv>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Technical Skills
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Separate with commas (e.g., React, JavaScript, CSS)
                        </p>
                        <textarea
                          value={formData.skills.join(", ")}
                          onChange={handleSkillChange}
                          rows={3}
                          className={`w-full p-3.5 rounded-xl border-2 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-gray-50 border-gray-200 focus:border-blue-400"
                          } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                        ></textarea>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`px-3 py-2 rounded-lg text-sm ${
                                isDark
                                  ? "bg-blue-900/40 text-blue-400"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </MotionFadeInDiv>

                    <MotionFadeInDiv delay={0.1}>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Languages
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Separate with commas (e.g., English (Native), Spanish
                          (Intermediate))
                        </p>
                        <textarea
                          value={formData.languages.join(", ")}
                          onChange={handleLanguageChange}
                          rows={2}
                          className={`w-full p-3.5 rounded-xl border-2 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-gray-50 border-gray-200 focus:border-blue-400"
                          } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                        ></textarea>
                      </div>
                    </MotionFadeInDiv>

                    <MotionFadeInDiv delay={0.2}>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Certifications
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Separate with commas (e.g., AWS Certified Developer,
                          Scrum Master)
                        </p>
                        <textarea
                          value={formData.certifications.join(", ")}
                          onChange={handleCertificationChange}
                          rows={2}
                          className={`w-full p-3.5 rounded-xl border-2 ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-gray-50 border-gray-200 focus:border-blue-400"
                          } focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-sm`}
                        ></textarea>
                      </div>
                    </MotionFadeInDiv>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Resume Preview Modal */}
        <AnimatePresence>
          {showPreviewModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviewModal(false)}
            >
              <motion.div
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex justify-between items-center p-5 border-b bg-white/90 backdrop-blur-md">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Resume Preview
                  </h3>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      <Download size={18} /> Download PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowPreviewModal(false)}
                      className="flex items-center justify-center h-9 w-9 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8" id="resume-preview-content">
                  {/* Resume Header */}
                  <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {formData.name}
                    </h1>
                    <p className="text-xl text-blue-600 mb-3">
                      {formData.title}
                    </p>
                    <div className="flex justify-center items-center gap-6 text-sm text-gray-700">
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} /> {formData.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} /> {formData.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {formData.location}
                      </span>
                      {formData.portfolio && (
                        <span className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          {formData.portfolio}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                      SUMMARY
                    </h2>
                    <p className="text-gray-700">{formData.summary}</p>
                  </div>

                  {/* Experience Section */}
                  {formData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                        EXPERIENCE
                      </h2>
                      {formData.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-gray-900">
                              {exp.position}
                            </h3>
                            <span className="text-gray-600">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-blue-600 mb-1">{exp.company}</p>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education Section */}
                  {formData.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                        EDUCATION
                      </h2>
                      {formData.education.map((edu) => (
                        <div key={edu.id} className="mb-3">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-gray-900">
                              {edu.degree}
                            </h3>
                            <span className="text-gray-600">{edu.year}</span>
                          </div>
                          <p className="text-blue-600">{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-gray-700">GPA: {edu.gpa}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills Section */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                      SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {formData.languages.length > 0 && (
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 mb-1">
                          Languages
                        </h3>
                        <p className="text-gray-700">
                          {formData.languages.join(", ")}
                        </p>
                      </div>
                    )}

                    {formData.certifications.length > 0 && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Certifications
                        </h3>
                        <p className="text-gray-700">
                          {formData.certifications.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeBuilder;
