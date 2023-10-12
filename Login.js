import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export function LoginUi({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ui = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("./images/1.png")} style={styles.logo} />
        <Text style={styles.header}>Sign In</Text>
      </View>
      <TextInput
        label="Mobile Number"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: "#0096FF" }]}
        labelStyle={styles.buttonText}
        onPress={login}
      >
        Login
      </Button>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function goToRegister() {
    navigation.navigate("Register");
  }
  function login() {
    const loginDetails = {

      mobile:mobile,
      password:password,
    };
    fetch("http://127.0.0.1//my_notes/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((user) => {
        console.log(user);
        if (user.responsetxt == "Success") {

          goToLoginHome();
          
        } else {
          Alert.alert("Message", user.responsetxt);
        }
      })
      .catch((error) => {
       console.log(error);
      });
  }

  function goToLoginHome() {
    navigation.navigate("LoginHome");
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
    justifyContent: "center",
  },
  headerContainer: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#fff",
    marginBottom: 25,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 60,
    marginEnd: 5,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#0096FF",
    textAlign: "center",
    marginEnd: 10,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 4,
    color: "white",
  },
  button: {
    backgroundColor: "#009688",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
  },
  registerContainer: {
    alignItems: "center",
    margin: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
