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
import { Doc } from "../../convex/_generated/dataModel";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Interview = Doc<"interviews">;

interface MeetingCardProps {
  interview: Interview & { interviewers?: any[]; candidateInfo?: any; interviewerInfos?: any[] };
  candidateInfo?: any;
  interviewerInfos?: any[];
  isCandidateView?: boolean;
}

const MeetingCard = ({ 
  interview, 
  candidateInfo, 
  interviewerInfos, 
  isCandidateView = false 
}: MeetingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const startTime = new Date(interview.startTime);
  const now = new Date();
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // +1 hour
  const isMeetingAvailable = now >= startTime;
  const isLive = now >= startTime && now <= endTime;

  const getStatusColor = () => {
    if (isLive) return "bg-green-500";
    if (interview.status === "succeeded") return "bg-green-600";
    if (interview.status === "failed") return "bg-red-600";
    if (interview.status === "completed") return "bg-blue-600";
    return "bg-gray-600";
  };

  const getStatusText = () => {
    if (isLive) return "Live";
    if (interview.status === "succeeded") return "Passed";
    if (interview.status === "failed") return "Failed";
    if (interview.status === "completed") return "Completed";
    return "Upcoming";
  };

  const getBorderColor = () => {
    if (isLive) return "border-green-400 dark:border-green-500";
    if (interview.status === "succeeded") return "border-green-200 dark:border-green-900";
    if (interview.status === "failed") return "border-red-200 dark:border-red-900";
    if (interview.status === "completed") return "border-blue-200 dark:border-blue-900";
    return "border-gray-200 dark:border-gray-700";
  };

  const getBackgroundColor = () => {
    if (isLive) return "bg-green-50 dark:bg-green-950/30";
    if (interview.status === "succeeded") return "bg-green-50 dark:bg-green-950/30";
    if (interview.status === "failed") return "bg-red-50 dark:bg-red-950/30";
    if (interview.status === "completed") return "bg-blue-50 dark:bg-blue-950/30";
    return "bg-gray-50 dark:bg-gray-950/30";
  };

  const getButtonText = () => {
    if (isLive) return "Join Live";
    if (isMeetingAvailable && interview.status === "upcoming") return "Join Meeting";
    if (interview.status === "upcoming") return `Available at ${format(startTime, "hh:mm a")}`;
    if (interview.status === "completed") return "View Recording";
    return "View Details";
  };

  const getButtonVariant = () => {
    if (isLive) return "bg-green-500 hover:bg-green-600";
    if (interview.status === "succeeded") return "bg-green-600 hover:bg-green-700";
    if (interview.status === "failed") return "bg-red-600 hover:bg-red-700";
    if (interview.status === "completed") return "bg-blue-600 hover:bg-blue-700";
    return "bg-blue-600 hover:bg-blue-700";
  };

  const isButtonDisabled = () => {
    if (isLive) return false;
    if (interview.status === "upcoming") return !isMeetingAvailable;
    return false;
  };

  // Get the appropriate user info based on view type
  const getUserInfo = () => {
    if (isCandidateView && interview.interviewers && interview.interviewers.length > 0) {
      return interview.interviewers[0]; // Show first interviewer
    }
    if (!isCandidateView && candidateInfo) {
      return candidateInfo;
    }
    return {
      name: isCandidateView ? "Unknown Interviewer" : "Unknown Candidate",
      image: "",
      initials: isCandidateView ? "UI" : "UC",
    };
  };

  const userInfo = getUserInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl ${getBorderColor()}`}>
        <div className={`h-2 ${getStatusColor()}`} />
        
        <CardHeader className="p-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-12 w-12 ring-2 ring-blue-300 dark:ring-blue-600">
                <AvatarImage src={userInfo.image} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                  {userInfo.initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                {userInfo.name}
                {isLive && (
                  <Badge className="bg-green-500 text-white animate-pulse">
                    Live
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium">
                {interview.title}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`p-4 ${getBackgroundColor()}`}>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{format(startTime, "MMM dd")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{format(startTime, "hh:mm a")}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-4">
          <Link 
            href={isMeetingAvailable ? `/meeting/${interview.streamCallId}` : "#"} 
            passHref 
            legacyBehavior
          >
            <Button
              className={`w-full ${getButtonVariant()}`}
              disabled={isButtonDisabled()}
              title={isButtonDisabled() ? `Available at ${format(startTime, "hh:mm a")}` : "Join Meeting"}
            >
              {getButtonText()}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MeetingCard;
