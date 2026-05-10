import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
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
  const habits = JSON.stringify(body.habits ?? []);

  const values = {
    clerkUserId,
    xp: body.xp ?? 0,
    level: body.level ?? 1,
    streak: body.streak ?? 0,
    lastReadDate: body.lastReadDate ?? null,
    streakDays: body.streakDays ?? [],
    totalIdeasRead: body.totalIdeasRead ?? 0,
    ideasReadToday: body.ideasReadToday ?? 0,
    dailyGoal: body.dailyGoal ?? 5,
    completedBookIds: body.completedBookIds ?? [],
    savedBookIds: body.savedBookIds ?? [],
    inProgressBookId: body.inProgressBookId ?? null,
    inProgressIdeaIndex: body.inProgressIdeaIndex ?? 0,
    goals: body.goals ?? [],
    hasOnboarded: body.hasOnboarded ?? false,
    customBooks,
    habits,
  };

  const [row] = await db
    .insert(userProgressTable)
    .values(values)
    .onConflictDoUpdate({
      target: userProgressTable.clerkUserId,
      set: {
        xp: values.xp,
        level: values.level,
        streak: values.streak,
        lastReadDate: values.lastReadDate,
        streakDays: values.streakDays,
        totalIdeasRead: values.totalIdeasRead,
        ideasReadToday: values.ideasReadToday,
        dailyGoal: values.dailyGoal,
        completedBookIds: values.completedBookIds,
        savedBookIds: values.savedBookIds,
        inProgressBookId: values.inProgressBookId,
        inProgressIdeaIndex: values.inProgressIdeaIndex,
        goals: values.goals,
        hasOnboarded: values.hasOnboarded,
        customBooks,
        habits,
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
