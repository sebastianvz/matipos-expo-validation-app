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
} from "react-native";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function ConfigScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [Id, setID] = useState(
    Device.osBuildFingerprint.split(":user")[0].substr(-10)
  );

  const save_token = async (token) => {
    await AsyncStorage.setItem("Manilla_Save_token", JSON.stringify(Id));
    get_token();
  };

  const get_token = async () => {
    const result = await AsyncStorage.getItem("Manilla_Save_token");
    if (result) {
      navigation.navigate("validate");
    } else {
      return false;
    }
  };

  useEffect(() => {
    get_token();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_token();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
    >
      <Text style={styles.text_info}>Configuración</Text>

      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder="Base URL"
      ></TextInput>
      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder="Parametros URL"
      ></TextInput>
      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder="XXXX"
      ></TextInput>
      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder="XXXX"
      ></TextInput>
      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder="XXXX"
      ></TextInput>
      <TextInput
        style={styles.input_form}
        // onChangeText={setname_device}
        // value={name_device}
        placeholder={Id}
      ></TextInput>

      <Pressable style={styles.button_form} onPress={() => save_token()}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{ opacity: 1 }}
            color="white"
          ></ActivityIndicator>
        ) : (
          <Text style={styles.title_button}>GUARDAR</Text>
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
    marginTop: 40,
  },
  button_form: {
    width: "80%",
    height: 50,
    backgroundColor: "#D8779C",
    marginTop: 40,
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
