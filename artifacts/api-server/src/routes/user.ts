import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { eq, sql } from "drizzle-orm";
import { db, userProgressTable } from "@workspace/db";

const router: IRouter = Router();

function requireAuth(req: any, res: any, next: any) {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  req.clerkUserId = userId;
  next();
}

router.get("/user/progress", requireAuth, async (req: any, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(userProgressTable)
    .where(eq(userProgressTable.clerkUserId, req.clerkUserId));

  if (!row) {
    res.json(null);
    return;
  }

  res.json({
    ...row,
    customBooks: JSON.parse(row.customBooks || "[]"),
    habits: JSON.parse(row.habits || "[]"),
  });
});

router.put("/user/progress", requireAuth, async (req: any, res): Promise<void> => {
  const body = req.body;
  const clerkUserId: string = req.clerkUserId;

  const customBooks = JSON.stringify(body.customBooks ?? []);
  const habitsProvided = Object.prototype.hasOwnProperty.call(body, "habits");
  const habitsValue = JSON.stringify(body.habits ?? []);

  const insertValues = {
    clerkUserId,
    xp: body.xp ?? 0,
    level: body.level ?? 1,
    streak: body.streak ?? 0,
    lastReadDate: body.lastReadDate ?? null,
    streakDays: body.streakDays ?? [],
    totalIdeasRead: body.totalIdeasRead ?? body.totalTopicsRead ?? 0,
    ideasReadToday: body.ideasReadToday ?? body.topicsReadToday ?? 0,
    totalTopicsRead: body.totalTopicsRead ?? body.totalIdeasRead ?? 0,
    topicsReadToday: body.topicsReadToday ?? body.ideasReadToday ?? 0,
    dailyGoal: body.dailyGoal ?? 5,
    completedBookIds: body.completedBookIds ?? [],
    completedLessonIds: body.completedLessonIds ?? [],
    completedTopicIds: body.completedTopicIds ?? [],
    savedBookIds: body.savedBookIds ?? [],
    inProgressBookId: body.inProgressBookId ?? null,
    inProgressLessonId: body.inProgressLessonId ?? null,
    inProgressTopicId: body.inProgressTopicId ?? null,
    inProgressIdeaIndex: body.inProgressIdeaIndex ?? 0,
    goals: body.goals ?? [],
    hasOnboarded: body.hasOnboarded ?? false,
    customBooks,
    habits: habitsValue,
  };

  const [row] = await db
    .insert(userProgressTable)
    .values(insertValues)
    .onConflictDoUpdate({
      target: userProgressTable.clerkUserId,
      set: {
        xp: insertValues.xp,
        level: insertValues.level,
        streak: insertValues.streak,
        lastReadDate: insertValues.lastReadDate,
        streakDays: insertValues.streakDays,
        totalIdeasRead: insertValues.totalIdeasRead,
        ideasReadToday: insertValues.ideasReadToday,
        totalTopicsRead: insertValues.totalTopicsRead,
        topicsReadToday: insertValues.topicsReadToday,
        dailyGoal: insertValues.dailyGoal,
        completedBookIds: insertValues.completedBookIds,
        completedLessonIds: insertValues.completedLessonIds,
        completedTopicIds: insertValues.completedTopicIds,
        savedBookIds: insertValues.savedBookIds,
        inProgressBookId: insertValues.inProgressBookId,
        inProgressLessonId: insertValues.inProgressLessonId,
        inProgressTopicId: insertValues.inProgressTopicId,
        inProgressIdeaIndex: insertValues.inProgressIdeaIndex,
        goals: insertValues.goals,
        hasOnboarded: insertValues.hasOnboarded,
        customBooks,
        habits: habitsProvided
          ? habitsValue
          : sql`${userProgressTable.habits}`,
        updatedAt: new Date(),
      },
    })
    .returning();

  res.json({
    ...row,
    customBooks: JSON.parse(row.customBooks || "[]"),
    habits: JSON.parse(row.habits || "[]"),
  });
});

export default router;
