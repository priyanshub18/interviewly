# InterviewPrep AI

A comprehensive platform for interview preparation powered by AI, real-time collaboration, and interactive quizzes designed to help candidates excel in their job interviews.

![Image2](https://raw.githubusercontent.com/priyanshub18/interviewly/main/public/ss03.png)
![InterviewPrep AI Banner](https://raw.githubusercontent.com/priyanshub18/interviewly/main/public/ss01.png)

## 🚀 Features

- **AI-Powered Interview Planning**: Generate personalized interview preparation plans based on your skills and target position
- **Real-time Collaborative Editing**: Work on interview materials with mentors or peers in real-time
- **Interactive Quiz Platform**: Test your knowledge with auto-generated quizzes tailored to your learning needs
- **Interview Scheduling**: Seamlessly schedule and manage mock interviews with integrated calendar
- **Recording & Review**: Record mock interviews for later review with AI-powered feedback
- **Resume Builder**: Create and refine your resume with AI assistance and professional templates
- **Meeting Management**: Organize and track all your interview-related meetings in one place

## 💻 Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: Custom React components with responsive design
- **State Management**: React Context API and Convex queries

### Backend

- **Database**: Convex (real-time database with live queries)
- **Authentication**: Clerk with SIWE (Sign in with Ethereum) integration
- **API**: Serverless functions and webhooks
- **Email Service**: React Email + Resend
- **AI Integration**: Google Gemini API

### DevOps

- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Monitoring**: Vercel Analytics

## 🏗️ Architecture

The application follows a modern architecture leveraging the power of Next.js app router:

- **Server Components**: Optimized data fetching with React Server Components
- **Real-time Data**: Synchronized state across clients using Convex
- **Authentication**: Secure multi-provider auth through Clerk
- **API Layer**: RESTful endpoints with serverless functions
- **Webhook Integration**: Event-driven architecture for automated actions

## 📁 Project Structure

```
.
├── .next                  # Next.js build output
├── convex                 # Convex database schema and functions
│   ├── schema.ts          # Database schema definitions
│   ├── auth.ts            # Authentication logic
│   └── functions/         # Backend functions organized by domain
├── emails                 # Email templates using React Email
├── src                    # Source code
│   ├── _components        # Shared UI components
│   ├── actions            # Server actions
│   ├── app                # Next.js app router
│   │   ├── (admin)        # Admin panel routes
│   │   └── (root)         # Main application routes
│   │       ├── _components      # Root-specific components
│   │       ├── all-problems     # Practice problems listing
│   │       ├── create-problem   # Problem creation interface
│   │       ├── home             # Homepage
│   │       ├── make-resume      # Resume builder
│   │       ├── meeting          # Meeting management
│   │       ├── prepare-interview # Interview preparation
│   │       ├── recordings       # Interview recordings
│   │       └── schedule         # Interview scheduling
│   ├── components         # Global components
│   │   ├── ui/            # Core UI components
│   │   ├── forms/         # Form components and validation
│   │   └── layouts/       # Layout components
│   ├── lib/               # Utility functions and helpers
│   ├── hooks/             # Custom React hooks
│   └── constants          # Application constants
├── public                 # Static assets
└── types                  # TypeScript type definitions
```

## 🔒 Authentication Flow

The application uses Clerk for authentication with JWT integration to Convex:

1. User signs in through Clerk (email, social, or Web3)
2. Clerk generates JWT token with user claims
3. SIWE (Sign in with Ethereum) authentication adds blockchain-based security
4. JWT is verified by Convex using a webhook
5. User session is established with role-based permissions
6. Access control is enforced at both UI and database levels

## 🔄 Real-time Features

Powered by Convex's real-time database:

- Live collaborative editing of interview preparation materials
- Real-time peer feedback and commenting
- Instant quiz results and performance analytics
- Synchronized interview scheduling across participants
- Automatic content updates across all connected devices

## 🧠 AI Integration

The platform leverages Google Gemini API for:

- Generating personalized interview questions based on job descriptions
- Analyzing mock interview performance and providing feedback
- Creating tailored study plans for different roles and industries
- Assisting with resume optimization and improvement
- Auto-generating quizzes based on learning progress

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Clerk account for authentication
- Convex account for database
- Resend account for email services
- Google Gemini API key for AI features

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/interview-prep-ai.git
   cd interview-prep-ai
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

   Fill in your API credentials:

   - Clerk keys for authentication
   - Convex deployment URL
   - Stream API keys for video
   - Gemini API key for AI features
   - Resend API key for emails

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Initialize Convex
   ```bash
   npx convex dev
   ```

## 📊 Analytics and Monitoring

The application includes:

- User engagement tracking
- Performance metrics for interview practice
- Learning progress visualization
- Usage statistics for platform features

## 📱 Responsive Design

The platform is fully responsive and works seamlessly across:

- Desktop browsers
- Tablets
- Mobile devices

## 🔐 Security Features

- End-to-end encryption for sensitive user data
- GDPR compliance for data handling
- Regular security audits and penetration testing
- Two-factor authentication options

## 📝 License

[MIT](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out to our team at priyanshub18.work@gmail.com or open an issue on GitHub.
