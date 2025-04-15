import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  interviews: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
    questions: v.array(v.string()),
  })
    .index("by_candidate_id", ["candidateId"])
    .index("by_stream_id", ["streamCallId"])
    .index("by_status", ["status"])
    .index("by_status_and_time", ["status", "startTime"]),

  comments: defineTable({
    content: v.string(),
    rating: v.number(),
    interviewerId: v.string(),
    interviewId: v.id("interviews"),
  }).index("by_interview_id", ["interviewId"]),

  questions: defineTable({
    q_id: v.string(),
    number: v.number(),
    title: v.string(),
    description: v.string(),
    difficulty: v.union(
      v.literal("Easy"),
      v.literal("Medium"),
      v.literal("Hard"),
    ),
    examples: v.array(
      v.object({
        input: v.string(),
        output: v.string(),
        explanation: v.optional(v.string()),
      }),
    ),
    constraints: v.array(v.string()),
    starterCode: v.array(
      v.object({
        lang: v.string(),
        code: v.string(),
      }),
    ),
  }).index("by_qid", ["q_id", "number"]),
  flashcards: defineTable({
    user: v.string(),
    categories: v.optional(v.array(v.string())),
    flashcards: v.optional(
      v.array(
        v.object({
          title: v.string(),
          question: v.string(),
          answer: v.string(),
          category: v.string(),
        }),
      ),
    ),
  }).index("by_user", ["user"]),

  quizzes: defineTable({
    userId: v.string(),
    quizId: v.string(),
    title: v.string(),
    category: v.string(),
    description: v.string(),
    totalQuestions: v.number(),
    badges: v.array(v.string()),
    totalTime: v.number(),
    strongAreas: v.array(v.string()),
    weakAreas: v.array(v.string()),
    attempts: v.number(),

    attemptsHistory: v.array(
      v.object({
        attemptId: v.number(),
        completedOn: v.string(),
        score: v.number(),
        correctAnswers: v.number(),
        incorrectAnswers: v.number(),
        skippedAnswers: v.number(),
        timeSpent: v.string(),
        questions: v.array(
          v.object({
            id: v.string(),
            question: v.string(),
            yourAnswer: v.string(),
            correctAnswer: v.string(),
            isCorrect: v.boolean(),
            timeSpent: v.string(),
          }),
        ),
      }),
    ),

    recommendedResources: v.array(
      v.object({
        title: v.string(),
        type: v.string(),
        url: v.string(),
      }),
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_quizId", ["quizId"]),
});
