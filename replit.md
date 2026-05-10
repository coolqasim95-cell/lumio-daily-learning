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

## Where things live

- `artifacts/mobile/data/content.ts` — all 10 books with ideas (source of truth)
- `artifacts/mobile/context/AppContext.tsx` — XP, streak, level, saved/completed books, custom books
- `artifacts/mobile/context/HabitContext.tsx` — habit tracking with streaks
- `artifacts/mobile/constants/colors.ts` — light + dark theme tokens
- `artifacts/mobile/hooks/useColors.ts` — reads system color scheme, returns active theme
- `artifacts/mobile/assets/images/` — AI-generated book cover PNGs

## Architecture decisions

- **Contract-first design**: All 10 books stored as static data in content.ts; no backend needed for the core reading experience.
- **Dark-first theme**: Both light and dark palettes defined in colors.ts; `useColors()` hook auto-switches based on system preference.
- **Per-book gradient**: Each Book has `gradientFrom`/`gradientTo` fields used across home, explore, reader, and add-book screens for consistent visual identity.
- **Swipe reader**: FlatList with horizontal paging + `pagingEnabled` for native swipe-between-ideas UX.
- **Habit tracking**: Fully local (AsyncStorage key `lumio_habits_v1`), supports custom icons/colors, 7-day calendar, streak calculation.

## Product

- **10 real books**: Can't Hurt Me, Atomic Habits, 12 Rules for Life, 48 Laws of Power, 8 Mental Models, Attached, Becoming the Iceman, Cashvertising, The Changing World Order, The Compound Effect.
- **Swipe reader**: Cards with ideas, gradient progress bar, animated "Next Idea" gradient pill button.
- **Quiz system**: 2 quiz questions per book after completion.
- **XP + Level system**: Earn XP per idea read and per book completed; levels every 100 XP.
- **Streak tracking**: Daily reading streaks shown with a 28-day calendar grid.
- **Habit tracker**: Custom habits with icon/color picker, daily check-off, 7-day mini calendar, streak per habit.
- **Add your own book**: Form to add custom books with title, author, description, category, and key ideas.
- **Badge system**: 8 unlockable badges based on XP, streaks, completed books, and habit use.

## User preferences

- Gen Z aesthetic: dark mode first, bold gradients, heavy typography, amber (#F5A623) + electric purple (#7C5CFC) accents.
- No backend dependency for the reading experience; all state in AsyncStorage.

## Gotchas

- `book.cover` is typed as `any` to accommodate both static `require()` assets and the placeholder `icon.png` used for custom books.
- Route strings must use `"/"` not `"/(tabs)/"` for typed expo-router compatibility.
- `useColors()` falls back to the light palette if no dark key exists in colors — always define both.
- `HabitProvider` must wrap the app INSIDE `AppProvider` in `_layout.tsx`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
