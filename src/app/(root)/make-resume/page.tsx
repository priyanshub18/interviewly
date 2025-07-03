"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FolderOpen,
  Sparkles,
  RefreshCw,
  Plus,
  Mail,
  Phone,
  MapPin,
  Globe,
  Download,
  X,
  Eye,
  Save,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";
const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhancingAll, setIsEnhancingAll] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      name: "Jane Doe",
      title: "Full Stack Developer",
      email: "jane.doe@email.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      portfolio: "https://janedoe.dev",
      summary:
        "Passionate developer with 5+ years of experience building scalable web applications. Adept at collaborating in fast-paced teams and delivering high-quality solutions. Strong background in JavaScript, React, Node.js, and cloud technologies.",
    },
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        duration: "Feb 2021 - Present",
        description:
          "Lead a team of 6 engineers to develop a SaaS analytics platform using React, Node.js, and AWS. Improved system performance by 30% and mentored junior developers.",
      },
      {
        company: "Webify Labs",
        position: "Frontend Developer",
        duration: "Jun 2018 - Jan 2021",
        description:
          "Built and maintained responsive web applications for e-commerce clients. Collaborated with designers to create engaging user experiences using React and Redux.",
      },
    ],
    education: [
      {
        institution: "Massachusetts Institute of Technology",
        degree: "B.Sc. in Computer Science",
        year: "2018",
        details:
          "GPA: 3.9/4.0, Dean's List, Relevant coursework: Algorithms, Databases, Cloud Computing",
      },
    ],
    skills: {
      technical: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "AWS",
        "Docker",
        "GraphQL",
      ],
      languages: [
        "English (Native)",
        "Spanish (Fluent)",
        "French (Intermediate)",
      ],
    },
    certifications: [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        year: "2022",
      },
      {
        name: "Certified ScrumMaster (CSM)",
        issuer: "Scrum Alliance",
        year: "2021",
      },
    ],
    projects: [
      {
        name: "Open Source Portfolio Website",
        description:
          "Designed and developed a customizable portfolio template used by 500+ developers. Implemented dark mode, blog integration, and deployment scripts.",
        technologies: "React, Next.js, Tailwind CSS, Vercel",
        link: "https://github.com/janedoe/portfolio",
      },
      {
        name: "Real-Time Chat App",
        description:
          "Created a real-time chat application with group messaging, file sharing, and notifications. Deployed on AWS with CI/CD pipelines.",
        technologies: "Node.js, Socket.io, MongoDB, AWS EC2",
        link: "https://github.com/janedoe/chat-app",
      },
    ],
  });
  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setFormData(JSON.parse(savedResume));
    }
  }, []);
  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills & Languages", icon: Code },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ];

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else {
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value },
        };
      }
    });
  };

  const addArrayItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  const deleteArrayItem = (section, index) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const enhanceSummary = async () => {
    setIsEnhancing(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const enhancedSummary = `${formData.personal.summary} Enhanced with AI: Results-driven professional with proven expertise in driving innovation and delivering exceptional outcomes. Skilled in strategic problem-solving and collaborative leadership.`;

    handleInputChange("personal", "summary", enhancedSummary);
    setIsEnhancing(false);
  };

  const enhanceEntireResume = async () => {
    setIsEnhancingAll(true);
    setIsEnhancing(true); // disables summary enhance too
    await new Promise((resolve) => setTimeout(resolve, 2200));
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        summary:
          prev.personal.summary +
          '\n\n[AI Enhanced] Dynamic and results-driven professional with a proven track record in delivering innovative solutions, leading teams, and exceeding business goals. Recognized for exceptional problem-solving, adaptability, and a passion for continuous learning.'
      },
      experience: prev.experience.map((exp, i) => ({
        ...exp,
        description:
          exp.description +
          ' [AI Enhanced] Demonstrated impact through leadership, technical expertise, and a commitment to excellence.'
      })),
      education: prev.education.map((edu) => ({
        ...edu,
        details:
          (edu.details || '') +
          ' [AI Enhanced] Graduated with distinction, actively participated in extracurriculars, and pursued advanced coursework.'
      })),
      projects: prev.projects.map((proj) => ({
        ...proj,
        description:
          proj.description +
          ' [AI Enhanced] Project showcased innovation, teamwork, and technical mastery.'
      })),
      skills: {
        ...prev.skills,
        technical: Array.from(new Set([...prev.skills.technical, 'Leadership', 'Problem Solving', 'Collaboration', 'AI Tools'])),
        languages: Array.from(new Set([...prev.skills.languages, 'German (Basic)'])),
      },
      certifications: prev.certifications.map((cert) => ({
        ...cert,
        name: cert.name + ' [AI Enhanced]'
      })),
    }));
    setIsEnhancingAll(false);
    setIsEnhancing(false);
    toast.success('Entire resume enhanced with AI!');
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
      pdf.save(`${formData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`);
      toast.success("Resume Downloaded Successfully");
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.personal.name}
            onChange={e => handleInputChange("personal", "name", e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Professional Title
          </label>
          <input
            type="text"
            value={formData.personal.title}
            onChange={e => handleInputChange("personal", "title", e.target.value)}
            placeholder="Senior Software Engineer"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            value={formData.personal.email}
            onChange={e => handleInputChange("personal", "email", e.target.value)}
            placeholder="john.doe@email.com"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </label>
          <input
            type="tel"
            value={formData.personal.phone}
            onChange={e => handleInputChange("personal", "phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            value={formData.personal.location}
            onChange={e => handleInputChange("personal", "location", e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Portfolio/Website
          </label>
          <input
            type="text"
            value={formData.personal.portfolio}
            onChange={e => handleInputChange("personal", "portfolio", e.target.value)}
            placeholder="https://johndoe.dev"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
          />
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Professional Summary
          </label>
          <button
            onClick={enhanceSummary}
            disabled={isEnhancing}
            className="group relative px-4 py-2 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-blue-600/25"
            title="Improve this summary using AI assistance"
          >
            {isEnhancing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isEnhancing ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
        <textarea
          value={formData.personal.summary}
          onChange={e => handleInputChange("personal", "summary", e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements and expertise..."
          rows={4}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {formData.experience.map((exp, index) => (
        <div
          key={index}
          className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg space-y-4 relative"
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => deleteArrayItem("experience", index)}
            title="Delete Experience"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={e => handleInputChange("experience", "company", e.target.value, index)}
                placeholder="Google Inc."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Position
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={e => handleInputChange("experience", "position", e.target.value, index)}
                placeholder="Senior Software Engineer"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Duration
              </label>
              <input
                type="text"
                value={exp.duration}
                onChange={e => handleInputChange("experience", "duration", e.target.value, index)}
                placeholder="Jan 2020 - Present"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={exp.description}
              onChange={e => handleInputChange("experience", "description", e.target.value, index)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("experience", {
            company: "",
            position: "",
            duration: "",
            description: "",
          })
        }
        className="w-full py-3 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {formData.education.map((edu, index) => (
        <div
          key={index}
          className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg space-y-4 relative"
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => deleteArrayItem("education", index)}
            title="Delete Education"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={e => handleInputChange("education", "institution", e.target.value, index)}
                placeholder="Stanford University"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={e => handleInputChange("education", "degree", e.target.value, index)}
                placeholder="Bachelor of Science in Computer Science"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Year
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={e => handleInputChange("education", "year", e.target.value, index)}
                placeholder="2018"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Details</label>
            <textarea
              value={edu.details}
              onChange={e => handleInputChange("education", "details", e.target.value, index)}
              placeholder="GPA, relevant coursework, honors..."
              rows={2}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("education", {
            institution: "",
            degree: "",
            year: "",
            details: "",
          })
        }
        className="w-full py-3 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Technical Skills
        </h3>
        <textarea
          value={formData.skills.technical.join(", ")}
          onChange={e =>
            handleInputChange(
              "skills",
              "technical",
              e.target.value.split(",").map(s => s.trim())
            )
          }
          placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
          rows={3}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
        />
      </div>

      <div className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
        <textarea
          value={formData.skills.languages.join(", ")}
          onChange={e =>
            handleInputChange(
              "skills",
              "languages",
              e.target.value.split(",").map(s => s.trim())
            )
          }
          placeholder="English (Native), Spanish (Fluent), French (Intermediate)..."
          rows={3}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
        />
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      {formData.certifications.map((cert, index) => (
        <div
          key={index}
          className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={e => handleInputChange("certifications", "name", e.target.value, index)}
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Issuer
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={e => handleInputChange("certifications", "issuer", e.target.value, index)}
                placeholder="Amazon Web Services"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Year
              </label>
              <input
                type="text"
                value={cert.year}
                onChange={e => handleInputChange("certifications", "year", e.target.value, index)}
                placeholder="2023"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("certifications", { name: "", issuer: "", year: "" })
        }
        className="w-full py-3 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {formData.projects.map((project, index) => (
        <div
          key={index}
          className="p-6 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg space-y-4 relative"
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => deleteArrayItem("projects", index)}
            title="Delete Project"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={e => handleInputChange("projects", "name", e.target.value, index)}
                placeholder="E-commerce Platform"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Technologies
              </label>
              <input
                type="text"
                value={project.technologies}
                onChange={e => handleInputChange("projects", "technologies", e.target.value, index)}
                placeholder="React, Node.js, MongoDB"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Link
              </label>
              <input
                type="text"
                value={project.link}
                onChange={e => handleInputChange("projects", "link", e.target.value, index)}
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={project.description}
              onChange={e => handleInputChange("projects", "description", e.target.value, index)}
              placeholder="Describe the project, your role, and key achievements..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-blue-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-200 hover:border-blue-600/50 resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("projects", {
            name: "",
            description: "",
            technologies: "",
            link: "",
          })
        }
        className="w-full py-3 bg-blue-600/20 border border-blue-600/40 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "skills":
        return renderSkills();
      case "certifications":
        return renderCertifications();
      case "projects":
        return renderProjects();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="relative flex flex-col items-center justify-center mb-12 mt-4">
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-black/80 border border-blue-600/40 rounded-full px-6 py-3 mb-6 backdrop-blur-xl shadow-lg shadow-blue-600/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <Sparkles size={18} className="text-blue-400" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles size={18} className="text-blue-400 opacity-20" />
              </div>
            </div>
            <span className="text-sm text-blue-300 font-semibold tracking-wide">
              AI-Powered Resume Builder
            </span>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </motion.div>

          {/* Premium Title */}
          <motion.h1
            className="text-4xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Create Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Professional Resume
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-blue-300 mb-2 leading-relaxed max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Build a stunning, AI-enhanced resume in minutes. Stand out with
            modern design and smart content suggestions.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-blue-600/30 justify-center items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 text-base
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white shadow-xl shadow-blue-500/30 border-b-4 border-blue-400 z-10 scale-105"
                      : "text-blue-300 hover:text-white hover:bg-blue-600/20 hover:shadow-md hover:shadow-blue-400/10"
                  }
                `}
                whileHover={{
                  scale: isActive ? 1.08 : 1.05,
                  boxShadow: isActive
                    ? "0 8px 32px 0 rgba(0, 123, 255, 0.25)"
                    : "0 2px 8px 0 rgba(59, 130, 246, 0.10)",
                  backgroundColor: isActive
                    ? undefined
                    : "rgba(37, 99, 235, 0.10)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline text-base">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-glow"
                    className="absolute inset-0 rounded-xl bg-blue-400/10 pointer-events-none"
                    style={{ zIndex: -1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-600/20">
          {renderTabContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          <motion.button
            onClick={enhanceEntireResume}
            disabled={isEnhancingAll}
            whileHover={{
              scale: 1.05,
              rotate: [0, -1, 1, 0],
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: isEnhancingAll ? "200% 0%" : "0% 0%",
            }}
            transition={{
              rotate: { duration: 0.6, ease: "easeInOut" },
              backgroundPosition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className={`relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-black via-gray-900 to-black text-blue-400 shadow-lg transition-all duration-300 border-2 border-blue-500/50 hover:border-blue-400 hover:text-blue-300 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black ${isEnhancingAll ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{
              backgroundImage: isEnhancingAll
                ? "linear-gradient(45deg, #000000, #1f2937, #3b82f6, #1f2937, #000000)"
                : undefined,
              backgroundSize: isEnhancingAll ? "200% 100%" : undefined,
            }}
            title="Enhance your entire resume with AI"
          >
            <motion.div
              animate={isEnhancingAll ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {isEnhancingAll ? (
                <RefreshCw className="w-5 h-5" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
            </motion.div>
            <span className="relative z-10">
              {isEnhancingAll
                ? "Enhancing All..."
                : "Enhance Entire Resume with AI"}
            </span>
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-600/20 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => setShowPreviewModal(true)}
            whileHover={{
              scale: 1.03,
              y: -2,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-6 py-3 bg-black text-blue-400 rounded-lg border-2 border-blue-500/50 hover:border-blue-400 hover:text-blue-300 transition-all duration-300 font-medium flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Eye className="w-4 h-4" />
            </motion.div>
            <span>Preview Resume</span>
            {/* Sliding background effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </motion.button>

          <motion.button
            className="relative overflow-hidden px-6 py-3 bg-black text-blue-400 border-2 border-blue-600/50 rounded-lg hover:border-blue-400 hover:text-blue-300 transition-all duration-300 font-medium group"
            onClick={() => {
              localStorage.setItem("resume", JSON.stringify(formData));
              toast.success("Draft Saved Successfully");
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              Save Draft
            </motion.span>
            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-600/20 opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </div>
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
                    {formData.personal.name}
                  </h1>
                  <p className="text-xl text-blue-600 mb-3">
                    {formData.personal.title}
                  </p>
                  <div className="flex justify-center items-center gap-6 text-sm text-gray-700 flex-wrap">
                    {formData.personal.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} /> {formData.personal.email}
                      </span>
                    )}
                    {formData.personal.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} /> {formData.personal.phone}
                      </span>
                    )}
                    {formData.personal.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {formData.personal.location}
                      </span>
                    )}
                    {formData.personal.portfolio && (
                      <span className="flex items-center gap-1.5">
                        <Globe size={14} /> {formData.personal.portfolio}
                      </span>
                    )}
                  </div>
                </div>
                {/* Summary Section */}
                {formData.personal.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                      SUMMARY
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {formData.personal.summary}
                    </p>
                  </div>
                )}
                {/* Experience Section */}
                {formData.experience &&
                  formData.experience.length > 0 &&
                  formData.experience.some(
                    (exp) =>
                      exp.company ||
                      exp.position ||
                      exp.duration ||
                      exp.description,
                  ) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                        EXPERIENCE
                      </h2>
                      {formData.experience.map(
                        (exp, idx) =>
                          (exp.company ||
                            exp.position ||
                            exp.duration ||
                            exp.description) && (
                            <div key={idx} className="mb-4">
                              <div className="flex justify-between flex-wrap">
                                <h3 className="font-bold text-gray-900">
                                  {exp.position}
                                </h3>
                                <span className="text-gray-600">
                                  {exp.duration}
                                </span>
                              </div>
                              <p className="text-blue-600 mb-1">
                                {exp.company}
                              </p>
                              <p className="text-gray-700">{exp.description}</p>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                {/* Education Section */}
                {formData.education &&
                  formData.education.length > 0 &&
                  formData.education.some(
                    (edu) =>
                      edu.institution || edu.degree || edu.year || edu.details,
                  ) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                        EDUCATION
                      </h2>
                      {formData.education.map(
                        (edu, idx) =>
                          (edu.institution ||
                            edu.degree ||
                            edu.year ||
                            edu.details) && (
                            <div key={idx} className="mb-3">
                              <div className="flex justify-between flex-wrap">
                                <h3 className="font-bold text-gray-900">
                                  {edu.degree}
                                </h3>
                                <span className="text-gray-600">
                                  {edu.year}
                                </span>
                              </div>
                              <p className="text-blue-600">{edu.institution}</p>
                              {edu.details && (
                                <p className="text-gray-700">{edu.details}</p>
                              )}
                            </div>
                          ),
                      )}
                    </div>
                  )}
                {/* Projects Section */}
                {formData.projects &&
                  formData.projects.length > 0 &&
                  formData.projects.some(
                    (proj) =>
                      proj.name ||
                      proj.description ||
                      proj.technologies ||
                      proj.link,
                  ) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                        PROJECTS
                      </h2>
                      {formData.projects.map(
                        (proj, idx) =>
                          (proj.name ||
                            proj.description ||
                            proj.technologies ||
                            proj.link) && (
                            <div key={idx} className="mb-4">
                              <div className="flex justify-between items-center flex-wrap">
                                <h3 className="font-bold text-gray-900">
                                  {proj.name}
                                </h3>
                                {proj.link && (
                                  <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-sm"
                                  >
                                    {proj.link}
                                  </a>
                                )}
                              </div>
                              {proj.technologies && (
                                <p className="text-xs text-blue-500 mb-1">
                                  {proj.technologies}
                                </p>
                              )}
                              <p className="text-gray-700">
                                {proj.description}
                              </p>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                {/* Skills Section */}
                {(formData.skills.technical.length > 0 ||
                  formData.skills.languages.length > 0 ||
                  (formData.certifications &&
                    formData.certifications.length > 0)) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                      SKILLS & MORE
                    </h2>
                    {formData.skills.technical.length > 0 && (
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 mb-1 text-sm">
                          Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.skills.technical.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.skills.languages.length > 0 && (
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 mb-1 text-sm">
                          Languages
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.skills.languages.map((lang, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.certifications &&
                      formData.certifications.length > 0 &&
                      formData.certifications.some((cert) => cert.name) && (
                        <div className="mb-2">
                          <h3 className="font-bold text-gray-900 mb-1 text-sm">
                            Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.certifications
                              .filter((cert) => cert.name)
                              .map((cert, idx) => (
                                <span
                                  key={idx}
                                  className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm"
                                >
                                  {cert.name}
                                  {cert.issuer ? ` (${cert.issuer})` : ""}
                                  {cert.year ? `, ${cert.year}` : ""}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
