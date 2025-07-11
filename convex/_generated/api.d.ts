/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as activities from "../activities.js";
import type * as comments from "../comments.js";
import type * as crons from "../crons.js";
import type * as flashcards from "../flashcards.js";
import type * as http from "../http.js";
import type * as interviews from "../interviews.js";
import type * as jobs from "../jobs.js";
import type * as questions from "../questions.js";
import type * as quizzes from "../quizzes.js";
import type * as studyPlans from "../studyPlans.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  activities: typeof activities;
  comments: typeof comments;
  crons: typeof crons;
  flashcards: typeof flashcards;
  http: typeof http;
  interviews: typeof interviews;
  jobs: typeof jobs;
  questions: typeof questions;
  quizzes: typeof quizzes;
  studyPlans: typeof studyPlans;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
