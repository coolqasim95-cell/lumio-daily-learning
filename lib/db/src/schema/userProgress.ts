import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userProgressTable = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  lastReadDate: text("last_read_date"),
  streakDays: text("streak_days").array().notNull().default([]),
  totalIdeasRead: integer("total_ideas_read").notNull().default(0),
  ideasReadToday: integer("ideas_read_today").notNull().default(0),
  totalTopicsRead: integer("total_topics_read").notNull().default(0),
  topicsReadToday: integer("topics_read_today").notNull().default(0),
  dailyGoal: integer("daily_goal").notNull().default(5),
  completedBookIds: text("completed_book_ids").array().notNull().default([]),
  completedLessonIds: text("completed_lesson_ids").array().notNull().default([]),
  completedTopicIds: text("completed_topic_ids").array().notNull().default([]),
  savedBookIds: text("saved_book_ids").array().notNull().default([]),
  inProgressBookId: text("in_progress_book_id"),
  inProgressLessonId: text("in_progress_lesson_id"),
  inProgressTopicId: text("in_progress_topic_id"),
  inProgressIdeaIndex: integer("in_progress_idea_index").notNull().default(0),
  goals: text("goals").array().notNull().default([]),
  hasOnboarded: boolean("has_onboarded").notNull().default(false),
  customBooks: text("custom_books").notNull().default("[]"),
  habits: text("habits").notNull().default("[]"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertUserProgressSchema = createInsertSchema(
  userProgressTable
).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgressTable.$inferSelect;
