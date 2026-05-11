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

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [needsVerify, setNeedsVerify] = useState(false);

  const isBusy = fetchStatus === "fetching";
  const errorMsg =
    errors?.fields?.password?.message ||
    errors?.fields?.identifier?.message ||
    errors?.fields?.code?.message ||
    null;

  const handleSignIn = async () => {
    if (!signIn) return;
    const { error } = await signIn.password({ emailAddress: email, password });
    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as Href);
        },
      });
    } else if (signIn.status === "needs_client_trust") {
      await signIn.mfa.sendEmailCode();
      setNeedsVerify(true);
    }
  };

  const handleVerify = async () => {
    if (!signIn) return;
    await signIn.mfa.verifyEmailCode({ code: verifyCode });
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as Href);
        },
      });
    }
  };

  if (needsVerify) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0D1A", "#080810"]} style={StyleSheet.absoluteFill} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
          <Text style={styles.logo}>⚡ lumio</Text>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a verification code to {email}</Text>
          <TextInput
            style={styles.input}
            placeholder="6-digit code"
            placeholderTextColor="#555577"
            value={verifyCode}
            onChangeText={setVerifyCode}
            keyboardType="numeric"
            autoFocus
          />
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
          <Pressable
            style={({ pressed }) => [styles.btn, (!verifyCode || isBusy) && styles.btnDisabled, pressed && styles.btnPressed]}
            onPress={handleVerify}
            disabled={!verifyCode || isBusy}
          >
            <LinearGradient colors={["#F5A623", "#E8902A"]} style={styles.btnGradient}>
              {isBusy ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Verify</Text>}
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => { setNeedsVerify(false); setVerifyCode(""); }} style={styles.linkRow}>
            <Text style={styles.mutedText}>← Start over</Text>
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
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
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
