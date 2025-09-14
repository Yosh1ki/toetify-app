import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン画面</Text>
      <Text style={styles.subtitle}>認証機能は後のタスクで実装予定</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
});
