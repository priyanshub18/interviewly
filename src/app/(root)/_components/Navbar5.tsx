"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  UserCircle,
  Sun,
  MoonStar,
  FileText,
  Briefcase,
  BookOpen,
  Code,
  PlusCircle,
  ListChecks,
  Settings,
  LucideHome,
  Package,
  UserRound,
  Mail,
  BookOpenCheck,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { TbCards } from "react-icons/tb";

export default function InterviewlyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState("candidate"); // "candidate" or "interviewer"
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock functions for demo
  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    console.log(`Navigating to: ${path}`);
  };

  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-slate-800/50"
            : "bg-black/50 backdrop-blur-lg"
        }`}
      >
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Keep as requested */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl mr-4 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-75 animate-pulse group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
                Interviewly
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {!isSignedIn ? (
                // Public Navigation
                <>
                  <GlassNavLink
                    text="Home"
                    onClick={() => handleNavigation("/")}
                    active={isActive("/")}
                  />
                  <GlassNavLink
                    text="Features"
                    onClick={() => handleNavigation("/#features")}
                  />
                  <GlassNavLink
                    text="How It Works"
                    onClick={() => handleNavigation("/#how-it-works")}
                  />
                  <GlassNavLink
                    text="Testimonials"
                    onClick={() => handleNavigation("/#testimonials")}
                  />
                  <GlassNavLink
                    text="Pricing"
                    onClick={() => handleNavigation("/#pricing")}
                  />
                </>
              ) : (
                // Signed In Navigation
                <>
                  <GlassNavLink
                    text="Home"
                    icon={<LucideHome className="w-4 h-4" />}
                    onClick={() => handleNavigation("/")}
                    active={isActive("/")}
                  />

                  {userRole === "candidate" && (
                    <>
                      <GlassNavLink
                        text="Interviews"
                        icon={<Code className="w-4 h-4" />}
                        onClick={() => handleNavigation("/home")}
                        active={isActive("/home")}
                      />
                      <GlassNavLink
                        text="Prepare"
                        icon={<BookOpen className="w-4 h-4" />}
                        onClick={() => handleNavigation("/prepare-interview")}
                        active={isActive("/prepare-interview")}
                      />
                      <GlassNavLink
                        text="Quiz"
                        icon={<BookOpenCheck className="w-4 h-4" />}
                        onClick={() => handleNavigation("/quiz/view")}
                        active={isActive("/quiz/view")}
                      />
                      <GlassNavLink
                        text="Resume"
                        icon={<FileText className="w-4 h-4" />}
                        onClick={() => handleNavigation("/make-resume")}
                        active={isActive("/make-resume")}
                      />
                    </>
                  )}

                  {userRole === "interviewer" && (
                    <>
                      <GlassNavLink
                        text="Dashboard"
                        icon={<ListChecks className="w-4 h-4" />}
                        onClick={() => handleNavigation("/dashboard")}
                        active={isActive("/dashboard")}
                      />
                      <GlassNavLink
                        text="Create Interview"
                        icon={<PlusCircle className="w-4 h-4" />}
                        onClick={() => handleNavigation("/schedule")}
                        active={isActive("/schedule")}
                      />
                      <GlassNavLink
                        text="Problems"
                        icon={<Code className="w-4 h-4" />}
                        onClick={() => handleNavigation("/all-problems")}
                        active={isActive("/all-problems")}
                      />
                    </>
                  )}
                </>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 group"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  {theme === "dark" ? (
                    <MoonStar className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                  ) : (
                    <Sun className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>

              {!isSignedIn ? (
                // Sign In/Up Buttons
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsSignedIn(true)}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <CTAButton
                    text="Get Started Free"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => setIsSignedIn(true)}
                  />
                </div>
              ) : (
                // User Profile
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile",
                      )
                    }
                    className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </button>

                  {/* Profile Dropdown */}
                  {activeDropdown === "profile" && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-xl border border-slate-800/50 shadow-2xl shadow-blue-500/10 py-2">
                      <div className="px-4 py-2 border-b border-slate-800/50">
                        <p className="text-sm font-medium text-white">
                          John Doe
                        </p>
                        <p className="text-xs text-slate-400">
                          john@example.com
                        </p>
                      </div>
                      <DropdownItem
                        text="Profile"
                        icon={<UserRound className="w-4 h-4" />}
                      />
                      <DropdownItem
                        text="Settings"
                        icon={<Settings className="w-4 h-4" />}
                      />
                      <div className="border-t border-slate-800/50 mt-2 pt-2">
                        <DropdownItem
                          text="Sign Out"
                          onClick={() => setIsSignedIn(false)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-300" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 lg:hidden">
          <div className="bg-black/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-blue-500/10 m-4 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {!isSignedIn ? (
                <>
                  <MobileNavLink
                    text="Home"
                    onClick={() => handleNavigation("/")}
                  />
                  <MobileNavLink
                    text="Features"
                    onClick={() => handleNavigation("/#features")}
                  />
                  <MobileNavLink
                    text="How It Works"
                    onClick={() => handleNavigation("/#how-it-works")}
                  />
                  <MobileNavLink
                    text="Testimonials"
                    onClick={() => handleNavigation("/#testimonials")}
                  />
                  <MobileNavLink
                    text="Pricing"
                    onClick={() => handleNavigation("/#pricing")}
                  />
                  <div className="pt-4 border-t border-slate-800/50">
                    <button
                      onClick={() => setIsSignedIn(true)}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                    >
                      Get Started Free
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <MobileNavLink
                    text="Home"
                    icon={<LucideHome className="w-4 h-4" />}
                    onClick={() => handleNavigation("/")}
                  />
                  {userRole === "candidate" && (
                    <>
                      <MobileNavLink
                        text="Interviews"
                        icon={<Code className="w-4 h-4" />}
                        onClick={() => handleNavigation("/home")}
                      />
                      <MobileNavLink
                        text="Prepare"
                        icon={<BookOpen className="w-4 h-4" />}
                        onClick={() => handleNavigation("/prepare-interview")}
                      />
                      <MobileNavLink
                        text="Quiz"
                        icon={<BookOpenCheck className="w-4 h-4" />}
                        onClick={() => handleNavigation("/quiz/view")}
                      />
                      <MobileNavLink
                        text="Resume"
                        icon={<FileText className="w-4 h-4" />}
                        onClick={() => handleNavigation("/make-resume")}
                      />
                    </>
                  )}
                  {userRole === "interviewer" && (
                    <>
                      <MobileNavLink
                        text="Dashboard"
                        icon={<ListChecks className="w-4 h-4" />}
                        onClick={() => handleNavigation("/dashboard")}
                      />
                      <MobileNavLink
                        text="Create Interview"
                        icon={<PlusCircle className="w-4 h-4" />}
                        onClick={() => handleNavigation("/schedule")}
                      />
                      <MobileNavLink
                        text="Problems"
                        icon={<Code className="w-4 h-4" />}
                        onClick={() => handleNavigation("/all-problems")}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Demo Controls */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/90 backdrop-blur-xl rounded-xl border border-slate-800/50 p-4 shadow-2xl">
        <div className="text-xs text-slate-400 mb-2">Demo Controls:</div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setIsSignedIn(!isSignedIn)}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </button>
          {isSignedIn && (
            <button
              onClick={() =>
                setUserRole(
                  userRole === "candidate" ? "interviewer" : "candidate",
                )
              }
              className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Switch to {userRole === "candidate" ? "Interviewer" : "Candidate"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// Glass Navigation Link Component
function GlassNavLink({
  text,
  icon,
  onClick,
  active = false,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
        active
          ? "text-white bg-white/10 border border-white/20 shadow-lg shadow-blue-500/20"
          : "text-slate-300 hover:text-white"
      }`}
    >
      {/* Left-to-right fill animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-all duration-300"></div>

      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {icon && icon}
        <span>{text}</span>
      </div>
    </button>
  );
}

// CTA Button Component
function CTAButton({ text, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group overflow-hidden border border-blue-500/50 hover:border-blue-400/50 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

      {/* Content */}
      <div className="relative flex items-center space-x-2">
        <Sparkles className="w-4 h-4" />
        <span>{text}</span>
        {icon && icon}
      </div>
    </button>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({
  text,
  icon,
  onClick,
  active = false,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
        active
          ? "text-white bg-white/10 border border-white/20"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}

// Dropdown Item Component
function DropdownItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
    >
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}
