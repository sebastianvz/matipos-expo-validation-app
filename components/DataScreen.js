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
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function DastaScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [table, settable] = useState([]);

  const get_data = async () => {
    var jsonValue = await AsyncStorage.getItem("Manillas_record");
    if (jsonValue == null) {
      jsonValue = [];
    } else {
      jsonValue = JSON.parse(jsonValue);
    }
    settable(jsonValue);
  };

  const delete_table = async () => {
    await AsyncStorage.removeItem("Manillas_record");
  };

  useFocusEffect(
    React.useCallback(() => {
      get_data("");
    }, [])
  );
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <View style={styles.row_table_title}>
          <View style={styles.field_table_title}>
            <Text style={styles.field_text_title}>Codigo</Text>
          </View>
          <View style={styles.field_table_title}>
            <Text style={styles.field_text_title}>Fecha</Text>
          </View>
          <View style={styles.field_table_title}>
            <Text style={styles.field_text_title}>Hora</Text>
          </View>
          <View style={styles.field_table_title}>
            <Text style={styles.field_text_title}>Estado</Text>
          </View>
        </View>

        {table?.length > 0 &&
          table.map((item, index) => (
            <View style={styles.row_table}>
              <View style={styles.field_table}>
                <Text style={styles.field_table_text} numberOfLines={2}>
                  {item?.codigo}
                </Text>
              </View>
              <View style={styles.field_table}>
                <Text style={styles.field_table_text}>{item?.fecha}</Text>
              </View>
              <View style={[styles.field_table, { flex: 0.7 }]}>
                <Text style={styles.field_table_text}>{item?.hora}</Text>
              </View>

              <View style={[styles.field_table, { flex: 0.2 }]}>
                {item?.estado ? (
                  <FontAwesome name="check" size={20} color="green" />
                ) : (
                  <Feather name="x" size={20} color="red" />
                )}
              </View>
            </View>
          ))}

        {/* <Pressable onPress={delete_table}>
          <Text> Borrar </Text>
        </Pressable> */}
      </ScrollView>
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
    flex: 1,
    backgroundColor: "#fff",
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
  table_data: {
    width: "95%",
    height: 100,
    backgroundColor: "white",
  },

  row_table_title: {
    width: "100%",
    height: 40,
    backgroundColor: "black",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  row_table: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  field_text_title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  field_table_title: {
    flex: 1,
    alignItems: "center",
  },

  field_table: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    height: 50,
  },

  field_table_text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
