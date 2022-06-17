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

  const [url_back, seturl_back] = useState(
    "https://pruebastorniquete.matipos.com/api/Verificacion/Verificar"
  );
  const [url_image, seturl_image] = useState("");
  const [red_time, setred_time] = useState(5000);
  const [green_time, setgreen_time] = useState(5000);
  const [blue_time, setblue_time] = useState(5000);

  const save_token = async (token) => {
    await AsyncStorage.setItem("Manilla_Save_token", JSON.stringify(Id));
    await AsyncStorage.setItem("Manilla_url", JSON.stringify(url_back));
    await AsyncStorage.setItem("Manilla_imagen", JSON.stringify(url_image));
    await AsyncStorage.setItem(
      "Manilla_tiempo_verde",
      JSON.stringify(green_time)
    );
    await AsyncStorage.setItem("Manilla_tiempo_rojo", JSON.stringify(red_time));
    await AsyncStorage.setItem(
      "Manilla_tiempo_azul",
      JSON.stringify(blue_time)
    );

    navigation.navigate("validate");
  };

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
        <Text style={styles.title_text}>Tiempo en verde</Text>

        <TextInput
          keyboardType="numeric"
          style={styles.input_form}
          onChangeText={setgreen_time}
          value={green_time.toString()}
          placeholder="Tiempo en Verde"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Tiempo en rojo</Text>

        <TextInput
          style={styles.input_form}
          onChangeText={setred_time}
          value={red_time.toString()}
          placeholder="TIempo en Rojo"
        ></TextInput>
      </View>
      <View style={styles.form_container}>
        <Text style={styles.title_text}>Tiempo en azul</Text>
        <TextInput
          style={styles.input_form}
          onChangeText={setblue_time}
          value={blue_time.toString()}
          placeholder="Tiempo en azul"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cb2a8b",
  },
  form_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 19,
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
});
