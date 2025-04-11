import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Fallback icon

function FeatureCard({ icon, title, description }:{
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
  const primaryColor = "#a855f7"; // A nice purple
  const backgroundColor = "bg-black/80"; // Dark background
  const borderColor = "border-gray-800"; // Dark border
  const textColor = "text-gray-200"; // Light text
  const secondaryTextColor = "text-gray-400"; // Lighter text

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
          className="bg-purple-800 p-2 rounded-md mr-2 text-purple-300 flex items-center justify-center w-8 h-8" // Darker purple background for icon
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
