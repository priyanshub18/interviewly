"use client";
import { TbCards } from "react-icons/tb";
import { useState, useEffect } from "react";
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
  HomeIcon,
  LucideHome,
  Package,
  UserRound,
  Mail,
  BookOpenCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useRouter, usePathname } from "next/navigation";

export default function GlassmorphicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const primaryblue = "#2563eb"; // Tailwind blue-600
  const accentblue = "#3b82f6"; // Tailwind blue-500

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

  // Function to check if a path is active
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Function to close mobile menu when navigating
  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/60 dark:bg-background/30 backdrop-blur-lg shadow-lg border-b border-border/40"
            : "bg-background/20 dark:bg-background/10 backdrop-blur-sm"
        } py-1`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl mr-4 shadow-lg shadow-blue-500/25"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-75 animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  InterViewly
                </span>
              </div>

              {/* Desktop navigation - Role-specific */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <SignedIn>
                    {/* Common links for all signed-in users */}
                    <NavLink
                      text="Home"
                      icon={<Menu className="w-4 h-4 mr-1" />}
                      active={isActive("/")}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/")}
                    />

                    {/* Candidate-specific navigation */}
                    {isCandidate && (
                      <>
                        <NavLink
                          text="Interviews"
                          icon={<Code className="w-4 h-4 mr-1" />}
                          active={isActive("/home")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/home")}
                        />
                        <NavLink
                          text="Prepare"
                          icon={<BookOpen className="w-4 h-4 mr-1" />}
                          active={isActive("/prepare-interview")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/prepare-interview")}
                        />
                        <NavLink
                          text="Quiz"
                          icon={<BookOpenCheck className="w-4 h-4 mr-1" />}
                          active={
                            isActive("/quiz/view") ||
                            isActive("/quiz/create") ||
                            isActive("/quiz/history")
                          }
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/quiz/view")}
                        />
                        <NavLink
                          text="Resume Builder"
                          icon={<FileText className="w-4 h-4 mr-1" />}
                          active={isActive("/make-resume")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/make-resume")}
                        />
                        <NavLink
                          text="Flash Cards"
                          icon={<TbCards className="w-4 h-4 mr-1" />}
                          active={isActive("/flashcard")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/flashcard")}
                        />
                      </>
                    )}

                    {/* Interviewer-specific navigation */}
                    {isInterviewer && (
                      <>
                        <NavLink
                          text="Actions"
                          icon={<ListChecks className="w-4 h-4 mr-1" />}
                          active={isActive("/home")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/home")}
                        />
                        <NavLink
                          text="Create Interview"
                          icon={<PlusCircle className="w-4 h-4 mr-1" />}
                          active={isActive("/schedule")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/schedule")}
                        />
                        <NavLink
                          text="Problems"
                          icon={<Code className="w-4 h-4 mr-1" />}
                          active={isActive("/all-problems")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/all-problems")}
                        />
                        <NavLink
                          text="Settings"
                          icon={<Settings className="w-4 h-4 mr-1" />}
                          active={isActive("/settings")}
                          primaryColor={primaryblue}
                          onClick={() => handleNavigation("/settings")}
                        />
                      </>
                    )}
                  </SignedIn>

                  {/* Public links when not signed in */}
                  <SignedOut>
                    <NavLink
                      text="Home"
                      active={isActive("/")}
                      icon={<LucideHome className="w-4 h-4 mr-1" />}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/")}
                    />

                    <NavLink
                      text="Products"
                      icon={<Package className="w-4 h-4 mr-1" />}
                      active={pathname.includes("#hero")}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/#hero")}
                    />

                    <NavLink
                      text="Services"
                      icon={<Settings className="w-4 h-4 mr-1" />}
                      active={pathname.includes("#features")}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/#features")}
                    />

                    <NavLink
                      text="About"
                      icon={<UserRound className="w-4 h-4 mr-1" />}
                      active={pathname.includes("#about")}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/#about")}
                    />

                    <NavLink
                      text="Contact"
                      icon={<Mail className="w-4 h-4 mr-1" />}
                      active={pathname.includes("#contact")}
                      primaryColor={primaryblue}
                      onClick={() => handleNavigation("/#contact")}
                    />
                  </SignedOut>
                </div>
              </div>
            </div>

            {/* Right side - Dashboard & User Profile */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle button */}
              <div className="md:flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-foreground relative mr-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {theme === "dark" ? (
                        <MoonStar className="w-5 h-5" />
                      ) : (
                        <Sun className="w-5 h-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </div>

              <SignedIn>
                {/* Dashboard button shown for interviewers */}
                {isInterviewer && (
                  <Button
                    variant="ghost"
                    className="hover:opacity-90 transition-all duration-300 hidden md:flex"
                    style={{ backgroundColor: primaryblue, color: "white" }}
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </Button>
                )}
                <div className="w-6"></div>
                <UserButton>
                  <Avatar
                    className="w-8 h-8 border-2 ml-6"
                    style={{ borderColor: primaryblue }}
                  >
                    {user?.imageUrl ? (
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.fullName || "User"}
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br">
                        <UserCircle className="text-white" size={20} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </UserButton>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <Button
                    variant="outline"
                    className="text-sm font-medium px-4 py-2 mr-2"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 dark:bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              <SignedIn>
                {/* Common mobile links for all signed-in users */}
                <MobileNavLink
                  text="Home"
                  icon={<LucideHome className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/")}
                  active={isActive("/")}
                  primaryColor={primaryblue}
                />

                {/* Candidate-specific mobile navigation */}
                {isCandidate && (
                  <>
                    <MobileNavLink
                      text="Interviews"
                      icon={<Code className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/home")}
                      active={isActive("/home")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Prepare"
                      icon={<BookOpen className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/prepare-interview")}
                      active={isActive("/prepare-interview")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Resume Builder"
                      icon={<FileText className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/make-resume")}
                      active={isActive("/make-resume")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Job Board"
                      icon={<Briefcase className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/jobs-board")}
                      active={isActive("/jobs-board")}
                      primaryColor={primaryblue}
                    />
                  </>
                )}

                {/* Interviewer-specific mobile navigation */}
                {isInterviewer && (
                  <>
                    <MobileNavLink
                      text="Actions"
                      icon={<ListChecks className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/home")}
                      active={isActive("/home")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Create Interview"
                      icon={<PlusCircle className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/schedule")}
                      active={isActive("/schedule")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Problems"
                      icon={<Code className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/all-problems")}
                      active={isActive("/all-problems")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Settings"
                      icon={<Settings className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/settings")}
                      active={isActive("/settings")}
                      primaryColor={primaryblue}
                    />
                    <MobileNavLink
                      text="Dashboard"
                      icon={<ListChecks className="w-4 h-4 mr-2" />}
                      onClick={() => handleNavigation("/dashboard")}
                      active={isActive("/dashboard")}
                      primaryColor={primaryblue}
                    />
                  </>
                )}
              </SignedIn>

              {/* Public mobile links when not signed in */}
              <SignedOut>
                <MobileNavLink
                  text="Home"
                  icon={<LucideHome className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/")}
                  active={isActive("/")}
                  primaryColor={primaryblue}
                />
                <MobileNavLink
                  text="Products"
                  icon={<Package className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/#hero")}
                  active={pathname.includes("#hero")}
                  primaryColor={primaryblue}
                />
                <MobileNavLink
                  text="Services"
                  icon={<Settings className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/#features")}
                  active={pathname.includes("#features")}
                  primaryColor={primaryblue}
                />
                <MobileNavLink
                  text="About"
                  icon={<UserRound className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/#about")}
                  active={pathname.includes("#about")}
                  primaryColor={primaryblue}
                />
                <MobileNavLink
                  text="Contact"
                  icon={<Mail className="w-4 h-4 mr-2" />}
                  onClick={() => handleNavigation("/#contact")}
                  active={pathname.includes("#contact")}
                  primaryColor={primaryblue}
                />
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-components
function NavLink({ text, icon, active = false, primaryColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center ${
        active
          ? "text-white bg-opacity-80 backdrop-blur-md hover:bg-opacity-90"
          : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
      }`}
      style={{
        backgroundColor: active ? primaryColor : "transparent",
      }}
    >
      {icon && icon}
      {text}
    </button>
  );
}

function MobileNavLink({ text, icon, onClick, active = false, primaryColor }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center ${
        active
          ? "text-white bg-opacity-80 backdrop-blur-md hover:bg-opacity-90"
          : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
      }`}
      style={{
        backgroundColor: active ? primaryColor : "transparent",
      }}
    >
      {icon && icon}
      {text}
    </button>
  );
}
