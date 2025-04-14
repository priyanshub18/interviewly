import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createFlashcard = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    question: v.string(),
    answer: v.string(),
    category: v.string(),
  },

  handler: async (ctx, args) => {
    const { userId, title, question, answer, category } = args;

    // Step 1: Check if user exists
    let userDoc = await ctx.db
      .query("flashcards")
      .withIndex("by_user", (q) => q.eq("user", userId))
      .unique();

    // Step 2: Create new user if they don't exist
    if (!userDoc) {
      await ctx.db.insert("flashcards", {
        user: userId,
        categories: [category],
        flashcards: [
          {
            title,
            question,
            answer,
            category,
          },
        ],
      });
      return { status: "User created and flashcard added." };
    }

    const existingFlashcards = userDoc.flashcards ?? [];

    const duplicate = existingFlashcards.find(
      (fc) =>
        fc.title === title &&
        fc.question === question &&
        fc.category === category,
    );

    if (duplicate) {
      return { status: "Duplicate flashcard exists. Not added. error" };
    }

    const updatedFlashcards = [
      ...existingFlashcards,
      {
        title,
        question,
        answer,
        category,
      },
    ];

    const updatedCategories = userDoc.categories?.includes(category)
      ? userDoc.categories
      : [...(userDoc.categories ?? []), category];

    await ctx.db.patch(userDoc._id, {
      flashcards: updatedFlashcards,
      categories: updatedCategories,
    });

    return { status: "Flashcard added successfully." };
  },
});

export const getFlashcardsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    const userDoc = await ctx.db
      .query("flashcards")
      .withIndex("by_user", (q) => q.eq("user", userId))
      .first();

    if (!userDoc) return [];

    return userDoc.flashcards;
  },
});

export const getCategoriesByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    const userDoc = await ctx.db
      .query("flashcards")
      .withIndex("by_user", (q) => q.eq("user", userId))
      .first();

    if (!userDoc) return [];

    return userDoc.categories;
  },
});

export const deleteFlashcard = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    question: v.string(),
  },

  handler: async (ctx, args) => {
    const { userId, title, question } = args;

    // Step 1: Fetch user document
    const userDoc = await ctx.db
      .query("flashcards")
      .withIndex("by_user", (q) => q.eq("user", userId))
      .unique();

    if (!userDoc) {
      return { status: "User not found erorr" };
    }

    const flashcards = userDoc.flashcards ?? [];

    // Step 2: Filter out the flashcard to delete
    const updatedFlashcards = flashcards.filter(
      (fc) => !(fc.title === title && fc.question === question),
    );

    if (flashcards.length === updatedFlashcards.length) {
      return { status: "Flashcard not found. Nothing deleted." };
    }

    // Step 3: Update categories if the deleted flashcard's category no longer exists
    const deletedFlashcard = flashcards.find(
      (fc) => fc.title === title && fc.question === question,
    );
    const categoryToRemove = deletedFlashcard?.category;

    const isCategoryStillUsed = updatedFlashcards.some(
      (fc) => fc.category === categoryToRemove,
    );

    const updatedCategories = isCategoryStillUsed
      ? userDoc.categories
      : userDoc.categories?.filter((cat) => cat !== categoryToRemove);

    // Step 4: Patch the user document
    await ctx.db.patch(userDoc._id, {
      flashcards: updatedFlashcards,
      categories: updatedCategories,
    });

    return { status: "Flashcard deleted successfully." };
  },
});
