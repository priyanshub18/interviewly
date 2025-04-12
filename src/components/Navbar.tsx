"use client";

import { useState, useEffect } from "react";
import { Menu, X, UserCircle, Sun, MoonStar } from "lucide-react";
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
import { User } from "@clerk/nextjs/server";
import { useUserRoles } from "@/hooks/useUserRoles";

export default function GlassmorphicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isInterviewer, isCandidate, isLoading } = useUserRoles();
  const { user } = useUser();

  const primaryPurple = "#8b5cf6"; // Your primary purple
  const accentPurple = "#a855f7"; // Your accent purple

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
              <div className="flex-shrink-0">
                <div className="font-bold text-xl flex items-center gap-2">
                  <div
                    className="rounded-lg p-1"
                    style={{ backgroundColor: accentPurple }}
                  >
                    <img
                      src="logo-2.png"
                      alt="Interviewly Logo"
                      className="w-8 h-8"
                    />
                  </div>
                  <span
                    className="bg-clip-text"
                    style={{ color: primaryPurple }}
                  >
                    Interviewly
                  </span>
                </div>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <NavLink
                    text="Home"
                    active={true}
                    primaryColor={primaryPurple}
                  />
                  <NavLink text="Products" primaryColor={primaryPurple} />
                  <NavLink text="Services" primaryColor={primaryPurple} />
                  <NavLink text="About" primaryColor={primaryPurple} />
                  <NavLink text="Contact" primaryColor={primaryPurple} />
                </div>
              </div>
            </div>

            {/* Right side - Dashboard & User Profile */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-foreground relative mr-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme} // Important: key needs to change to animate the switch
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

              <SignedIn>
                {isInterviewer && (
                  <Button
                    variant="ghost"
                    className="hover:opacity-90 transition-all duration-300"
                    style={{ backgroundColor: primaryPurple, color: "white" }}
                  >
                    Dashboard
                  </Button>
                )}
                <div className="w-6"></div>
                <UserButton>
                  <Avatar
                    className="w-8 h-8 border-2 ml-6"
                    style={{ borderColor: primaryPurple }}
                  >
                    {user?.imageUrl ? (
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.fullName || "hola"}
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

              {/* Mobile menu button */}
              {/* <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {/* {isMobileMenuOpen && (
          <div className="md:hidden bg-background/80 dark:bg-background/90 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Button
                className="w-full mt-2 hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: primaryPurple, color: "white" }}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                style={{ borderColor: primaryPurple, color: primaryPurple }}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

// Sub-components
function NavLink({
  text,
  active = false,
  primaryColor,
}: {
  text: string;
  active?: boolean;
  primaryColor: string;
}) {
  return (
    <a
      href="#"
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
        active
          ? "text-white bg-opacity-80 backdrop-blur-md hover:bg-opacity-90"
          : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
      }`}
      style={{
        backgroundColor: active ? primaryColor : "transparent",
      }}
    >
      {text}
    </a>
  );
}
