import { useSignIn } from "@clerk/expo";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HAS_CLERK = !!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function SignInInner() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const si = signIn as any;

  const handleSignIn = async () => {
    if (!si) return;
    setIsBusy(true);
    setError(null);
    try {
      const { error: createErr } = await si.create({ identifier: email, password });
      if (createErr) {
        setError(createErr.message ?? "Sign in failed.");
        return;
      }
      if (si.status === "complete") {
        await si.finalize?.();
        router.replace("/" as Href);
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      setError(clerkErr?.errors?.[0]?.message ?? "Sign in failed. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0D1A", "#080810"]} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.logo}>⚡ lumio</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to sync your progress</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#555577"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#555577"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Pressable
            style={({ pressed }) => [styles.btn, (!email || !password || isBusy) && styles.btnDisabled, pressed && styles.btnPressed]}
            onPress={handleSignIn}
            disabled={!email || !password || isBusy}
          >
            <LinearGradient colors={["#F5A623", "#E8902A"]} style={styles.btnGradient}>
              {isBusy ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Sign In</Text>}
            </LinearGradient>
          </Pressable>
          <View style={styles.linkRow}>
            <Text style={styles.mutedText}>No account? </Text>
            <Link href={"/(auth)/sign-up" as any} asChild>
              <Pressable><Text style={styles.linkText}>Sign up</Text></Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function NoClerkScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <LinearGradient colors={["#0D0D1A", "#080810"]} style={StyleSheet.absoluteFill} />
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
      <Text style={styles.logo}>⚡ lumio</Text>
      <Text style={styles.title}>Local mode</Text>
      <Text style={styles.subtitle}>Your progress is saved on this device. Account sync coming soon.</Text>
    </View>
  );
}

export default function SignInScreen() {
  if (!HAS_CLERK) return <NoClerkScreen />;
  return <SignInInner />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080810", paddingHorizontal: 28 },
  inner: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  backBtn: { paddingVertical: 16 },
  backText: { color: "#888", fontSize: 14 },
  logo: { fontSize: 22, fontWeight: "800", color: "#F5A623", letterSpacing: -0.5, marginTop: 12, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "800", color: "#FFFFFF", letterSpacing: -1, marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#888", marginBottom: 36, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: "600", color: "#AAA", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" },
  input: { backgroundColor: "#141425", borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16, fontSize: 16, color: "#FFFFFF", borderWidth: 1, borderColor: "#222240", marginBottom: 20 },
  btn: { borderRadius: 14, overflow: "hidden", marginTop: 8 },
  btnDisabled: { opacity: 0.5 },
  btnPressed: { opacity: 0.85 },
  btnGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  btnText: { color: "#000", fontSize: 16, fontWeight: "800", letterSpacing: 0.3 },
  linkRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 },
  linkText: { color: "#F5A623", fontSize: 15, fontWeight: "700" },
  mutedText: { color: "#666", fontSize: 15 },
  errorText: { color: "#FF6B6B", fontSize: 13, marginBottom: 16 },
});
