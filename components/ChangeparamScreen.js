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
  Linking,
} from "react-native";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Application from "expo-application";

export default function ChangeparamScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [Id, setID] = useState("");

  const [url_back, seturl_back] = useState("");
  const [url_image, seturl_image] = useState("");
  const [red_time, setred_time] = useState(1);
  const [green_time, setgreen_time] = useState(1);

  const modify_parameter = async (token) => {
    await AsyncStorage.setItem("Manilla_Save_token", JSON.stringify(Id));
    await AsyncStorage.setItem("Manilla_url", JSON.stringify(url_back));
    await AsyncStorage.setItem("Manilla_imagen", JSON.stringify(url_image));
    await AsyncStorage.setItem(
      "Manilla_tiempo_verde",
      JSON.stringify(green_time)
    );
    await AsyncStorage.setItem("Manilla_tiempo_rojo", JSON.stringify(red_time));

    navigation.navigate("validate");
  };
  const version = Constants.manifest.version;

  const get_params = async () => {
    const url = await AsyncStorage.getItem("Manilla_url");
    const url_imagen = await AsyncStorage.getItem("Manilla_imagen");
    const green_time = await AsyncStorage.getItem("Manilla_tiempo_verde");
    const red_time = await AsyncStorage.getItem("Manilla_tiempo_rojo");
    const token = await AsyncStorage.getItem("Manilla_Save_token");
    seturl_back(JSON.parse(url));
    seturl_image(JSON.parse(url_imagen));
    setred_time(JSON.parse(red_time));
    setgreen_time(JSON.parse(green_time));
    setID(JSON.parse(token));
  };

  useEffect(() => {
    get_params();
    console.log(Id);
    setID;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_params();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
    >
      <Text style={styles.text_info}>Configuración</Text>

      <View style={styles.form_container}>
        <Text style={styles.title_text}>Base URL</Text>
        <TextInput
          style={styles.input_form}
          onChangeText={seturl_back}
          value={url_back}
          placeholder="Base URL"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Imagen URL</Text>

        <TextInput
          style={styles.input_form}
          onChangeText={seturl_image}
          value={url_image}
          placeholder="Imagen URL"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Tiempo en verde (segundos)</Text>

        <TextInput
          keyboardType="numeric"
          style={styles.input_form}
          onChangeText={setgreen_time}
          value={green_time.toString()}
          placeholder="Tiempo en Verde(segundos)"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Tiempo en rojo (segundos)</Text>

        <TextInput
          keyboardType="numeric"
          style={styles.input_form}
          onChangeText={setred_time}
          value={red_time.toString()}
          placeholder="Tiempo en Rojo(segundos)"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Id Equipo</Text>
        <TextInput
          onChangeText={setID}
          style={styles.input_form}
          value={Id}
          placeholder={"id del torniquete"}
        ></TextInput>
      </View>

      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="white"
        ></ActivityIndicator>
      ) : (
        <Pressable
          style={styles.button_form}
          onPress={() => modify_parameter()}
        >
          <Text style={styles.title_button}>GUARDAR</Text>
        </Pressable>
      )}

      <Text style={styles.title_version}>Versión: {version}</Text>
      <Pressable
        style={styles.container_log}
        onPress={() => {
          Linking.openURL("http://devsebastianvz.com/");
        }}
      >
        <Image
          style={styles.image_logo}
          source={require("../assets/Sebas_logo_small.png")}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb2a8b",
  },
  container_log: {
    width: "100%",
    height: 30,
    backgroundColor: "#17181a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },

  image_logo: {
    flex: 1,
    width: 70,
    height: 50,
    resizeMode: "contain",
  },
  form_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
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
  title_text: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    textAlign: "left",
    width: "90%",
  },
  title_version: {
    fontSize: 12,
    color: "white",
    fontWeight: "300",
    textAlign: "center",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
});
