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

export default function ValidateScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [value_entry, setvalue_entry] = useState(false);

  const [Id, setID] = useState(
    Device.osBuildFingerprint.split(":user")[0].substr(-10)
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
    >
      {/* <FontAwesome name="check-square" size={200} color="#00AF12" /> */}
      <Text style={styles.text_info}>Validar</Text>
      <View style={styles.container_image}>
        <Image
          style={styles.image}
          source={require("../assets/image_default.jpg")}
        />
      </View>

      <TextInput
        style={styles.input_form}
        onChangeText={setvalue_entry}
        value={value_entry}
        placeholder="XXXX"
      ></TextInput>
      <Pressable
        style={styles.button_form}
        onPress={() => navigation.navigate("status", { status: value_entry })}
      >
        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{ opacity: 1 }}
            color="white"
          ></ActivityIndicator>
        ) : (
          <Text style={styles.title_button}>Validar</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb2a8b",
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
});
