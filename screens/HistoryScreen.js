import React from "react";
import { View, Text } from "react-native";
import Kaomoji from "../components/Kaomoji";

function HistoryScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1b1b",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 30,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        <Kaomoji />
      </Text>
      <Text
        style={{
          color: "#6d6d6d",
          fontSize: 10,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        History
      </Text>
    </View>
  );
}

export default HistoryScreen;
