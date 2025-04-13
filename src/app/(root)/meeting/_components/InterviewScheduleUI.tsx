import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserInfo from "../../../../components/UserInfo";
import { Calendar } from "@/components/ui/calendar";
import {
  Loader2Icon,
  CalendarIcon,
  XIcon,
  PlusCircleIcon,
  ArrowUpRight,
} from "lucide-react";
import { TIME_SLOTS } from "@/constants";
import MeetingCard from "@/components/MeetingCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProblemSelection from "./ProblemPicker";
import { sendScheduledEmail } from "@/lib/SendVerificationMail";
import axios from "axios";
const SAMPLE_PROBLEMS = [
  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
  },
  {
    id: "add-two-numbers",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
  },
  {
    id: "longest-substring",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
  },
  {
    id: "median-two-arrays",
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
  },
];

// Component to display problem info
const ProblemInfo = ({ problem }) => (
  <div className="flex items-center gap-1">
    <span className="font-medium">{problem.number}.</span>
    <span>{problem.title}</span>
    <span
      className={`text-xs px-1.5 py-0.5 rounded ${
        problem.difficulty === "Easy"
          ? "bg-green-100 text-green-800"
          : problem.difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
      }`}
    >
      {problem.difficulty}
    </span>
  </div>
);
function InterviewScheduleUI() {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
  const users = useQuery(api.users.getUsers) ?? [];
  const createInterview = useMutation(api.interviews.createInterview);
  const questions = useQuery(api.questions.getAllQuestions) ?? [];
  const candidates = users?.filter((u) => u.role === "candidate");
  const interviewers = users?.filter((u) => u.role === "interviewer");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    candidateId: "",
    interviewerIds: user?.id ? [user.id] : [],
    questionId: [],
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const router = useRouter();
  const scheduleMeeting = async () => {
    if (!client || !user) return;
    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast.error("Please select both candidate and at least one interviewer");
      return;
    }

    setIsCreating(true);

    try {
      const { title, description, date, time, candidateId, interviewerIds } =
        formData;
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });
      const user2 = users.find((u) => u.clerkId === user?.id);
      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: "upcoming",
        streamCallId: id,
        candidateId,
        interviewerIds,
        questions: formData.questionId,
      });
      const emailResponse = await axios.post("/api/send-email", {
        name: user2?.name,
        title,
        email: user2?.email,
        date: formData.date,
        time: formData.time,
        type: "Video Interview",
      });
      if (emailResponse.data.success) {
        toast.success("Mail Sent Successfully");
      } else {
        toast.error("Failed to Send Mail!. Check your internet connection");
      }
      setOpen(false);
      toast.success("Meeting scheduled successfully!");

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
        questionId: [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const availableProblems = questions.filter(
    (problem) => !formData.questionId.includes(problem.q_id),
  );

  const addProblem = (problemId) => {
    if (!formData.questionId.includes(problemId)) {
      setFormData((prev) => ({
        ...prev,
        questionId: [...prev.questionId, problemId],
      }));
    }
  };
  const selectedProblems = questions.filter((p) =>
    formData.questionId.includes(p.q_id),
  );
  const removeProblem = (problemId) => {
    setFormData((prev) => ({
      ...prev,
      questionId: prev.questionId.filter((q_id) => q_id !== problemId),
    }));
  };

  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId],
      }));
    }
  };

  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
    }));
  };

  const selectedInterviewers = interviewers.filter((i) =>
    formData.interviewerIds.includes(i.clerkId),
  );

  const availableInterviewers = interviewers.filter(
    (i) => !formData.interviewerIds.includes(i.clerkId),
  );

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
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8 bg-background mt-20">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* HEADER INFO */}
        <div>
          <h1 className="text-4xl font-bold ">Interviews</h1>
          <p className="text-muted-foreground mt-1 hover:text-blue-500">
            Schedule and manage interviews
          </p>
        </div>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Schedule Interview
              </Button>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[800px] h-[calc(100vh-200px)] overflow-auto border-blue-200 dark:border-blue-600 p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">
                Schedule Interview
              </DialogTitle>
            </DialogHeader>

            <motion.div
              className="py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* TWO COLUMN LAYOUT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT COLUMN - Basic Info */}
                <div className="space-y-5">
                  {/* INTERVIEW TITLE */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Title<span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Interview title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 "
                    />
                  </div>

                  {/* INTERVIEW DESC */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Interview description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 "
                    />
                  </div>

                  {/* CANDIDATE */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Candidate<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.candidateId}
                      onValueChange={(candidateId) =>
                        setFormData({ ...formData, candidateId })
                      }
                    >
                      <SelectTrigger className="border-blue-200 focus:ring-blue-400 ">
                        <SelectValue placeholder="Select candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        {candidates.map((candidate) => (
                          <SelectItem
                            key={candidate.clerkId}
                            value={candidate.clerkId}
                          >
                            <UserInfo user={candidate} />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TIME SLOT */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Time<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.time}
                      onValueChange={(time) =>
                        setFormData({ ...formData, time })
                      }
                    >
                      <SelectTrigger className="border-blue-200 focus:ring-blue-400 ">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Problems<span className="text-red-500">*</span>
                    </label>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white p-2"
                      onClick={() => router.push("/create-problem")}
                    >
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="border border-blue-200 rounded-md p-3 min-h-24 flex flex-wrap gap-2 mb-2">
                      {selectedProblems.length > 0 ? (
                        selectedProblems.map((problem) => (
                          <motion.div
                            key={problem.q_id}
                            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ProblemInfo problem={problem} />
                            <motion.button
                              onClick={() => removeProblem(problem.q_id)}
                              className="hover:text-destructive transition-colors"
                              whileHover={{ rotate: 90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <XIcon className="h-4 w-4" />
                            </motion.button>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No Problems selected
                        </p>
                      )}
                    </div>

                    {/* Add Problems Dropdown */}
                    {availableProblems.length > 0 && (
                      <Select onValueChange={addProblem}>
                        <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                          <SelectValue placeholder="Add problem" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProblems.map((problem) => (
                            <SelectItem key={problem.q_id} value={problem.q_id}>
                              <ProblemInfo problem={problem} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN - Date & Interviewers */}
                <div className="space-y-5">
                  {/* CALENDAR */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Date<span className="text-red-500">*</span>
                    </label>
                    <div className="border border-blue-200  rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) =>
                          date && setFormData({ ...formData, date })
                        }
                        disabled={(date) => date < new Date()}
                        className="mx-auto"
                      />
                    </div>
                  </div>

                  {/* INTERVIEWERS */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Interviewer<span className="text-red-500">*</span>
                    </label>

                    {/* Selected Interviewers */}
                    <div className="border border-blue-200  rounded-md p-3 min-h-24 flex flex-wrap gap-2 mb-2">
                      {selectedInterviewers.length > 0 ? (
                        selectedInterviewers.map((interviewer) => (
                          <motion.div
                            key={interviewer.clerkId}
                            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <UserInfo user={interviewer} />
                            {interviewer.clerkId !== user?.id && (
                              <motion.button
                                onClick={() =>
                                  removeInterviewer(interviewer.clerkId)
                                }
                                className="hover:text-destructive transition-colors"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                              >
                                <XIcon className="h-4 w-4" />
                              </motion.button>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No interviewers selected
                        </p>
                      )}
                    </div>

                    {/* Add Interviewers Dropdown */}
                    {availableInterviewers.length > 0 && (
                      <Select onValueChange={addInterviewer}>
                        <SelectTrigger className="border-blue-200 focus:ring-blue-400 ">
                          <SelectValue placeholder="Add interviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableInterviewers.map((interviewer) => (
                            <SelectItem
                              key={interviewer.clerkId}
                              value={interviewer.clerkId}
                            >
                              <UserInfo user={interviewer} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-blue-100 dark:border-blue-900/50">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-900/30"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={scheduleMeeting}
                    disabled={isCreating}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isCreating ? (
                      <>
                        <Loader2Icon className="mr-2 size-4 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      "Schedule Interview"
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* LOADING STATE & MEETING CARDS */}
      {!interviews ? (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Loader2Icon className="size-8 text-blue-500" />
          </motion.div>
        </div>
      ) : interviews.length > 0 ? (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          //   initial="hidden"
          animate="visible"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <motion.div
                key={interview._id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MeetingCard interview={interview} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-20 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CalendarIcon className="mx-auto h-12 w-12 text-blue-300 dark:text-blue-700 mb-4" />
          <p className="text-lg font-medium">No interviews scheduled</p>
          <p className="mt-2">
            Click "Schedule Interview" to create your first interview
          </p>
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircleIcon className="mr-2 h-5 w-5" />
              Schedule Interview
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default InterviewScheduleUI;
