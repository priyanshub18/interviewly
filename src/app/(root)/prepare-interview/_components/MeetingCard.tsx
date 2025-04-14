import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  CheckCircle,
  ChevronRight,
  Clock,
  Users,
  XCircle,
  Video,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type Interview = Doc<"interviews">;

interface EnhancedInterview extends Interview {
  reviewStatus?: "pending" | "pass" | "fail" | "none";
}

function BlueMeetingCard({ interview }: { interview: Interview }) {
  const [isCandidate, setIsCandidate] = useState(true); // Mocked for demo
  const [isRecordingAvailable, setIsRecordingAvailable] = useState(false);
  const [callRecordingUrl, setCallRecordingUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mock functions for demonstration
  const joinMeeting = (id: string) => {
    toast.success(`Joining meeting with ID: ${id}`);
  };

  const getMeetingStatus = (interview: EnhancedInterview) => {
    const now = new Date();
    const startTime = interview.startTime
      ? new Date(interview.startTime)
      : null;

    if (!startTime) return "upcoming";

    if (interview.status === "completed") return "completed";

    const timeDiff = startTime.getTime() - now.getTime();
    // If the meeting is within 5 minutes of the start time or has started but not ended
    if (timeDiff < 300000 && timeDiff > -3600000) return "live";

    return startTime > now ? "upcoming" : "completed";
  };

  useEffect(() => {
    // Mock fetching recording data
    const timeout = setTimeout(() => {
      if (interview.status === "completed") {
        setIsRecordingAvailable(Math.random() > 0.3); // 70% chance of having a recording
        setCallRecordingUrl(
          isRecordingAvailable ? "https://example.com/recording" : null,
        );
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [interview.status]);

  const status = getMeetingStatus(interview);

  const formattedDate = interview?.startTime
    ? format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a")
    : "Date not set";

  const reviewStatus = interview.status || "pending";

  const statusVariants = {
    live: {
      badge: "bg-blue-600 text-white hover:bg-blue-700",
      text: "Live Now",
      icon: <span className="animate-pulse mr-1 text-blue-200">●</span>,
    },
    upcoming: {
      badge: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      text: "Upcoming",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    completed: {
      badge: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      text: "Completed",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
  };

  const currentStatus = statusVariants[status as keyof typeof statusVariants];

  if (!interview || !interview.title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Review Status Indicator */}
      <AnimatePresence>
        {isCandidate && reviewStatus === "completed" && (
          <motion.div
            className="absolute -top-3 right-4 z-10"
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Badge className="bg-yellow-400 text-yellow-800 px-3 py-1 text-xs font-medium shadow-sm">
              Pending Review
            </Badge>
          </motion.div>
        )}

        {isCandidate &&
          (reviewStatus === "succeeded" || reviewStatus === "failed") && (
            <motion.div
              className="absolute -top-3 -right-3 z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div
                className={`flex items-center justify-center p-1.5 rounded-full shadow-md ${
                  reviewStatus === "succeeded"
                    ? "bg-green-100 border border-green-300"
                    : "bg-red-100 border border-red-300"
                }`}
              >
                {reviewStatus === "succeeded" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Subtle glow effect when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-xl bg-blue-200 dark:bg-blue-900 blur-xl opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        {/* Status indicator bar at top */}
        {status === "live" ? (
          <div className="relative h-1">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50" />
            <motion.div
              className="absolute h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            />
          </div>
        ) : (
          <div
            className={`h-1 ${
              status === "upcoming"
                ? "bg-blue-100 dark:bg-blue-900/50"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          />
        )}

        <CardHeader className="space-y-2 pb-2 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formattedDate}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                className={`flex items-center text-xs px-2 py-0.5 ${currentStatus.badge}`}
              >
                {currentStatus.icon}
                {currentStatus.text}
              </Badge>
            </motion.div>
          </div>

          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {interview.title.split(" ").map((word, index) => (
              <span key={index}>
                {word.charAt(0).toUpperCase() +
                  word.slice(1).toLowerCase()}{" "}
              </span>
            ))}
          </CardTitle>

          {interview.description && (
            <CardDescription className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {interview.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pb-3 pt-0">
          <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            <span>
              {interview.interviewerIds?.length || 0} interviewer
              {(interview.interviewerIds?.length || 0) !== 1 ? "s" : ""} • 1
              candidate
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          {status === "live" && (
            <motion.div
              className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white"
                onClick={() => joinMeeting(interview.streamCallId || "")}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-400 rounded-md -z-10 opacity-0"
                  animate={{
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                <Video className="h-4 w-4 mr-2" />
                Join Meeting Now
              </Button>
            </motion.div>
          )}

          {status === "upcoming" && (
            <div className="relative w-full">
              <Button
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                disabled
              >
                <Clock className="h-4 w-4 mr-2" />
                Waiting to Start
              </Button>
              <motion.div
                className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-md -z-10 opacity-0"
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {status === "completed" && (
            <motion.div
              className="w-full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                variant="outline"
                className={`w-full text-sm ${
                  isRecordingAvailable
                    ? "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    : "border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500"
                }`}
                onClick={async () => {
                  if (!callRecordingUrl) {
                    return toast.error("No recording found for this meeting");
                  }

                  if (isRecordingAvailable) {
                    window.open(callRecordingUrl, "_blank");
                    toast.success("Opening recording in new tab");
                  }
                }}
              >
                {isRecordingAvailable ? (
                  <span className="flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    View Recording
                  </span>
                ) : (
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Recording Unavailable
                  </span>
                )}
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default BlueMeetingCard;
