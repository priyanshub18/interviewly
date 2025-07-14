"use client";

import ProfessionalLoader from "@/components/Loader2";
import { useUserRoles } from "../../../hooks/useUserRoles";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "../../(root)/meeting/_components/InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRoles();

  if (isLoading) return <ProfessionalLoader text="Loading schedule..." variant="rings" size="lg" className="min-h-screen" />;
  if (!isInterviewer) return router.push("/dashboard");

  return <InterviewScheduleUI />;
}
export default SchedulePage;
