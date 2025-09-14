import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SupabaseService } from "@/services/SupabaseService";
import { getCurrentEnvironment, envLog } from "@/config/environment";

interface ConnectionStatus {
  database: boolean;
  auth: boolean;
  environment: string;
  loading: boolean;
  lastChecked?: Date;
}

export const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    database: false,
    auth: false,
    environment: getCurrentEnvironment(),
    loading: true,
  });

  const testConnection = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));

    try {
      const healthStatus = await SupabaseService.getHealthStatus();

      setStatus({
        database: healthStatus.database,
        auth: healthStatus.auth,
        environment: healthStatus.environment,
        loading: false,
        lastChecked: new Date(),
      });

      envLog("Connection test completed", healthStatus);

      if (healthStatus.database && healthStatus.auth) {
        Alert.alert("接続成功", "Supabase への接続が正常に確立されました。");
      } else {
        Alert.alert(
          "接続エラー",
          `データベース: ${healthStatus.database ? "✓" : "✗"}\n認証: ${
            healthStatus.auth ? "✓" : "✗"
          }`
        );
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setStatus((prev) => ({
        ...prev,
        loading: false,
        lastChecked: new Date(),
      }));

      Alert.alert("接続エラー", "接続テストに失敗しました。");
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusColor = (isConnected: boolean) => {
    return isConnected ? "#4CAF50" : "#F44336";
  };

  const getStatusText = (isConnected: boolean) => {
    return isConnected ? "接続済み" : "未接続";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase 接続状態</Text>

      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>環境:</Text>
          <Text style={[styles.statusValue, { color: "#2196F3" }]}>
            {status.environment.toUpperCase()}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>データベース:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: getStatusColor(status.database) },
            ]}
          >
            {getStatusText(status.database)}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>認証サービス:</Text>
          <Text
            style={[styles.statusValue, { color: getStatusColor(status.auth) }]}
          >
            {getStatusText(status.auth)}
          </Text>
        </View>

        {status.lastChecked && (
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>最終確認:</Text>
            <Text style={styles.statusValue}>
              {status.lastChecked.toLocaleTimeString()}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.testButton, status.loading && styles.testButtonDisabled]}
        onPress={testConnection}
        disabled={status.loading}
      >
        <Text style={styles.testButtonText}>
          {status.loading ? "接続テスト中..." : "接続テスト"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        ※ ローカル環境では Supabase が起動している必要があります
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  testButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  testButtonDisabled: {
    backgroundColor: "#ccc",
  },
  testButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});
