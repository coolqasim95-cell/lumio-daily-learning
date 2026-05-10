# Lumio – Daily Learning

A Gen Z micro-learning mobile app (Expo/React Native) with 10 real books, habit tracking, and XP system.

## Run & Operate

- `pnpm --filter @workspace/mobile run dev` — run the Expo mobile app (preview in web browser)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, optional)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo ~54, expo-router ~6, React Native 0.81
- State: React Context + AsyncStorage (no backend required)
- UI: Expo Linear Gradient, Feather Icons, Blur View
- Notifications: expo-notifications (daily 8am + 7pm reminders)

## Where things live

- `artifacts/mobile/data/content.ts` — all 10 books with Lesson/Topic structure (source of truth)
- `artifacts/mobile/context/AppContext.tsx` — XP, streak, level, topic/lesson/book completion
- `artifacts/mobile/context/HabitContext.tsx` — habit tracking with streaks
- `artifacts/mobile/constants/colors.ts` — light + dark theme tokens
- `artifacts/mobile/hooks/useColors.ts` — reads system color scheme, returns active theme
- `artifacts/mobile/lib/notifications.ts` — daily push notification scheduling
- `artifacts/mobile/assets/images/` — AI-generated book cover PNGs

## Content Structure (Book → Lessons → Topics)

Each book has:
- 3 Lessons × 3 Topics = 9 topics per book (90 total across all 10 books)
- Each Topic has: `title`, `content` (3 paragraphs), `wisdom` (key takeaway), `quiz` (4-option MCQ)
- XP: +10 per topic completed (quiz must be answered), +90 per book completed

## Reading Flow

1. Home / Explore → tap a book → `app/reader/[bookId].tsx` (lesson list with progress)
2. Tap a lesson → topic list with per-topic status (done / up-next / locked)
3. Tap a topic → `app/topic/index.tsx` (topic reader + wisdom box + inline quiz → XP toast)
4. Auto-advances to next topic on correct answer; "Continue Anyway" if wrong
5. All 9 topics done = book complete

## Architecture decisions

- **Contract-first design**: All 10 books stored as static data in content.ts; no backend needed for the core reading experience.
- **Dark-first theme**: Both light and dark palettes defined in colors.ts; `useColors()` hook auto-switches based on system preference.
- **Per-book gradient**: Each Book has `gradientFrom`/`gradientTo` fields used across home, explore, reader, and topic screens.
- **Inline quiz**: Quiz is embedded within the topic reader screen (no separate quiz screen). After reading + wisdom, the user taps "Take Quiz → +10 XP".
- **Icon fix**: Feather icons loaded explicitly via `Font.useFonts({ ...Feather.font })` in `_layout.tsx` to ensure visibility on Expo web/native.
- **Push notifications**: Scheduled via `lib/notifications.ts` at 8am and 7pm daily; web no-op. Requested on font load in root layout.
- **Habit tracking**: Fully local (AsyncStorage key `lumio_habits_v1`), supports custom icons/colors, 7-day calendar, streak calculation.

## Product

- **10 real books**: Can't Hurt Me, Atomic Habits, 12 Rules for Life, 48 Laws of Power, 8 Mental Models, Attached, Becoming the Iceman, Cashvertising, The Changing World Order, The Compound Effect.
- **Lesson reader**: Cards showing lessons with topic progress bars + continue CTA.
- **Topic reader**: Content → Key Wisdom box → Take Quiz → XP toast animation.
- **Quiz system**: 1 quiz per topic, inline in the reader. Correct = +10 XP + auto-advance. Wrong = feedback + "Continue Anyway".
- **XP + Level system**: +10 XP per topic, +90 per book; levels every 100 XP.
- **Streak tracking**: Daily reading streaks shown with a 28-day calendar grid.
- **Habit tracker**: Custom habits with icon/color picker, daily check-off, 7-day mini calendar, streak per habit.
- **Add your own book**: Form to add custom books with title, author, description, category, and key ideas (wrapped into a single "Key Ideas" lesson).
- **Badge system**: 8 unlockable badges based on XP, streaks, completed books, and habit use.
- **Daily notifications**: 8am motivational + 7pm streak reminder (skipped gracefully on web).

## Storage

- Storage key: `lumio_app_state_v3` (bumped from v2 due to topic/lesson structure change)
- State tracks: `completedTopicIds[]`, `completedLessonIds[]`, `completedBookIds[]`, `inProgressBookId`, `inProgressLessonId`, `inProgressTopicId`

## User preferences

- Gen Z aesthetic: dark mode first, bold gradients, heavy typography, amber (#F5A623) + electric purple (#7C5CFC) accents.
- No backend dependency for the reading experience; all state in AsyncStorage.

## Gotchas

- `book.cover` is typed as `any` to accommodate both static `require()` assets and the placeholder `icon.png` used for custom books.
- Route strings must use `"/"` not `"/(tabs)/"` for typed expo-router compatibility.
- `useColors()` falls back to the light palette if no dark key exists in colors — always define both.
- `HabitProvider` must wrap the app INSIDE `AppProvider` in `_layout.tsx`.
- Topic route is `/topic?bookId=X&lessonId=Y&topicId=Z` (uses `as any` cast for typed router).
- `expo-notifications` version must match SDK 54 expectation (~0.32.x); the installed version may show a warning but works.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
