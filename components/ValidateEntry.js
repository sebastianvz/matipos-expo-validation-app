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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ValidateScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [value_entry, setvalue_entry] = useState("");
  const timeout = useRef(null);

  const [Id, setID] = useState(
    Device.osBuildFingerprint.split(":user")[0].substr(-10)
  );

  const save_record = async (code, status) => {
    var jsonValue = await AsyncStorage.getItem("Manillas_record");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    var hour_date = new Date().getHours();

    var min = new Date().getMinutes();

    var hora_val = String(hour_date) + ":" + String(min).padStart(2, "0");
    console.log("que", String(hour_date) + ":" + String(min).padStart(2, "0"));

    var data_agregate = {};

    data_agregate["codigo"] = code;
    data_agregate["fecha"] = today;
    data_agregate["hora"] = hora_val;
    data_agregate["estado"] = status;

    if (jsonValue == null) {
      jsonValue = [];
    } else {
      jsonValue = JSON.parse(jsonValue);
    }

    if (jsonValue[0] === undefined) {
      jsonValue[0] = data_agregate;
    } else {
      jsonValue.push(data_agregate);
    }

    console.log("json", jsonValue);

    await AsyncStorage.setItem("Manillas_record", JSON.stringify(jsonValue));

    // await AsyncStorage.removeItem("lectures");
  };

  const validate = async () => {
    const url = await AsyncStorage.getItem("Manilla_url");
    const token = await AsyncStorage.getItem("Manilla_Save_token");
    const tiempo_verde = await AsyncStorage.getItem("Manilla_tiempo_verde");
    const tiempo_rojo = await AsyncStorage.getItem("Manilla_tiempo_rojo");

    const token_string = JSON.parse(token);
    const url_string = url.toString();

    const tiempo_verde_value = JSON.parse(tiempo_verde);
    const tiempo_rojo_value = JSON.parse(tiempo_rojo);

    console.log("eyyaaaa", value_entry);
    if (value_entry !== "") {
      setloading(true);
      fetch(
        `${"https://pruebastorniquete.matipos.com/api/Verificacion/Verificar"}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoEntrada: value_entry,
            direccionMAC: token_string,
            direccion: "",
          }),
        }
      ).then((response) => {
        // console.log("por aca", JSON.parse(response));
        if (response.status === 200) {
          setloading(false);
          return response.json().then((json_response) => {
            console.log("Estadp", json_response.Estado);
            if (json_response.Estado) {
              navigation.navigate("status", {
                status: "1",
                time: tiempo_verde_value,
              });
              save_record(value_entry, true);
              return false;
            } else {
              navigation.navigate("status", {
                status: "2",
                time: tiempo_rojo_value,
              });
              save_record(value_entry, false);
            }
            return false;
          });
        } else {
          return response.json().then((json_response) => {
            setloading(false);
            console.log("esta es la respuesta", json_response);
            save_record(value_entry, false);
            return false;
          });
        }
      });
    }
  };

  // const onChangeHandler = (value) => {
  //   clearTimeout(timeout.current);
  //   setvalue_entry(value);
  //   timeout.current = setTimeout(() => {
  //     validate(value);
  //   }, 2000);
  // };

  // if (data.Estado) {

  // } else {
  //   navigation.navigate("status", { status: "2" });
  // }
  useFocusEffect(
    React.useCallback(() => {
      setvalue_entry("");
    }, [])
  );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
    >
      {/* <FontAwesome name="check-square" size={200} color="#00AF12" /> */}
      {loading ? (
        <View style={styles.container_loading}>
          <ActivityIndicator
            animating={true}
            size={300}
            style={{ opacity: 1 }}
            color="white"
          ></ActivityIndicator>
        </View>
      ) : (
        <>
          <Pressable
            style={styles.icon_settig}
            onPress={() => navigation.navigate("data")}
          >
            <Ionicons name="settings" size={30} color="white" />
          </Pressable>
          <Text style={styles.text_info}>Validar</Text>
          <View style={styles.container_image}>
            <Image
              style={styles.image}
              source={require("../assets/image_default.jpg")}
            />
          </View>
          <TextInput
            showSoftInputOnFocus={false}
            autoFocus={true}
            style={styles.input_form}
            onChangeText={setvalue_entry}
            value={value_entry}
            placeholder={""}
            onEndEditing={validate}
            // onChangeText={(value) => {
            //   onChangeHandler(value);
            // }}
          ></TextInput>
        </>
      )}

      {/* <Pressable
        style={styles.button_form}
        onPress={() => save_record("asdas5", true)}
      >
        <Text style={styles.title_button}>Validar</Text>
      </Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_loading: {
    display: "flex",
    with: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
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

  icon_settig: {
    position: "absolute",
    right: 20,
    top: 30,
  },
});
