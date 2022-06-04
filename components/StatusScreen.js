import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Device from "expo-device";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function StatusScreen({ route, navigation }) {
  const { status } = route.params;

  const [loading, setloading] = useState(false);
  const [Id, setID] = useState(
    Device.osBuildFingerprint.split(":user")[0].substr(-10)
  );

  return (
    <ScrollView
      style={
        status === "1"
          ? styles.container_active
          : status === "2"
          ? styles.container_bad
          : styles.container_nKnow
      }
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
    >
      <View style={styles.container_icon}>
        {status === "1" ? (
          <FontAwesome name="check-square" size={300} color="white" />
        ) : null}
        {status === "2" ? (
          <AntDesign name="closecircle" size={300} color="white" />
        ) : null}
        {status === "3" ? (
          <FontAwesome name="exclamation-triangle" size={300} color="white" />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb2a8b",
  },
  container_active: {
    flex: 1,
    backgroundColor: "#00AF12",
  },
  container_bad: {
    flex: 1,
    backgroundColor: "red",
  },
  container_nKnow: {
    flex: 1,
    backgroundColor: "#C0CA00",
  },
  container_image: {
    width: "90%",
  },
  image: {
    width: "auto",
    height: 250,
    borderRadius: 20,
    marginRight: 1,
    marginTop: 50,
  },
  text_info: {
    fontSize: 35,
    color: "white",
    marginTop: 60,
  },
  input_form: {
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 80,
  },
  button_form: {
    width: "80%",
    height: 50,
    backgroundColor: "#D8779C",
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  title_button: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  container_icon: {
    marginTop: 100,
  },
});
