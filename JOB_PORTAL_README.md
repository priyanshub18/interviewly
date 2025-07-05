# Job Portal - Interviewly

A comprehensive job portal integrated into the Interviewly platform that allows admins/interviewers to post jobs and candidates to apply for them.

## Features

### For Admins/Interviewers:
- **Post Jobs**: Create detailed job postings with requirements, responsibilities, and skills
- **Manage Jobs**: View, edit, and delete posted jobs
- **Review Applications**: View all applications for each job
- **Update Application Status**: Change application status (Pending, Under Review, Shortlisted, Rejected, Hired)
- **Add Notes**: Add private notes to applications
- **Job Statistics**: View overview of posted jobs and applications

### For Candidates:
- **Browse Jobs**: Search and filter through available job postings
- **Job Details**: View comprehensive job information
- **Apply for Jobs**: Submit applications with cover letters and resume URLs
- **Track Applications**: Monitor the status of submitted applications
- **Application History**: View all past applications with statistics

## Database Schema

### Jobs Table
- `title`: Job title
- `company`: Company name
- `location`: Job location
- `type`: Job type (Full-time, Part-time, Contract, Internship, Remote)
- `description`: Detailed job description
- `requirements`: Array of job requirements
- `responsibilities`: Array of job responsibilities
- `salary`: Optional salary information
- `experienceLevel`: Experience level (Entry, Mid, Senior, Lead, Executive)
- `skills`: Array of required skills
- `postedBy`: Clerk ID of the job poster
- `status`: Job status (Active, Closed, Draft)
- `postedAt`: Timestamp when job was posted
- `deadline`: Optional application deadline
- `applicationsCount`: Number of applications received

### Job Applications Table
- `jobId`: Reference to the job
- `applicantId`: Clerk ID of the applicant
- `coverLetter`: Applicant's cover letter
- `resume`: Optional resume URL
- `status`: Application status (Pending, Under Review, Shortlisted, Rejected, Hired)
- `appliedAt`: Timestamp when application was submitted
- `reviewedAt`: Optional timestamp when application was reviewed
- `reviewedBy`: Clerk ID of the reviewer
- `notes`: Optional notes from the employer

## API Functions

### Job Management
- `createJob`: Create a new job posting
- `getAllActiveJobs`: Get all active jobs with filtering and pagination
- `getJobById`: Get specific job details
- `getJobsByPoster`: Get jobs posted by the current user
- `updateJobStatus`: Update job status
- `deleteJob`: Delete a job and all its applications
- `searchJobs`: Search jobs by keywords

### Application Management
- `applyForJob`: Submit a job application
- `getJobApplications`: Get all applications for a specific job
- `getMyApplications`: Get applications submitted by the current user
- `updateApplicationStatus`: Update application status and add notes

### Statistics
- `getJobStats`: Get job and application statistics for the dashboard

## Pages

### Public Pages
- `/jobs` - Browse all available jobs
- `/jobs/[id]` - View specific job details and apply

### Candidate Pages
- `/my-applications` - View and track submitted applications

### Admin/Interviewer Pages
- `/post-job` - Create a new job posting
- `/manage-jobs` - Manage posted jobs and review applications

## Navigation

The job portal is integrated into the main navigation:

### For Candidates:
- **Jobs**: Browse available job opportunities
- **My Applications**: Track submitted applications

### For Interviewers:
- **Jobs**: Browse all jobs (including their own)
- **Post Job**: Create new job postings
- **Manage Jobs**: Manage posted jobs and applications

## Usage

### Posting a Job (Admin/Interviewer)
1. Navigate to "Post Job" from the navigation
2. Fill in all required fields (title, company, location, type, description, etc.)
3. Add requirements, responsibilities, and required skills
4. Set optional fields like salary and deadline
5. Submit the job posting

### Applying for a Job (Candidate)
1. Browse available jobs on the "Jobs" page
2. Click on a job to view details
3. Click "Apply Now" button
4. Write a compelling cover letter
5. Optionally provide a resume URL
6. Submit the application

### Managing Applications (Admin/Interviewer)
1. Go to "Manage Jobs" page
2. Click "View Applications" on any job
3. Review each application
4. Update application status and add notes as needed

## Security & Permissions

- Only authenticated users can access the job portal
- Only admins/interviewers can create and manage jobs
- Users can only view applications for jobs they posted
- Users can only update their own job postings
- Application status updates are restricted to job posters

## Future Enhancements

- Email notifications for application status changes
- Resume file upload functionality
- Advanced search and filtering options
- Job recommendations based on user profile
- Interview scheduling integration
- Application analytics and reporting
- Bulk application management
- Job templates for quick posting 