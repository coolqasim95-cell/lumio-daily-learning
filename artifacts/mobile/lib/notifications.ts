import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleDailyReminder(): Promise<void> {
  if (Platform.OS === "web") return;

  try {
    // Cancel previous scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const granted = await requestNotificationPermissions();
    if (!granted) return;

    const messages = [
      { title: "⚡ Your daily ideas are waiting", body: "5 minutes of reading compounds into a year of growth." },
      { title: "📚 Time to level up", body: "Open Lumio and earn your daily XP." },
      { title: "🔥 Keep your streak alive!", body: "Don't break the chain — read one lesson today." },
      { title: "🧠 Feed your mind", body: "The world's best ideas are one tap away." },
      { title: "⚡ Your future self thanks you", body: "Daily reading compounds — open Lumio now." },
      { title: "📖 New wisdom awaits", body: "Complete a topic and earn XP in Lumio." },
      { title: "🚀 Small steps, massive results", body: "One topic a day changes everything over a year." },
    ];

    // Schedule for 8am daily
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⚡ Your daily ideas are waiting",
        body: "5 minutes of reading compounds into a year of growth.",
        sound: true,
        data: { screen: "home" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 8,
        minute: 0,
      },
    });

    // Schedule for 7pm as a reminder
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Don't break your streak!",
        body: "You haven't read today yet — one topic takes 3 minutes.",
        sound: true,
        data: { screen: "home" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 19,
        minute: 0,
      },
    });
  } catch {
    // Silently fail — notifications are not critical
  }
}
