"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRoles } from "../../../hooks/useUserRoles";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "../../../components/InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRoles();

  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return router.push("/");

  return <InterviewScheduleUI />;
}
export default SchedulePage;
