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
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useUserRoles } from "@/hooks/useUserRoles";

export default function InterviewlyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`fixed top-0  py-1.5  left-0 right-0 z-50 transition-all duration-500 ${
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
              <SignedOut>
                {/* Public Navigation */}
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
              </SignedOut>

              <SignedIn>
                {/* Signed In Navigation */}
                <GlassNavLink
                  text="Home"
                  icon={<LucideHome className="w-4 h-4" />}
                  onClick={() => handleNavigation("/")}
                  active={isActive("/")}
                />

                {isCandidate && (
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
                    <GlassNavLink
                      text="Flash Cards"
                      icon={<TbCards className="w-4 h-4" />}
                      onClick={() => handleNavigation("/flashcard")}
                      active={isActive("/flashcard")}
                    />
                  </>
                )}

                {isInterviewer && (
                  <>
                    <GlassNavLink
                      text="Dashboard"
                      icon={<ListChecks className="w-4 h-4" />}
                      onClick={() => handleNavigation("/home")}
                      active={isActive("/home")}
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
              </SignedIn>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              {/* <button
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
              </button> */}

              <SignedOut>
                {/* Sign In/Up Buttons */}
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <div className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group overflow-hidden border border-blue-500/50 hover:border-blue-400/50 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                      {/* Content */}
                      <div className="relative flex items-center space-x-2">
                        <span>Sign in</span>
                        {/* <ArrowRight className="w-4 h-4" /> */}
                        <UserRound className="w-4 h-4" />
                      </div>
                    </div>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                {/* User Profile */}
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard:
                        "bg-black/90 backdrop-blur-xl border border-slate-800/50 shadow-2xl shadow-blue-500/10",
                      userButtonPopoverActionButton:
                        "text-slate-300 hover:text-white hover:bg-white/5",
                      userButtonPopoverActionButtonText:
                        "text-slate-300 hover:text-white",
                    },
                  }}
                />
              </SignedIn>

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
              <SignedOut>
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
                  <SignInButton mode="modal">
                    <button className="w-full px-4 py-3 text-left text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300">
                      Get Started Free
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                <MobileNavLink
                  text="Home"
                  icon={<LucideHome className="w-4 h-4" />}
                  onClick={() => handleNavigation("/")}
                />
                {isCandidate && (
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
                    <MobileNavLink
                      text="Flash Cards"
                      icon={<TbCards className="w-4 h-4" />}
                      onClick={() => handleNavigation("/flashcard")}
                    />
                  </>
                )}
                {isInterviewer && (
                  <>
                    <MobileNavLink
                      text="Dashboard"
                      icon={<ListChecks className="w-4 h-4" />}
                      onClick={() => handleNavigation("/home")}
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
              </SignedIn>
            </div>
          </div>
        </div>
      )}
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
          ? "text-white bg-blue-500/90 border border-blue-500/50 shadow-lg shadow-blue-500/30"
          : "text-slate-300 hover:text-white"
      }`}
    >
      {/* Left-to-right fill animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-500/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 rounded-xl transition-all duration-300"></div>

      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {icon && icon}
        <span>{text}</span>
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
