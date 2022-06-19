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

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Modaldelete({ show, setshow, delete_confirm }) {
  const onclose = () => {
    setshow(false);
  };
  return (
    <>
      {show ? (
        <Pressable style={styles.container} onPress={() => onclose()}>
          <View style={styles.modal_inner}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="alert-octagon"
                size={40}
                color="red"
              />
            </View>
            <View style={styles.line_separator}></View>

            <Text style={styles.text_modal}>
              ¿Estás seguro que deseas eliminar todos los registros?
            </Text>

            <View style={styles.row_buttons}>
              <Pressable
                style={styles.button_login}
                onPress={() => {
                  onclose();
                }}
              >
                <Text style={styles.text_inside}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.button_login}
                onPress={() => {
                  onclose();
                  delete_confirm();
                }}
              >
                <Text style={styles.text_inside}>Eliminar</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8779C",
    borderRadius: 20,
    width: 139,
    marginBottom: 30,
  },
  text_inside: {
    color: "white",
    fontSize: 18.6,
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
  icon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  row_buttons: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  line_separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#CCCCCC",
    marginTop: 40,
    marginBottom: 12.5,
  },
  text_modal: {
    color: "#000000",
    fontSize: 18.6,

    textAlign: "center",
  },
});
