"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, Users, Calendar, Edit, Trash2, Eye, Plus, ArrowLeft, Sparkles, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Custom Card Component
const CustomCard = ({ children, className = "", ...props }: any) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-600/20 shadow-2xl shadow-blue-600/10  transition-all duration-500 hover:scale-[1.02] hover:border-blue-600/40 group ${className}`}
    {...props}
  >
    {/* Animated border gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    <div className="absolute inset-[1px] bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl" />
    
    {/* Glow effect */}
    {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
    
    <div className="relative z-10 p-6">
      {children}
    </div>
  </div>
);

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, children, className = "" }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`fixed inset-4 z-50 flex items-center justify-center ${className}`}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-blue-600/30 rounded-3xl shadow-2xl shadow-blue-600/20 overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-blue-600/30 rounded-3xl" />
              <div className="absolute inset-[1px] bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-3xl" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative z-10 p-8 max-h-[90vh] overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Custom Badge Component
const CustomBadge = ({ children, variant = "default", className = "" }: any) => {
  const variants = {
    default: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    success: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    warning: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    danger: "bg-red-500/20 text-red-300 border-red-400/30",
    info: "bg-slate-500/20 text-slate-300 border-slate-400/30",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function ManageJobsPage() {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isViewApplicationsOpen, setIsViewApplicationsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  
  // Modal states
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [jobToDelete, setJobToDelete] = useState<any>(null);

  const jobs = useQuery(api.jobs.getJobsByPoster, {});
  const applications = useQuery(api.jobs.getJobApplications, 
    selectedJob ? { jobId: selectedJob._id } : "skip"
  );
  const updateJobStatus = useMutation(api.jobs.updateJobStatus);
  const updateApplicationStatus = useMutation(api.jobs.updateApplicationStatus);
  const deleteJob = useMutation(api.jobs.deleteJob);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Closed":
        return "danger";
      case "Draft":
        return "info";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "default";
      case "Part-time":
        return "info";
      case "Contract":
        return "warning";
      case "Internship":
        return "success";
      case "Remote":
        return "default";
      default:
        return "info";
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Under Review":
        return "default";
      case "Shortlisted":
        return "success";
      case "Rejected":
        return "danger";
      case "Hired":
        return "success";
      default:
        return "info";
    }
  };

  const showSuccessModal = (message: string) => {
    setModalMessage(message);
    setIsSuccessModalOpen(true);
  };

  const showErrorModal = (message: string) => {
    setModalMessage(message);
    setIsErrorModalOpen(true);
  };

  const handleUpdateJobStatus = async () => {
    if (!selectedJob || !newStatus) return;

    try {
      await updateJobStatus({
        jobId: selectedJob._id,
        status: newStatus as any,
      });
      setIsUpdateStatusOpen(false);
      setNewStatus("");
      showSuccessModal("Job status updated successfully!");
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : "Failed to update job status");
    }
  };

  const handleUpdateApplicationStatus = async () => {
    if (!selectedApplication || !newStatus) return;

    try {
      await updateApplicationStatus({
        applicationId: selectedApplication._id,
        status: newStatus as any,
        notes: notes || undefined,
      });
      setIsUpdateStatusOpen(false);
      setNewStatus("");
      setNotes("");
      setSelectedApplication(null);
      showSuccessModal("Application status updated successfully!");
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : "Failed to update application status");
    }
  };

  const confirmDelete = (job: any) => {
    setJobToDelete(job);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteJob = async () => {
    if (!jobToDelete) return;

    try {
      await deleteJob({ jobId: jobToDelete._id as any });
      setIsConfirmDeleteOpen(false);
      setJobToDelete(null);
      showSuccessModal("Job deleted successfully!");
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : "Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-black text-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header styled like flashcard page */}
        <div className="relative flex flex-col items-center justify-center mb-12 mt-4">
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/50 to-blue-600/50 border border-blue-600/30 rounded-full px-6 py-3 mb-6 backdrop-blur-xl shadow-lg shadow-blue-600/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <Sparkles size={18} className="text-blue-600" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles size={18} className="text-blue-600 opacity-20" />
              </div>
            </div>
            <span className="text-sm text-blue-300 font-semibold tracking-wide">
              Manage your opportunities
            </span>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </motion.div>

          {/* Premium Title */}
          <motion.h1
            className="text-4xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Manage{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">
              Your Jobs
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-blue-300/80 mb-2 leading-relaxed max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Review applications and manage your job postings efficiently.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <Link href="/post-job">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/30 hover:scale-105">
              <Plus className="h-5 w-5 mr-2" />
              Post New Job
            </Button>
          </Link>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs?.jobs?.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <CustomCard>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <CustomBadge variant={getStatusColor(job.status)}>
                      {job.status}
                    </CustomBadge>
                    <CustomBadge variant={getTypeColor(job.type)}>
                      {job.type}
                    </CustomBadge>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {job.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-300/80 text-sm">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-2 text-blue-300/80 text-sm">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-blue-200/70">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {job.applicationsCount} applications
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(job.postedAt)}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <CustomBadge key={index} variant="default" className="text-xs">
                        {skill}
                      </CustomBadge>
                    ))}
                    {job.skills.length > 3 && (
                      <CustomBadge variant="default" className="text-xs">
                        +{job.skills.length - 3} more
                      </CustomBadge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600/80 to-blue-600/80 hover:from-blue-600 hover:to-blue-600 text-white border-0 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-blue-600/20 rounded-xl"
                        onClick={() => {
                          setSelectedJob(job);
                          setIsViewApplicationsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Applications
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-slate-600/80 to-slate-700/80 hover:from-slate-600 hover:to-slate-700 text-white border-0 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-slate-600/20 rounded-xl"
                        onClick={() => {
                          setSelectedJob(job);
                          setIsUpdateStatusOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Update Status
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 text-white border-0 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-red-600/20 rounded-xl"
                      onClick={() => confirmDelete(job)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Job
                    </Button>
                  </div>
                </div>
              </CustomCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {jobs?.jobs?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CustomCard className="p-12">
              <div className="text-blue-600 mb-6">
                <Building className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No jobs posted yet
              </h3>
              <p className="text-blue-300/80 mb-8 max-w-md mx-auto">
                Start posting jobs to attract talented candidates to your
                organization and build your team.
              </p>
              <Link href="/post-job">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-600/30 hover:scale-105">
                  <Plus className="h-5 w-5 mr-2" />
                  Post Your First Job
                </Button>
              </Link>
            </CustomCard>
          </motion.div>
        )}

        {/* View Applications Modal */}
        <CustomModal
          isOpen={isViewApplicationsOpen}
          onClose={() => setIsViewApplicationsOpen(false)}
        >
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Applications for {selectedJob?.title}
              </h2>
              <p className="text-blue-300/80">
                Review and manage applications for this position
              </p>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {applications?.map((application) => (
                <CustomCard key={application._id} className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <CustomBadge variant={getApplicationStatusColor(application.status)}>
                            {application.status}
                          </CustomBadge>
                          <div className="flex items-center gap-1 text-xs text-blue-300/60">
                            <Calendar className="h-3 w-3" />
                            {formatDate(application.appliedAt)}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {application.applicant?.name || "Unknown Applicant"}
                        </h3>
                        <p className="text-blue-300/80 text-sm">
                          {application.applicant?.email}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600/80 to-blue-600/80 hover:from-blue-600 hover:to-blue-600 text-white border-0 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-blue-600/20 rounded-xl"
                        onClick={() => {
                          setSelectedApplication(application);
                          setNewStatus(application.status);
                          setNotes(application.notes || "");
                          setIsUpdateStatusOpen(true);
                          setIsViewApplicationsOpen(false);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Update Status
                      </Button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Application Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                          Application Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-3 px-4 bg-blue-600/10 rounded-xl backdrop-blur-sm border border-blue-600/20">
                            <span className="text-blue-200/70 text-sm">Applied</span>
                            <span className="text-white text-sm">{formatDate(application.appliedAt)}</span>
                          </div>
                          {application.reviewedAt && (
                            <div className="flex items-center justify-between py-3 px-4 bg-blue-600/10 rounded-xl backdrop-blur-sm border border-blue-600/20">
                              <span className="text-blue-200/70 text-sm">Reviewed</span>
                              <span className="text-white text-sm">{formatDate(application.reviewedAt)}</span>
                            </div>
                          )}
                          {application.resume && (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between py-3 px-4 bg-blue-600/10 hover:bg-blue-600/20 rounded-xl backdrop-blur-sm border border-blue-600/20 hover:border-blue-600/30 transition-all group"
                            >
                              <span className="text-blue-600 text-sm">View Resume</span>
                              <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                          Cover Letter
                        </h4>
                        <div className="bg-blue-600/10 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                          <p className="text-sm text-blue-200/80 leading-relaxed line-clamp-4">
                            {application.coverLetter}
                          </p>
                          <div className="flex justify-end mt-3">
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto text-blue-600 hover:text-blue-300 flex items-center gap-1"
                              onClick={() => {
                                setSelectedCoverLetter(application.coverLetter);
                                setIsCoverLetterModalOpen(true);
                              }}
                            >
                              Read full letter
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {application.notes && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
                          Your Notes
                        </h4>
                        <div className="bg-blue-600/10 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                          <p className="text-sm text-blue-200/80 leading-relaxed">
                            {application.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CustomCard>
              ))}

              {applications?.length === 0 && (
                <CustomCard className="p-12 text-center">
                  <div className="text-blue-400 mb-4">
                    <Users className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No applications yet
                  </h3>
                  <p className="text-blue-300/80">
                    Applications will appear here once candidates start applying.
                  </p>
                </CustomCard>
              )}
            </div>
          </div>
        </CustomModal>

        {/* Update Status Modal */}
        <CustomModal
          isOpen={isUpdateStatusOpen}
          onClose={() => {
            setIsUpdateStatusOpen(false);
            setNewStatus("");
            setNotes("");
            setSelectedApplication(null);
          }}
        >
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedApplication ? "Update Application Status" : "Update Job Status"}
              </h2>
              <p className="text-blue-300/80">
                {selectedApplication
                  ? "Update the status of this application and add notes if needed."
                  : "Change the status of this job posting."}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="status" className="text-white font-medium mb-3 block">
                  Status
                </Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="bg-slate-800/80 border-blue-500/20 text-white backdrop-blur-sm hover:bg-slate-800 transition-all rounded-xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/90 backdrop-blur-md border-blue-500/20">
                    {selectedApplication ? (
                      <>
                        <SelectItem value="Pending" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Pending
                        </SelectItem>
                        <SelectItem value="Under Review" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Under Review
                        </SelectItem>
                        <SelectItem value="Shortlisted" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Shortlisted
                        </SelectItem>
                        <SelectItem value="Rejected" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Rejected
                        </SelectItem>
                        <SelectItem value="Hired" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Hired
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Active" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Active
                        </SelectItem>
                        <SelectItem value="Closed" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Closed
                        </SelectItem>
                        <SelectItem value="Draft" className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                          Draft
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {selectedApplication && (
                <div>
                  <Label htmlFor="notes" className="text-white font-medium mb-3 block">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows={3}
                    className="bg-slate-800/80 border-blue-500/20 text-white placeholder:text-blue-300/60 backdrop-blur-sm hover:bg-slate-800 transition-all rounded-xl"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  className="border-blue-500/20 text-blue-300 hover:bg-blue-500/20 backdrop-blur-sm transition-all rounded-xl"
                  onClick={() => {
                    setIsUpdateStatusOpen(false);
                    setNewStatus("");
                    setNotes("");
                    setSelectedApplication(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 text-white backdrop-blur-sm transition-all rounded-xl"
                  onClick={selectedApplication ? handleUpdateApplicationStatus : handleUpdateJobStatus}
                  disabled={!newStatus}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        </CustomModal>

        {/* Success Modal */}
        <CustomModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/30 mx-auto">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-green-300/80">{modalMessage}</p>
            </div>
            <Button
              className="bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-600 hover:to-green-700 text-white backdrop-blur-sm transition-all rounded-xl px-8"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Continue
            </Button>
          </div>
        </CustomModal>

        {/* Error Modal */}
        <CustomModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/30 mx-auto">
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
              <p className="text-red-300/80">{modalMessage}</p>
            </div>
            <Button
              className="bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 text-white backdrop-blur-sm transition-all rounded-xl px-8"
              onClick={() => setIsErrorModalOpen(false)}
            >
              Try Again
            </Button>
          </div>
        </CustomModal>

        {/* Confirm Delete Modal */}
        <CustomModal
          isOpen={isConfirmDeleteOpen}
          onClose={() => {
            setIsConfirmDeleteOpen(false);
            setJobToDelete(null);
          }}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/30 mx-auto">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Deletion</h2>
              <p className="text-red-300/80">
                Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                className="border-red-500/20 text-red-300 hover:bg-red-500/20 backdrop-blur-sm transition-all rounded-xl"
                onClick={() => {
                  setIsConfirmDeleteOpen(false);
                  setJobToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 text-white backdrop-blur-sm transition-all rounded-xl"
                onClick={handleDeleteJob}
              >
                Delete Job
              </Button>
            </div>
          </div>
        </CustomModal>

        {/* Cover Letter Modal */}
        <CustomModal
          isOpen={isCoverLetterModalOpen}
          onClose={() => setIsCoverLetterModalOpen(false)}
        >
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Cover Letter</h2>
              <p className="text-blue-300/80">Full cover letter content</p>
            </div>
            <div className="bg-blue-600/10 rounded-xl p-6 backdrop-blur-sm border border-blue-600/20">
              <p className="text-sm text-blue-200/80 leading-relaxed whitespace-pre-wrap">
                {selectedCoverLetter}
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 text-white backdrop-blur-sm transition-all rounded-xl"
                onClick={() => setIsCoverLetterModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
}