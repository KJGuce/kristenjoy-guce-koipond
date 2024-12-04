import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const LoginScreen: React.FC = () => {
  const router = useRouter(); // For navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Mock login logic - replace with actual API/auth logic
    if (email === "user@example.com" && password === "password123") {
      Alert.alert("Success", "Login successful!");
      router.replace("/home"); // Navigate to the home screen after login
    } else {
      Alert.alert("Error", "Invalid email or password.");
    }
  };

  const handleThirdPartyLogin = (provider: string) => {
    Alert.alert(
      "Coming Soon",
      `Login with ${provider} is not implemented yet.`
    );
    // Add actual logic for third-party login here
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/pond.png")} style={styles.pond} />
      <Text style={styles.welcomeMessage}>Welcome to the</Text>
      <Image
        source={require("@/assets/images/kplogo1.png")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Share resources, build connections</Text>

      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login with</Text>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={() => handleThirdPartyLogin("Google")}
        >
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => handleThirdPartyLogin("Facebook")}
        >
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, styles.appleButton]}
          onPress={() => handleThirdPartyLogin("Apple")}
        >
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => Alert.alert("Coming Soon", "Forgot Password?")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center", // Centers all items
    backgroundColor: "#f0f9f8", // Light, calming background
  },
  welcomeMessage: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#46B3A5",
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: -40,
    marginTop: -20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: "#46B3A5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: "#db4437",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  appleButton: {
    backgroundColor: "#333",
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#007bff",
    textAlign: "center",
    marginBottom: 20,
  },
  registerText: {
    color: "#333",
    textAlign: "center",
    fontSize: 14,
  },
  registerLink: {
    color: "#46B3A5",
    fontWeight: "bold",
  },
  pond: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
