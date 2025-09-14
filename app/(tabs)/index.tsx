import { StyleSheet, ScrollView } from "react-native";

import { ConnectionTest } from "@/components/ConnectionTest";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>TOEIC Study App</Text>
        <Text style={styles.subtitle}>プロジェクト基盤設定完了</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <ConnectionTest />

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>✅ 完了したタスク</Text>
          <Text style={styles.infoItem}>
            • Docker Compose による Supabase 環境構築
          </Text>
          <Text style={styles.infoItem}>• Expo Router プロジェクト初期化</Text>
          <Text style={styles.infoItem}>• TypeScript 型定義作成</Text>
          <Text style={styles.infoItem}>• Supabase クライアント設定</Text>
          <Text style={styles.infoItem}>• 環境別設定ファイル作成</Text>
          <Text style={styles.infoItem}>• データベース接続テスト実装</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2e7d32",
  },
  infoItem: {
    fontSize: 14,
    marginBottom: 8,
    paddingLeft: 10,
  },
});
