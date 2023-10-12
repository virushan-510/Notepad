import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export function RegisterUi({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [userType, setUserType] = useState("");  
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ui = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("./images/1.png")} style={styles.logo} />
        <Text style={styles.header}>Sign Up</Text>
      </View>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        label="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>User Type</Text>
      {/* <RadioButton.Group
        onValueChange={setUserType}
        value={userType}
      >
        <View style={styles.radioContainer}>
          <RadioButton.Item
            label="Student"
            value="student"
            color="#0096FF"
            labelStyle={styles.userTypeLabel}
          />
          <RadioButton.Item
            label="Employee"
            value="employee"
            color="#0096FF"
            labelStyle={styles.userTypeLabel}
          />
          <RadioButton.Item
            label="Teacher"
            value="teacher"
            color="#0096FF"
            labelStyle={styles.userTypeLabel}
          />
        </View>
      </RadioButton.Group> */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Re-Type Password"
        value={password1}
        onChangeText={setPassword1}
        secureTextEntry
        style={styles.input}
      />
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: "#0096FF" }]}
        labelStyle={styles.buttonText}
        onPress={register}
      >
        Register
      </Button>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.registerText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function goToLogin() {
    navigation.navigate("Login");
  }
  async function register() {
    const registerDetails = {
      // mobile:mobile,
      // password:password,
      firstName:firstName,  
      lastName:lastName,
      mobile:mobile,
      userType:"1",
      password:password,
      password1:password1,
      
    };
    console.log(registerDetails)
    await fetch("http://127.0.0.1//my_notes/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerDetails),
    })
    .then((res) => res.text())
    .then((data) => {
       console.log(data);
      
      if (data ==="Success") {
        Alert.alert("Meassage", data);
      }else {
        Alert.alert(" Login Error", data);
        //navigation.replace("Registration");
        //navigation.navigate("login");
      }
    })
    .catch((err) => {
      Alert.alert("Something went wrong",err );
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
    borderColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    padding: 10,
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
  userTypeLabel: {
    color: "white",
    marginRight: 0,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 16,
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
