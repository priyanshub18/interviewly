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
  Bell,
  MapPin,
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
import NotificationBell from "@/components/NotificationBell";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AuthButtons from "@/components/AuthButtons";

export default function InterviewlyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [preparePopoverOpen, setPreparePopoverOpen] = useState(false);

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
    if (path === "prepare") {
      return (
        pathname.startsWith("/prepare-interview") ||
        pathname.startsWith("/quiz/view") ||
        pathname.startsWith("/flashcard") ||
        pathname.startsWith("/make-resume")
      );
    }
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
                    {/* Prepare Dropdown */}
                    <div
                      onMouseEnter={() => setPreparePopoverOpen(true)}
                      onMouseLeave={() => setPreparePopoverOpen(false)}
                      style={{ display: "inline-block" }}
                    >
                      <Popover
                        open={preparePopoverOpen}
                        onOpenChange={setPreparePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <button
                            className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden text-slate-300 hover:text-white flex items-center space-x-2"
                            tabIndex={0}
                            // Accessibility: allow keyboard focus
                            onFocus={() => setPreparePopoverOpen(true)}
                            onBlur={() => setPreparePopoverOpen(false)}
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Prepare</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-4 border border-blue-500/30 shadow-2xl rounded-2xl backdrop-blur-xl">
                          <div className="flex flex-col gap-2">
                            <GlassNavLink
                              text="Roadmap"
                              icon={<MapPin className="w-4 h-4" />}
                              onClick={() =>
                                handleNavigation("/prepare-interview")
                              }
                              active={isActive("/prepare-interview")}
                              customClass="dropdown-link"
                            />
                            <GlassNavLink
                              text="Quiz"
                              icon={<BookOpenCheck className="w-4 h-4" />}
                              onClick={() => handleNavigation("/quiz/view")}
                              active={isActive("/quiz/view")}
                              customClass="dropdown-link"
                            />
                            <GlassNavLink
                              text="Flash Cards"
                              icon={<TbCards className="w-4 h-4" />}
                              onClick={() => handleNavigation("/flashcard")}
                              active={isActive("/flashcard")}
                              customClass="dropdown-link"
                            />
                            <GlassNavLink
                              text="Resume"
                              icon={<FileText className="w-4 h-4" />}
                              onClick={() => handleNavigation("/make-resume")}
                              active={isActive("/make-resume")}
                              customClass="dropdown-link"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* Remove individual Quiz, Flash Cards, Resume links */}
                    <GlassNavLink
                      text="Jobs"
                      icon={<Briefcase className="w-4 h-4" />}
                      onClick={() => handleNavigation("/jobs")}
                      active={isActive("/jobs")}
                    />
                    <GlassNavLink
                      text="My Applications"
                      icon={<Mail className="w-4 h-4" />}
                      onClick={() => handleNavigation("/my-applications")}
                      active={isActive("/my-applications")}
                    />
                    <GlassNavLink
                      text="Activities"
                      icon={<Bell className="w-4 h-4" />}
                      onClick={() => handleNavigation("/activities")}
                      active={isActive("/activities")}
                    />
                  </>
                )}

                {isInterviewer && (
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
                    {/* <GlassNavLink
                      text="Jobs"
                      icon={<Briefcase className="w-4 h-4" />}
                      onClick={() => handleNavigation("/jobs")}
                      active={isActive("/jobs")}
                    /> */}
                    <GlassNavLink
                      text="Post Job"
                      icon={<PlusCircle className="w-4 h-4" />}
                      onClick={() => handleNavigation("/post-job")}
                      active={isActive("/post-job")}
                    />
                    <GlassNavLink
                      text="Manage Jobs"
                      icon={<Settings className="w-4 h-4" />}
                      onClick={() => handleNavigation("/manage-jobs")}
                      active={isActive("/manage-jobs")}
                    />
                    <GlassNavLink
                      text="Activities"
                      icon={<Bell className="w-4 h-4" />}
                      onClick={() => handleNavigation("/admin_activities")}
                      active={isActive("/admin_activities")}
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
                <AuthButtons />
              </SignedOut>

              <SignedIn>
                {/* Notification Bell */}
                <NotificationBell />

                {/* User Profile */}
                {/* <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-blue-600 shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105",
                      userButtonPopoverCard:
                        "bg-black/95 backdrop-blur-2xl border border-blue-600/40 shadow-2xl shadow-blue-600/20 rounded-2xl text-white",
                      userButtonPopoverActionButton:
                        "text-blue-400 hover:text-blue-200 hover:bg-blue-600/10 transition-all duration-200 font-semibold",
                      userButtonPopoverActionButtonText:
                        "text-blue-400 hover:text-blue-200 transition-all duration-200 font-semibold",
                      userButtonPopoverFooter:
                        "bg-black/80 border-t border-blue-600/20 text-slate-400 rounded-b-2xl px-4 py-2",
                      userButtonPopover:
                        "rounded-2xl overflow-hidden border border-blue-600/30 shadow-lg shadow-blue-600/10",
                      userButtonPopoverArrow:
                        "text-blue-600",
                      userButtonPopoverHeader:
                        "bg-black/90 border-b border-blue-600/20 text-white rounded-t-2xl px-4 py-2",
                      userButtonPopoverUserInfo:
                        "text-white font-bold",
                      userButtonPopoverUserEmail:
                        "text-blue-400 text-xs",
                      footer: "hidden",
                    },
                  }} */}
                {/* /> */}
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard:
                        "bg-black/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-blue-600/20",
                      userButtonPopoverActionButton:
                        "text-slate-300 hover:text-white hover:bg-blue-600/10 hover:border-blue-600/20",
                      userButtonPopoverActionButtonText:
                        "text-black-300 hover:text-white",
                      userButtonPopoverActionButtonIcon:
                        "text-slate-400 hover:text-blue-400",
                      userButtonPopoverFooter: "border-t border-slate-700/50",
                      userButtonPopoverModeButton:
                        "text-slate-300 hover:text-white hover:bg-blue-600/10",
                      userButtonPopoverAvatarBox: "border border-slate-700/50",
                      userButtonPopoverAvatarImage: "rounded-full",
                      userButtonPopoverText: "text-slate-300",
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
                <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigation("/sign-in")}
                    className="relative w-full px-4 py-3 text-left text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-lg shadow-lg border border-blue-500/30 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span className="relative z-10">Sign In</span>
                    <span className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/sign-up")}
                    className="relative w-full px-4 py-3 text-left text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-lg shadow-lg border border-blue-400/30 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></span>
                  </button>
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
                      text="Flash Cards"
                      icon={<TbCards className="w-4 h-4" />}
                      onClick={() => handleNavigation("/flashcard")}
                    />
                    <MobileNavLink
                      text="Resume"
                      icon={<FileText className="w-4 h-4" />}
                      onClick={() => handleNavigation("/make-resume")}
                    />
                    <MobileNavLink
                      text="Jobs"
                      icon={<Briefcase className="w-4 h-4" />}
                      onClick={() => handleNavigation("/jobs")}
                    />
                    <MobileNavLink
                      text="My Applications"
                      icon={<Mail className="w-4 h-4" />}
                      onClick={() => handleNavigation("/my-applications")}
                    />
                    <MobileNavLink
                      text="Activities"
                      icon={<Bell className="w-4 h-4" />}
                      onClick={() => handleNavigation("/activities")}
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
                    {/* <MobileNavLink
                      text="Jobs"
                      icon={<Briefcase className="w-4 h-4" />}
                      onClick={() => handleNavigation("/jobs")}
                    /> */}
                    <MobileNavLink
                      text="Post Job"
                      icon={<PlusCircle className="w-4 h-4" />}
                      onClick={() => handleNavigation("/post-job")}
                    />
                    <MobileNavLink
                      text="Manage Jobs"
                      icon={<Settings className="w-4 h-4" />}
                      onClick={() => handleNavigation("/manage-jobs")}
                    />
                    <MobileNavLink
                      text="Activities"
                      icon={<Bell className="w-4 h-4" />}
                      onClick={() => handleNavigation("/admin_activities")}
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
  customClass = "",
}: {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  customClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
        active
          ? "text-white bg-blue-500/90 border border-blue-500/50 shadow-lg shadow-blue-500/30"
          : "text-slate-300 hover:text-white"
      } ${customClass}`}
      // Add dropdown-specific hover effect
      style={customClass === "dropdown-link" ? { margin: "2px 0" } : {}}
    >
      {/* Left-to-right fill animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-500/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out ${customClass === "dropdown-link" ? "rounded-xl" : ""}`}
      ></div>
      {/* Subtle border on hover */}
      <div
        className={`absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 rounded-xl transition-all duration-300 ${customClass === "dropdown-link" ? "" : ""}`}
      ></div>
      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {icon && icon}
        <span>{text}</span>
      </div>
      {/* Custom hover effect for dropdown */}
      {customClass === "dropdown-link" && (
        <style jsx>{`
          button.dropdown-link:hover {
            background: linear-gradient(
              90deg,
              rgba(59, 130, 246, 0.15) 0%,
              rgba(30, 64, 175, 0.12) 100%
            );
            color: #fff;
            transform: scale(1.04);
            box-shadow: 0 2px 12px 0 rgba(59, 130, 246, 0.1);
            border: 1px solid #3b82f6;
          }
        `}</style>
      )}
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

// GradientButton Component
function GradientButton({
  children,
  onClick,
  variant = "filled",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "filled" | "outline";
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2 font-semibold rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        variant === "filled"
          ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white border border-blue-500/30 shadow-lg hover:from-blue-500 hover:to-blue-600 hover:scale-105"
          : "bg-transparent border-2 border-blue-400 text-blue-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:border-blue-500"
      } ${className}`}
      {...props}
    >
      {/* Animated background for outline variant */}
      {variant === "outline" && (
        <span
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          aria-hidden="true"
        ></span>
      )}
      {/* Glow effect for filled variant on hover */}
      {variant === "filled" && (
        <span
          className="absolute inset-0 z-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse rounded-xl"
          aria-hidden="true"
        ></span>
      )}
      <span
        className={`relative z-10 transition-colors duration-300 ${variant === "outline" ? "group-hover:text-white" : ""}`}
      >
        {children}
      </span>
    </button>
  );
}
