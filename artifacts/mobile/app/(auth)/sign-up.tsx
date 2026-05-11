import { useSignUp } from "@clerk/expo";
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

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");

  const isBusy = fetchStatus === "fetching";
  const emailError = errors?.fields?.emailAddress?.message ?? null;
  const passwordError = errors?.fields?.password?.message ?? null;
  const codeError = errors?.fields?.code?.message ?? null;

  const handleSignUp = async () => {
    if (!signUp) return;
    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) return;
    await signUp.verifications.sendEmailCode();
    setStep("verify");
  };

  const handleVerify = async () => {
    if (!signUp) return;
    await signUp.verifications.verifyEmailCode({ code });
    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as Href);
        },
      });
    }
  };

  if (step === "verify") {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <LinearGradient colors={["#0D0D1A", "#080810"]} style={StyleSheet.absoluteFill} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
          <Text style={styles.logo}>⚡ lumio</Text>
          <Text style={styles.title}>Verify email</Text>
          <Text style={styles.subtitle}>We sent a code to {email}. Check your inbox!</Text>
          <Text style={styles.label}>Verification code</Text>
          <TextInput
            style={styles.input}
            placeholder="6-digit code"
            placeholderTextColor="#555577"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            autoFocus
          />
          {codeError && <Text style={styles.errorText}>{codeError}</Text>}
          <Pressable
            style={({ pressed }) => [styles.btn, (!code || isBusy) && styles.btnDisabled, pressed && styles.btnPressed]}
            onPress={handleVerify}
            disabled={!code || isBusy}
          >
            <LinearGradient colors={["#F5A623", "#E8902A"]} style={styles.btnGradient}>
              {isBusy ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Create Account</Text>}
            </LinearGradient>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0D1A", "#080810"]} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.logo}>⚡ lumio</Text>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Save your progress across all devices</Text>
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
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Min 8 characters"
            placeholderTextColor="#555577"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          <Pressable
            style={({ pressed }) => [styles.btn, (!email || !password || isBusy) && styles.btnDisabled, pressed && styles.btnPressed]}
            onPress={handleSignUp}
            disabled={!email || !password || isBusy}
          >
            <LinearGradient colors={["#F5A623", "#E8902A"]} style={styles.btnGradient}>
              {isBusy ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Sign Up</Text>}
            </LinearGradient>
          </Pressable>
          <View style={styles.linkRow}>
            <Text style={styles.mutedText}>Have an account? </Text>
            <Link href={"/(auth)/sign-in" as any} asChild>
              <Pressable><Text style={styles.linkText}>Sign in</Text></Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
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
