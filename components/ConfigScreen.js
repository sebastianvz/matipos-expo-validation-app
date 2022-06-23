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

export default function ConfigScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [Id, setID] = useState(Application.androidId);

  const [url_back, seturl_back] = useState(
    "https://pruebastorniquete.matipos.com/api/Verificacion/Verificar"
  );
  const [url_image, seturl_image] = useState(
    "https://haciendanapoles.matipos.com/API/ParametrosV01"
  );
  const [red_time, setred_time] = useState(5);
  const [green_time, setgreen_time] = useState(5);

  const save_token = async (token) => {
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

  const get_token = async () => {
    const result = await AsyncStorage.getItem("Manilla_Save_token");
    if (result) {
      // navigation.navigate("validate");
    } else {
      return false;
    }
  };

  useEffect(() => {
    get_token();
    console.log(Id);
    setID;
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
          editable={false}
          selectTextOnFocus={false}
          style={styles.input_form}
          value={Id}
          placeholder={Id}
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
        <Pressable style={styles.button_form} onPress={() => save_token()}>
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
