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

 const primaryColor = theme === "dark" ? "#4f46e5" : "#6366f1"; // blue-600 for dark, blue-500 for light
 const backgroundColor = theme === "dark" ? "bg-black/80" : "bg-white";
 const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
 const textColor = theme === "dark" ? "text-gray-200" : "text-gray-800";
 const secondaryTextColor =
   theme === "dark" ? "text-gray-400" : "text-gray-600";

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)" }, // Darker shadow
  };

  const iconVariants = {
    hover: { rotate: 45 },
  };

  return (
    <motion.div
      className={`${backgroundColor} rounded-md p-4 border ${borderColor} shadow-md hover:shadow-lg transition-all duration-200 `} // Darker shadow on hover
      initial="initial"
      whileInView="whileInView"
      variants={cardVariants}
      viewport={{ once: true, margin: "-20px" }}
      whileHover="hover"
    >
      <div className="flex items-center mb-2">
        <motion.div
          className="bg-blue-600 p-2 rounded-md mr-2 text-blue-300 flex items-center justify-center w-8 h-8" // Darker blue background for icon
          variants={iconVariants}
          whileHover="hover"
        >
          {icon || <Sparkles size={16} />}
        </motion.div>
        <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      </div>
      <p className={`${secondaryTextColor} text-sm`}>{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
