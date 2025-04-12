import { motion } from "framer-motion";
import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CalendarIcon, Users, Clock, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();
  const status = getMeetingStatus(interview);
  const formattedDate = interview?.startTime
    ? format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a")
    : "Date not set";

  const statusVariants = {
    live: {
      badge: "bg-purple-600 text-white hover:bg-purple-700",
      text: "Live Now",
      icon: <span className="animate-pulse mr-1">●</span>,
    },
    upcoming: {
      badge:
        "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200",
      text: "Upcoming",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    completed: {
      badge:
        "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200",
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
    >
      <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
        <div
          className={`h-1 ${status === "live" ? "bg-purple-600" : "bg-purple-200 dark:bg-purple-800"}`}
        />
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              {formattedDate}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge className={`flex items-center ${currentStatus.badge}`}>
                {currentStatus.icon}
                {currentStatus.text}
              </Badge>
            </motion.div>
          </div>

          <CardTitle className="text-xl font-bold text-purple-800 dark:text-purple-400">
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
            <Users className="h-4 w-4 mr-2 text-purple-500" />
            <span>
              {interview.interviewerIds?.length || 0} interviewer
              {(interview.interviewerIds?.length || 0) !== 1 ? "s" : ""} • 1
              candidate
            </span>
          </div>

          {status === "live" && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all font-medium text-white"
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
                className="w-full border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                disabled
              >
                Waiting to Start
              </Button>
              <motion.div
                className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-md -z-10 opacity-0"
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
              className="w-full border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              View Recording
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MeetingCard;
