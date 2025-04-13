import useGetCallById from "@/hooks/useGetCallById";
import useMeetingActions from "@/hooks/useMeetingActions";
import { useUserRoles } from "@/hooks/useUserRoles";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  CheckCircle,
  ChevronRight,
  Clock,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Doc } from "../../convex/_generated/dataModel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Interview = Doc<"interviews">;

// Add these fields to the Interview type for demonstration
interface EnhancedInterview extends Interview {
  reviewStatus?: "pending" | "pass" | "fail";
}

function MeetingCard({ interview }: { interview: EnhancedInterview }) {
  const { isCandidate } = useUserRoles();
  const { joinMeeting } = useMeetingActions();
  const { call } = useGetCallById(interview.streamCallId);
  const [isRecordingAvailable, setIsRecordingAvailable] = useState(false);
  const [callRecordingUrl, setCallRecordingUrl] = useState<string | null>(null);

  useEffect(() => {
    const getCallRecording = async () => {
      if (!call) {
        console.error("Call not found");
        return;
      }
      try {
        const recordings = await call.queryRecordings();
        //console.log("Recordings:", recordings);
        if (!recordings.recordings) {
          setIsRecordingAvailable(false);
          return;
        }
        const final_ans = recordings.recordings[0];
        if (!final_ans.url) {
          setIsRecordingAvailable(false);
          return;
        }
        setIsRecordingAvailable(true);
        setCallRecordingUrl(final_ans.url);

        //console.log("final_ans:", final_ans.url);
        return final_ans.url;
      } catch (error) {
        return null;
        // console.error("Failed to fetch recordings:", error);
      }
    };
    getCallRecording();
  }, [call]);
  const status = getMeetingStatus(interview);

  const formattedDate = interview?.startTime
    ? format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a")
    : "Date not set";

  // Assuming reviewStatus is a property on your interview object
  // Default to "pending" if not set
  const reviewStatus = interview.status || "pending";
  useEffect(() => {}, [interview]);
  const statusVariants = {
    live: {
      badge: "bg-blue-600 text-white hover:bg-blue-700",
      text: "Live Now",
      icon: <span className="animate-pulse mr-1">●</span>,
    },
    upcoming: {
      badge:
        "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200",
      text: "Upcoming",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    completed: {
      badge:
        "bg-green-200 text-gray-500 border border-gray-200 hover:bg-green-300",
      text: "Completed",
      icon: <ChevronRight className="h-3 w-3 mr-1" />,
    },
  };

  const currentStatus = statusVariants[status as keyof typeof statusVariants];

  if (!interview || !interview.title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      {/* Review Status Banner or Sticker */}
      {isCandidate && reviewStatus === "completed" ? (
        <div className="absolute -top-3 left-0 right-0 z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Badge className="bg-amber-500 text-white px-3 py-1 text-sm font-medium shadow-md">
              Yet to Review
            </Badge>
          </motion.div>
        </div>
      ) : (
        isCandidate &&
        reviewStatus !== "completed" &&
        reviewStatus !== "upcoming" && (
          <div className="absolute -top-4 -right-4 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 10 }}
              transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
              className={`flex items-center justify-center p-2 rounded-full shadow-lg ${
                reviewStatus === "succeeded"
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
              }`}
            >
              {reviewStatus === "succeeded" ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
            </motion.div>
          </div>
        )
      )}

      <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
        <div
          className={`h-1 ${status === "live" ? "bg-blue-600" : "bg-blue-200 dark:bg-blue-600"}`}
        />
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {formattedDate}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge className={`flex items-center ${currentStatus.badge}`}>
                {currentStatus.icon}
                {currentStatus.text}
              </Badge>
            </motion.div>
          </div>

          <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {interview.title}
          </CardTitle>

          {interview.description && (
            <CardDescription className="line-clamp-2 text-sm">
              {interview.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pb-6">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <span>
              {interview.interviewerIds?.length || 0} interviewer
              {(interview.interviewerIds?.length || 0) !== 1 ? "s" : ""} • 1
              candidate
            </span>
          </div>

          {status === "live" && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white"
                onClick={() => joinMeeting(interview.streamCallId)}
              >
                Join Meeting
              </Button>
            </motion.div>
          )}

          {status === "upcoming" && (
            <div className="relative">
              <Button
                variant="outline"
                className="w-full border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                disabled
              >
                Waiting to Start
              </Button>
              <motion.div
                className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-md -z-10 opacity-0"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {status === "completed" && (
            <Button
              variant="outline"
              className={`w-full border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 ${isRecordingAvailable ? "text-green-500" : "hover:text-red-500"}`}
              onClick={async () => {
                if (!callRecordingUrl) return toast.error("No recording found");

                if (isRecordingAvailable) {
                  window.open(callRecordingUrl, "_blank");
                }
              }}
            >
              {isRecordingAvailable ? (
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Recording Available
                </span>
              ) : (
                <span className="flex items-center">
                  <XCircle className="h-4 w-4 mr-2" />
                  Recording Not Available
                </span>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MeetingCard;
