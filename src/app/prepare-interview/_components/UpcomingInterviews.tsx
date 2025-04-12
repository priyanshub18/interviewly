import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion";

import BlueMeetingCard from "./MeetingCard";
const UpcomingInterviews = () => {
  const interviews = useQuery(api.interviews.getUpcomingInterviews);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className=" rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Upcoming Interviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviews &&
            interviews.length > 0 &&
            interviews.map((interview) => (
              <BlueMeetingCard interview={interview} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingInterviews;
