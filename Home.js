import { StatusBar } from "expo-status-bar";
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,} from "react-native";
import { Image } from "react-native";
import { React } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeUi({navigation}) {
  const ui =
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Image style={styles.logo} source={require("./images/1.png")} />
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <TouchableOpacity style={styles.button} onPress={goToLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view4}>
        <TouchableOpacity style={styles.button} onPress={goToRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view5}>
        <TouchableOpacity style={styles.button} onPress={goToHome}>
            <Text style={styles.buttonText}>Note</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );

  function goToLogin() {
    navigation.navigate("Login");
  }
  function goToRegister() {
    navigation.navigate("Register");
  }
  function goToHome() {
    navigation.navigate("LoginHome");
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 450,
    height: 320,
  },
  text1: {
    fontSize: 35,
    color: "white",
    marginTop: 200,
  },
  view1: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  view2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  view3: {
    flex: 1,
    height: 400,
    alignItems: "center",
    justifyContent: "start",
  },
  view4: {
    flex: 1,
    height: 400,
    alignItems: "center",
    justifyContent: "start",
  },
  view5: {
    flex: 1,
    height: 400,
    alignItems: "center",
    justifyContent: "start",
  },
  button: {
    backgroundColor: "#0096FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:150,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
