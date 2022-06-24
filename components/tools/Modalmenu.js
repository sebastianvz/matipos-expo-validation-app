import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// TextInput.defaultProps.selectionColor = "black";

import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { NavigationContext } from "@react-navigation/native";

export default function Modalmenu({ show, setshow, delete_confirm }) {
  const navigation = React.useContext(NavigationContext);
  const onclose = () => {
    setshow(false);
  };
  return (
    <>
      {show ? (
        <Pressable style={styles.container} onPress={() => onclose()}>
          <View style={styles.modal_inner}>
            <View style={styles.container_title}>
              <Text style={styles.text_modal}>Configuración</Text>
            </View>
            <View style={styles.line_separator}></View>

            <View style={styles.column_buttons}>
              <Pressable
                style={styles.button_login}
                onPress={() => {
                  navigation.navigate("modify");
                  setshow(false);
                }}
              >
                <Text style={styles.text_inside}>PARAMETROS</Text>
                <FontAwesome name="exchange" size={24} color="white" />
              </Pressable>
              <Pressable
                style={styles.button_login}
                onPress={() => {
                  navigation.navigate("data");
                  setshow(false);
                }}
              >
                <Text style={styles.text_inside}>REGISTROS</Text>
                <AntDesign name="table" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
    elevation: 13,
  },
  button_login: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#D8779C",
    borderRadius: 20,
    width: 200,
    marginBottom: 30,
  },
  text_inside: {
    color: "white",
    fontSize: 18.6,
    fontWeight: "600",
    width: 125,
  },
  modal_inner: {
    height: "45%",
    width: "80%",
    backgroundColor: "#fff",
    zIndex: 100000,
    marginTop: 200,
    display: "flex",
    alignItems: "center",
    borderRadius: 20,
  },
  container_title: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  column_buttons: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  line_separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#CCCCCC",
    marginTop: 10,
    marginBottom: 5,
  },
  text_modal: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
