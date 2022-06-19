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
import { Audio } from "expo-av";

export default function StatusScreen({ route, navigation }) {
  const { status, time, message } = route.params;
  const [sound, setSound] = React.useState();
  console.log("etado", route.params);
  // const status = params.status;
  // const time_delay = params.time;

  const [loading, setloading] = useState(false);
  const [Id, setID] = useState(
    Device.osBuildFingerprint.split(":user")[0].substr(-10)
  );

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate("validate"), time);
    return () => clearTimeout(timer);
  }, []);

  async function playSound() {
    console.log("Loading Sound");

    var source = "";
    if (status === "1") {
      source = require("../assets/valid.mp3");
    } else if (status === "2") {
      source = require("../assets/invalid.mp3");
    }

    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={
        status === "1"
          ? styles.container_active
          : status === "2"
          ? styles.container_bad
          : styles.container_nKnow
      }
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
      <Text style={styles.message_text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cb2a8b",
    alignItems: "center",
    flex: 1,
  },
  message_text: {
    fontSize: 35,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 35,
  },
  container_active: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00AF12",
  },
  container_bad: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
  },
  container_nKnow: {
    flex: 1,
    alignItems: "center",
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
