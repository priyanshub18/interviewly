import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Fallback icon
import { useTheme } from "next-themes";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const { theme } = useTheme();

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      boxShadow: theme === "dark" 
        ? "0px 4px 12px rgba(0, 0, 0, 0.5)" 
        : "0px 4px 12px rgba(0, 0, 0, 0.1)"
    },
  };

  const iconVariants = {
    hover: { rotate: 45 },
  };

  return (
    <motion.div
      className="bg-background dark:bg-gray-900/60 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-200"
      initial="initial"
      whileInView="whileInView"
      variants={cardVariants}
      viewport={{ once: true, margin: "-20px" }}
      whileHover="hover"
    >
      <div className="flex items-center mb-4">
        <motion.div
          className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg mr-4 text-blue-500 flex items-center justify-center w-10 h-10"
          variants={iconVariants}
          whileHover="hover"
        >
          {icon || <Sparkles size={20} />}
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
