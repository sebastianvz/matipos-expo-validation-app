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
  Alert,
  Button,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import * as Device from "expo-device";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modaldelete from "./tools/Modaldelete";
import NetInfo from "@react-native-community/netinfo";

export default function ValidateScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [img_base64, setimg_base64] = useState("");
  const [show, setshow] = useState("");
  const [value_entry, setvalue_entry] = useState("");
  const timeout = useRef(null);
  const textInputRef = useRef({});
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cam_reader, setreader] = useState(false);
  const [keybor_touch, setkeybor_touch] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [netInfo, setNetInfo] = useState(true);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state.isInternetReachable);
      // setNetInfo(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
      console.log("holi", jsonValue);
    }
    console.log("json", jsonValue);
    await AsyncStorage.setItem("Manillas_record", JSON.stringify(jsonValue));
  };

  const validate_repeat_record = async (value, response) => {
    const tiempo_rojo = await AsyncStorage.getItem("Manilla_tiempo_rojo");
    const tiempo_rojo_value = JSON.parse(tiempo_rojo);
    var jsonValue = await AsyncStorage.getItem("Manillas_record");
    jsonValue = JSON.parse(jsonValue);
    if (jsonValue != null && value !== "") {
      var time_item = jsonValue.filter((item) => item.codigo === value);
      if (time_item?.length >= 0) {
        var hour_date = new Date().getHours();
        var min = new Date().getMinutes();
        var hour_init = time_item[0].hora.split(":")[0];
        var min_init = time_item[0].hora.split(":")[1];
        var horas = hour_date - parseInt(hour_init);
        var minutos = min - parseInt(min_init);
        var horas_mesaje = "";
        var minutos_mesaje = String(minutos) + " minutos";
        if (horas > 0) {
          horas_mesaje = String(horas) + " horas y ";
        }
        var mensaje_tiempo =
          "Ya escaneado, hace\n" + horas_mesaje + minutos_mesaje;
        navigation.navigate("status", {
          status: "2",
          time: tiempo_rojo_value,
          message: mensaje_tiempo,
        });
        setScanned(false);
        return false;
      }
    } else {
      console.log("este noe sta pasando");
      navigation.navigate("status", {
        status: "2",
        time: tiempo_rojo_value,
        message: response,
      });
    }
  };

  const validate = async (value) => {
    const url = await AsyncStorage.getItem("Manilla_url");
    const token = await AsyncStorage.getItem("Manilla_Save_token");
    const tiempo_verde = await AsyncStorage.getItem("Manilla_tiempo_verde");
    const token_string = JSON.parse(token);
    const url_string = JSON.parse(url);
    const tiempo_verde_value = JSON.parse(tiempo_verde);
    const tiempo_rojo = await AsyncStorage.getItem("Manilla_tiempo_rojo");
    const tiempo_rojo_value = JSON.parse(tiempo_rojo);
    //verificacion con lista

    if (!netInfo) {
      console.log("EY");
      setloading(false);
      setScanned(false);
      navigation.navigate("status", {
        status: "2",
        time: tiempo_rojo_value,
        message: "No tienes conexión a internet",
      });
      return false;
    }

    if (value !== "") {
      setloading(true);
      fetch(`${url_string}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoEntrada: value,
          direccionMAC: token_string,
          direccion: "",
        }),
      }).then((response) => {
        if (response.status === 200) {
          setloading(false);
          return response.json().then((json_response) => {
            console.log("sda", json_response);
            if (json_response.Estado) {
              navigation.navigate("status", {
                status: "1",
                time: tiempo_verde_value,
                message: json_response.Respuesta,
              });
              save_record(value, true);
              setScanned(false);
              setkeybor_touch(false);
              Keyboard.dismiss();
              return false;
            } else {
              validate_repeat_record(value, json_response.Respuesta);
            }
            setScanned(false);
            setkeybor_touch(false);
            Keyboard.dismiss();
            return false;
          });
        } else {
          setloading(false);
          setScanned(false);
          navigation.navigate("status", {
            status: "2",
            time: tiempo_rojo_value,
            message: "Servidor no responde",
          });
          return false;
        }
      });
    }
  };

  const save_logo = async (value) => {
    await AsyncStorage.setItem("Manilla_logo_64", JSON.stringify(value));
  };

  const get_image = async () => {
    var url_imagen = await AsyncStorage.getItem("Manilla_imagen");
    var logo_init = await AsyncStorage.getItem("Manilla_logo_64");
    url_imagen = JSON.parse(url_imagen);
    if (logo_init) {
      setimg_base64(JSON.parse(logo_init));
      return false;
    }
    fetch(`${url_imagen}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json_response) => {
          setimg_base64(json_response[2].ValorString);
          save_logo(json_response[2].ValorString);
          return false;
        });
      } else {
        return response.json().then((json_response) => {
          console.log("esta es la respuesta", json_response);
          return false;
        });
      }
    });
  };

  const onChangeHandler = (value) => {
    clearTimeout(timeout.current);
    setvalue_entry(value);
    timeout.current = setTimeout(() => {
      validate(value);
    }, 900);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onChangeHandler(data);
  };

  const delete_table = async () => {
    await AsyncStorage.clear();
    navigation.navigate("config");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setvalue_entry("");
      get_image();
      setScanned(false);
      setreader(false);
      askForCameraPermission();

      if (textInputRef.current?.focus) {
        textInputRef.current.focus();
      }
    }, [])
  );
  return (
    <View style={styles.container}>
      <Modaldelete
        show={show}
        setshow={setshow}
        delete_confirm={delete_table}
      ></Modaldelete>
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
          <Pressable style={styles.icon_delete} onPress={() => setshow(true)}>
            <Entypo name="log-out" size={30} color="white" />
          </Pressable>
          <Pressable
            style={styles.icon_settig}
            onPress={() => navigation.navigate("data")}
          >
            <Ionicons name="settings" size={30} color="white" />
          </Pressable>
          <Text style={styles.text_info}>Escanear Códigos</Text>

          <View style={styles.container_image}>
            {img_base64 ? (
              <Image
                style={styles.image}
                source={{ uri: `data:image/png;base64,${img_base64}` }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/image_default.jpg")}
              />
            )}
          </View>

          {cam_reader ? (
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
              />
            </View>
          ) : (
            <TextInput
              showSoftInputOnFocus={keybor_touch ? true : false}
              autoFocus={true}
              style={styles.input_form}
              onChangeText={
                isKeyboardVisible ? setvalue_entry : onChangeHandler
              }
              value={value_entry}
              placeholder={"Ingresar código"}
              ref={textInputRef}
              onPressIn={() => setkeybor_touch(!keybor_touch)}
              onSubmitEditing={() => validate(value_entry)}
            ></TextInput>
          )}
        </>
      )}
      <Pressable
        style={styles.button_form}
        onPress={() =>
          hasPermission === null
            ? askForCameraPermission()
            : setreader(!cam_reader)
        }
      >
        <Entypo name="camera" size={24} color="white" />
      </Pressable>
    </View>
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
    display: "flex",
    backgroundColor: "#cb2a8b",
    flex: 1,
    alignItems: "center",
  },
  container_image: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "black",
  },
  image: {
    width: 230,
    height: 180,
    borderRadius: 20,
    marginRight: 1,
    marginTop: 20,
  },
  text_info: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    marginTop: 75,
  },
  input_form: {
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 30,
  },
  button_form: {
    width: 50,
    height: 50,
    backgroundColor: "#D8779C",
    marginTop: 8,
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
    right: 15,
    top: 30,
  },
  icon_delete: {
    position: "absolute",
    left: 15,
    top: 30,
  },
});
