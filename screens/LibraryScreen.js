import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Kaomoji from "../components/Kaomoji";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

function LibraryScreen({ navigation }) {
  return (
    <ScreenContainer>
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
        Your library is empty, add series to your library from Browse
      </Text>
    </ScreenContainer>
  );
}

export default LibraryScreen;
