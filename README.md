# Interviewly

A comprehensive interview preparation platform with AI-powered features.

## Features

- **AI-Powered Resume Builder**: Create and enhance professional resumes with AI assistance
- **Interview Preparation**: Generate personalized study plans
- **Quiz Generation**: Create custom quizzes for practice
- **Meeting Management**: Schedule and conduct interviews
- **Job Applications**: Track applications and get notifications

## API Routes

### Enhance Resume API

**Endpoint**: `POST /api/enhance-resume`

Enhance your resume content using AI to make it more compelling and ATS-friendly.

**Request Body**:
```json
{
  "resume_content": "Your resume text content here...",
  "target_role": "Software Engineer", // Optional
  "target_industry": "Technology" // Optional
}
```

**Response**:
```json
{
  "enhanced_content": "Enhanced resume content...",
  "improvements_made": [
    "Replaced weak verbs with strong action verbs",
    "Added quantifiable achievements",
    "Improved clarity and structure"
  ],
  "suggestions": [
    "Consider adding a skills section",
    "Include more specific project outcomes"
  ],
  "word_count": {
    "original": 150,
    "enhanced": 180
  },
  "readability_score": {
    "original": 6,
    "enhanced": 8
  }
}
```

**Features**:
- Strong action verb replacement
- ATS optimization
- Professional language enhancement
- Grammar and spelling correction
- Content structure improvement
- Quantifiable achievements addition

### Other API Routes

- `POST /api/generate-studyplan` - Generate personalized study plans
- `POST /api/generate-questions` - Create custom interview questions
- `POST /api/generate-quiz` - Generate practice quizzes
- `POST /api/generate-answer` - Get AI-generated answers
- `POST /api/send-email` - Send email notifications
- `POST /api/send-job-notification` - Send job application notifications

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `GEMINI_API_KEY` - Google Gemini API key
   - Other required environment variables
4. Run the development server: `npm run dev`

## Usage

### Resume Builder

1. Navigate to `/make-resume`
2. Fill in your personal information, experience, education, skills, and projects
3. Use the AI Enhancement tab to improve your content
4. Preview and download your resume as PDF

### Interview Preparation

1. Go to `/prepare-interview`
2. Enter job details and your current skills
3. Generate a personalized study plan
4. Follow the daily schedule to prepare effectively

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Convex, Google Gemini AI
- **Authentication**: Clerk
- **Styling**: Framer Motion, Lucide Icons
- **PDF Generation**: jsPDF, html2canvas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.