# 🧠 AI Interview Prep Platform

Welcome to the **AI Interview Preparation Platform** – a smart, real-time web application built to help users streamline their technical interview journey. With advanced integrations like **Clerk for authentication**, **Convex for real-time backend**, and **AI-powered features** for resume building, interview planning, and quizzes, this app provides a seamless and intuitive experience for developers.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React, Tailwind CSS
- **Authentication**: Clerk
- **Backend-as-a-Service**: Convex (real-time mutations, queries, and data syncing)
- **Email Services**: Resend + React Emails
- **Libraries**: SCIX for secure Clerk-to-Convex JWT verification
- **Deployment**: Vercel (recommended)

---

## 🔥 Features

### ✅ Authentication

- Seamless login/signup flow using **Clerk**
- JWT verification between Clerk and Convex using **SCIX**
- Webhooks configured to listen to user-related events like registration

### 🧠 AI-Powered Interview Planner

- Enter your skills, experience, and goals
- Get a **customized AI-generated interview prep plan**
- Powered via AI integrations

### 📋 Quiz Platform

- Dynamic quiz generation engine (based on skills or topics)
- Interactive and time-based quizzes
- Scoring & summary analytics

### 📝 Resume Builder

- Interactive UI to generate a resume
- Real-time saving via Convex
- Download/export options

### 📹 Mock Interviews + Meeting Tools

- Schedule mock interviews
- Interview summary and feedback features
- Meeting integration support

### 🎯 Problem Tracker

- Create, edit, and view all coding problems
- Track interview questions
- Real-time CRUD via Convex

---

## 📁 Folder Structure

src/
├── app/ # App Router structure
│ ├── (admin)/ # Admin specific pages
│ ├── (root)/ # Main user pages
│ │ ├── \_components/ # Reusable components
│ │ ├── home/ # Homepage
│ │ ├── make-resume/ # Resume builder
│ │ ├── prepare-interview/ # AI interview planner
│ │ ├── schedule/ # Scheduling logic
│ │ ├── create-problem/ # Add problem page
│ │ ├── all-problems/ # View all problems
│ │ ├── recordings/ # Interview recordings
│ └── layout.tsx
├── components/ # Shared components
├── constants/ # Static constants
├── actions/ # Server actions
├── api/ # API routes
├── emails/ # React email templates
├── fonts/ # Fonts
└── interview-summary/ # Interview summary view

---

## 🔐 Authentication + Convex Integration

- **Clerk** is used for user management.
- **Convex** is connected via JWT using **SCIX** library.
- Example: When a user registers, a webhook (`/api/webhooks/clerk`) is triggered to update Convex database.

### Convex Tables

- `users.ts`: Handles user creation, mutation, and fetching logic
- Queries = read-only access
- Mutations = database writes or updates

---

## 📬 Emails

Uses `@react-email` and `resend` to send:

- Interview reminders
- Plan summaries
- Resume download links
- Other transactional emails

---

## 🛠 Setup Instructions

git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform
pnpm install
pnpm dev

- Set environment variables for **Clerk**, **Convex**, **Resend**, and **SCIX**
- Configure Clerk webhooks pointing to `/api/webhooks/clerk`

---

## 🤩 Future Scope

- Add code editor for mock interviews
- Integrate OpenAI for resume enhancement
- Enhance quiz engine using AI-generated questions
- Add leaderboard & interview streaks

---

## 👨‍💻 Author

**Priyanshu Bhardwaj**  
🧠 2nd-year CSE, NIT Jalandhar  
🔗 [LinkedIn]
