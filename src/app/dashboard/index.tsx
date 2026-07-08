import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { executeAction } from "../../services/actionExecutor";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const { response } = await executeAction("dashboard");

      if (response?.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>
          Welcome 👋
        </Text>

        <Text style={styles.subHeading}>
          {user?.name ?? "User"}
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>
            {user?.email ?? "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Degree</Text>
          <Text style={styles.value}>
            {user?.degree ?? "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Authentication Status
          </Text>

          <Text style={styles.success}>
            Verified
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  content: {
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subHeading: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  label: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 8,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  success: {
    color: "#16A34A",
    fontSize: 18,
    fontWeight: "700",
  },
});