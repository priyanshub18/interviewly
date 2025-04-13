"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Download,
  Plus,
  X,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTheme } from "next-themes";

const ResumeBuilder = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("personal");
  const [enhancing, setEnhancing] = useState("");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const [formData, setFormData] = useState({
    name: "Priyanshu Bhardwaj",
    title: "Software Engineer",
    email: "priyanshub18.work@gmail.com",
    phone: "+91-8954319014",
    summary:
      "Experienced software engineer with a passion for building intuitive user experiences.",
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
        degree: "Bachelor of Science in Computer Science",
        year: "2014 - 2018",
      },
    ],
    skills: ["React", "JavaScript", "Node.js", "CSS", "HTML", "Git"],
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExperienceChange = (id: any, field: any, value: any) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const handleEducationChange = (id: any, field: any, value: any) => {
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

  const removeExperience = (id: any) => {
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
        { id: newId, institution: "", degree: "", year: "" },
      ],
    });
  };

  const removeEducation = (id: any) => {
    setFormData({
      ...formData,
      education: formData.education.filter((edu) => edu.id !== id),
    });
  };

  const handleSkillChange = (e: any) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((skill: any) => skill.trim()),
    });
  };

  const enhanceText = (type: any, id: any = null, field: any = null) => {
    setEnhancing(`${type}${id ? `-${id}-${field}` : ""}`);

    // In a real implementation, this would call an AI API
    setTimeout(() => {
      if (type === "summary") {
        setFormData({
          ...formData,
          summary:
            "Results-driven software engineer with 5+ years of experience crafting intuitive user interfaces and scalable backend solutions. Passionate about clean code architecture and delivering high-quality digital experiences that solve real user problems.",
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
                      ? "Led development of 4 critical web applications using React and Node.js, resulting in 35% improved user engagement and 40% faster load times. Mentored junior developers and implemented CI/CD pipelines that reduced deployment time by 60%."
                      : "Developed responsive web interfaces using modern JavaScript frameworks that increased mobile conversions by 25%. Optimized site performance through code refactoring and asset optimization, reducing load times by 45% and boosting SEO rankings.",
                }
              : exp,
          ),
        });
      }
      setEnhancing("");
    }, 1500);
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");

    html2canvas(element as HTMLElement).then((canvas) => {
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
    });
  };

  const SectionButton = ({
    name,
    label,
    icon,
  }: {
    name: any;
    label: any;
    icon: any;
  }) => (
    <button
      onClick={() => setActiveSection(name)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
        activeSection === name
          ? `bg-blue-600 text-white font-medium shadow-md ${
              isDark ? "" : "shadow-blue-200"
            }`
          : `${
              isDark ? "hover:bg-gray-700" : "hover:bg-blue-50"
            } text-gray-600 hover:text-blue-600`
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div
      className={`min-h-screen  ${
        isDark
          ? " text-white"
          : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="mt-16 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-center text-blue-600 mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume Builder
          </motion.h1>

          <div className="flex items-center gap-4">
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
            >
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className={`p-4 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"} mb-6`}
            >
              <div className="flex flex-col gap-2">
                <SectionButton
                  name="personal"
                  label="Personal Info"
                  icon={
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
                      <circle cx="12" cy="7" r="4" />
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    </svg>
                  }
                />
                <SectionButton
                  name="experience"
                  label="Experience"
                  icon={
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
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  }
                />
                <SectionButton
                  name="education"
                  label="Education"
                  icon={
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
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  }
                />
                <SectionButton
                  name="skills"
                  label="Skills"
                  icon={
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
                      <path d="M12 2v4" />
                      <path d="M12 18v4" />
                      <path d="m4.93 4.93 2.83 2.83" />
                      <path d="m16.24 16.24 2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="m4.93 19.07 2.83-2.83" />
                      <path d="m16.24 7.76 2.83-2.83" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Resume Preview */}
            <div
              id="resume-preview"
              className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"} hidden lg:block`}
            >
              <div className="border-b-2 border-blue-500 pb-4 mb-5">
                <h1 className="text-xl font-bold text-blue-600">
                  {formData.name}
                </h1>
                <p className="text-md">{formData.title}</p>
                <div className="flex flex-wrap gap-x-4 mt-2 text-xs opacity-75">
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>

              <div className="mb-5">
                <h2 className="text-md font-semibold text-blue-500 mb-2">
                  Professional Summary
                </h2>
                <p className="text-xs">{formData.summary}</p>
              </div>

              <div className="mb-5">
                <h2 className="text-md font-semibold text-blue-500 mb-2">
                  Experience
                </h2>
                {formData.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{exp.position}</h3>
                      <span className="text-xs text-blue-600">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs mb-1">{exp.company}</p>
                    <p className="text-xs">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <h2 className="text-md font-semibold text-blue-500 mb-2">
                  Education
                </h2>
                {formData.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{edu.institution}</h3>
                      <span className="text-xs text-blue-600">{edu.year}</span>
                    </div>
                    <p className="text-xs">{edu.degree}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-md font-semibold text-blue-500 mb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Sections */}
          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              className={`p-8 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              {/* Personal Information */}
              {activeSection === "personal" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600">
                      Personal Information
                    </h2>
                    <button
                      onClick={() => enhanceText("summary")}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                        isDark ? "bg-blue-900/40" : "bg-blue-100"
                      } text-blue-600 hover:bg-blue-200 transition-colors`}
                      disabled={enhancing === "summary"}
                    >
                      {enhancing === "summary" ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      Enhance Summary
                    </button>
                  </div>

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
                        className={`w-full p-3 rounded-lg border ${
                          isDark
                            ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                            : "bg-gray-50 border-gray-200 focus:border-blue-400"
                        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
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
                        className={`w-full p-3 rounded-lg border ${
                          isDark
                            ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                            : "bg-gray-50 border-gray-200 focus:border-blue-400"
                        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          isDark
                            ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                            : "bg-gray-50 border-gray-200 focus:border-blue-400"
                        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          isDark
                            ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                            : "bg-gray-50 border-gray-200 focus:border-blue-400"
                        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full p-3 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                          : "bg-gray-50 border-gray-200 focus:border-blue-400"
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600">
                      Experience
                    </h2>
                    <button
                      onClick={addExperience}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                        isDark ? "bg-blue-900/40" : "bg-blue-100"
                      } text-blue-600 hover:bg-blue-200 transition-colors`}
                    >
                      <Plus size={16} /> Add Experience
                    </button>
                  </div>

                  {formData.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className={`mb-8 p-6 rounded-xl ${
                        isDark ? "bg-gray-700/50" : "bg-blue-50/50"
                      } border-l-4 border-blue-500`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-lg">
                          Experience #{index + 1}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              enhanceText("experience", exp.id, "description")
                            }
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                              isDark ? "bg-blue-900/40" : "bg-blue-100"
                            } text-blue-600 hover:bg-blue-200 transition-colors`}
                            disabled={
                              enhancing === `experience-${exp.id}-description`
                            }
                          >
                            {enhancing ===
                            `experience-${exp.id}-description` ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Sparkles size={14} />
                            )}
                            Enhance
                          </button>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className={`flex items-center justify-center h-8 w-8 rounded-full ${
                              isDark ? "bg-red-900/40" : "bg-red-100"
                            } text-red-500 hover:bg-red-200 transition-colors`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                            className={`w-full p-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-white border-gray-200 focus:border-blue-400"
                            } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
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
                            className={`w-full p-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-white border-gray-200 focus:border-blue-400"
                            } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Duration
                        </label>
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
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-white border-gray-200 focus:border-blue-400"
                          } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                        />
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
                          rows={3}
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-white border-gray-200 focus:border-blue-400"
                          } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                        ></textarea>
                      </div>
                    </motion.div>
                  ))}

                  {formData.experience.length === 0 && (
                    <div
                      className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      <p>
                        No experience added yet. Click "Add Experience" to get
                        started.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600">
                      Education
                    </h2>
                    <button
                      onClick={addEducation}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                        isDark ? "bg-blue-900/40" : "bg-blue-100"
                      } text-blue-600 hover:bg-blue-200 transition-colors`}
                    >
                      <Plus size={16} /> Add Education
                    </button>
                  </div>

                  {formData.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className={`mb-8 p-6 rounded-xl ${
                        isDark ? "bg-gray-700/50" : "bg-blue-50/50"
                      } border-l-4 border-blue-500`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-lg">
                          Education #{index + 1}
                        </h3>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className={`flex items-center justify-center h-8 w-8 rounded-full ${
                            isDark ? "bg-red-900/40" : "bg-red-100"
                          } text-red-500 hover:bg-red-200 transition-colors`}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                            className={`w-full p-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-white border-gray-200 focus:border-blue-400"
                            } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Years
                          </label>
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
                            className={`w-full p-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                                : "bg-white border-gray-200 focus:border-blue-400"
                            } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                          />
                        </div>
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
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                              : "bg-white border-gray-200 focus:border-blue-400"
                          } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {formData.education.length === 0 && (
                    <div
                      className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      <p>
                        No education added yet. Click "Add Education" to get
                        started.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600">
                      Skills
                    </h2>
                    <button
                      onClick={() => {
                        setEnhancing("skills");
                        // Simulating AI enhancement
                        setTimeout(() => {
                          setFormData({
                            ...formData,
                            skills: [
                              "React",
                              "JavaScript",
                              "Node.js",
                              "TypeScript",
                              "CSS/SCSS",
                              "HTML5",
                              "Git",
                              "RESTful APIs",
                              "Redux",
                              "GraphQL",
                              "CI/CD",
                              "Jest",
                              "AWS",
                            ],
                          });
                          setEnhancing("");
                        }, 1500);
                      }}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                        isDark ? "bg-blue-900/40" : "bg-blue-100"
                      } text-blue-600 hover:bg-blue-200 transition-colors`}
                      disabled={enhancing === "skills"}
                    >
                      {enhancing === "skills" ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      Enhance Skills
                    </button>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Skills (comma separated)
                    </label>
                    <textarea
                      value={formData.skills.join(", ")}
                      onChange={handleSkillChange}
                      rows={4}
                      className={`w-full p-3 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                          : "bg-gray-50 border-gray-200 focus:border-blue-400"
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    ></textarea>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Current Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            isDark
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Preview Button */}
              <div className="mt-10 mb-2 lg:hidden">
                <button
                  onClick={downloadPDF}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Download size={18} /> Download Resume PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
