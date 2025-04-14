"use client"
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HorizontalScrollButtons() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll the window horizontally
  const scrollHorizontally = (direction) => {
    const scrollAmount = 300; // Amount to scroll in pixels
    const newPosition =
      direction === "right"
        ? scrollPosition + scrollAmount
        : scrollPosition - scrollAmount;

    // Update scroll position
    window.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  // Update scrollPosition state when user scrolls manually
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageXOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <motion.button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollHorizontally("left")}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500/10 opacity-0"
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        />
        <ChevronLeft size={20} className="text-blue-500 dark:text-blue-400" />
      </motion.button>

      <motion.button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollHorizontally("right")}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500/10 opacity-0"
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        />
        <ChevronRight size={20} className="text-blue-500 dark:text-blue-400" />
      </motion.button>
    </div>
  );
}
