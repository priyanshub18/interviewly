"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import LoaderUI from "@/components/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  PlusCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "../_components/CommentDialog";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const { theme } = useTheme();
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string,
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`, {
        style: {
          background: theme === "dark" ? "#1e1e2e" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1e1e2e",
          border: "1px solid #9333ea",
        },
      });
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (!interviews || !users) return <LoaderUI />;

  const groupedInterviews = groupInterviews(interviews);

  return (
    <div className="container mx-auto py-10 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Interview Dashboard
        </h1>
        <Link href="/schedule">
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <PlusCircleIcon className="h-5 w-5" />
              Schedule New Interview
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <div className="space-y-12">
        {INTERVIEW_CATEGORY.map(
          (category, categoryIndex) =>
            groupedInterviews[category.id]?.length > 0 && (
              <motion.section
                key={category.id}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={{ delay: categoryIndex * 0.1 }}
                className="border-l-4 pl-4 border-blue-500 dark:border-blue-400"
              >
                {/* CATEGORY TITLE */}
                <motion.div
                  className="flex items-center gap-2 mb-6"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {groupedInterviews[category.id].length}
                  </Badge>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  {groupedInterviews[category.id].map(
                    (interview: Interview, idx: number) => {
                      const candidateInfo = getCandidateInfo(
                        users,
                        interview.candidateId,
                      );
                      const startTime = new Date(interview.startTime);

                      return (
                        <motion.div
                          key={interview._id}
                          variants={itemVariants}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <Card className="overflow-hidden border border-blue-200 dark:border-blue-900 shadow-md">
                            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
                            {/* CANDIDATE INFO */}
                            <CardHeader className="p-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Avatar className="h-12 w-12 ring-2 ring-blue-300 dark:ring-blue-600">
                                    <AvatarImage src={candidateInfo.image} />
                                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                                      {candidateInfo.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>
                                <div>
                                  <CardTitle className="text-lg font-bold">
                                    {candidateInfo.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground font-medium">
                                    {interview.title}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>

                            {/* DATE & TIME */}
                            <CardContent className="p-4 bg-blue-50 dark:bg-blue-950/30">
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  <span>{format(startTime, "MMM dd")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ClockIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  <span>{format(startTime, "hh:mm a")}</span>
                                </div>
                              </div>
                            </CardContent>

                            {/* PASS & FAIL BUTTONS */}
                            <CardFooter className="p-4 pt-4 flex flex-col gap-3">
                              {interview.status === "completed" && (
                                <div className="flex gap-3 w-full">
                                  <motion.div
                                    className="flex-1"
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                  >
                                    <Button
                                      className="w-full bg-green-600 hover:bg-green-700"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "succeeded",
                                        )
                                      }
                                    >
                                      <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                      Pass
                                    </Button>
                                  </motion.div>
                                  <motion.div
                                    className="flex-1"
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                  >
                                    <Button
                                      variant="destructive"
                                      className="w-full"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "failed",
                                        )
                                      }
                                    >
                                      <XCircleIcon className="h-4 w-4 mr-2" />
                                      Fail
                                    </Button>
                                  </motion.div>
                                </div>
                              )}
                              <motion.div
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonVariants}
                                className="w-full"
                              >
                                <CommentDialog interviewId={interview._id} />
                              </motion.div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    },
                  )}
                </motion.div>
              </motion.section>
            ),
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
