import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginHomeUi({ navigation }) {
  async function handleLogout() {
    await AsyncStorage.removeItem("mobile");
    navigation.navigate('Home');
  }
  function goToHome() {
    navigation.navigate("Home");
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'white' }]}
        onPress={() => navigation.navigate('CreateNote')}
      >
        <Image source={require('./images/createnote.png')} style={styles.buttonIcon} />
        <Text style={[styles.buttonText, { color: 'black' }]}>Create New Note</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'white' }]}
        onPress={() => navigation.navigate('ViewAllNotes')}
      >
        <Image source={require('./images/view.png')} style={styles.buttonIcon} />
        <Text style={[styles.buttonText, { color: 'black' }]}>View Notes</Text>
      </TouchableOpacity>
      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutBnutton}
        onPress={handleLogout}
      >
         <TouchableOpacity style={styles.button} onPress={goToHome}></TouchableOpacity>
        <Text style={styles.logoutText} >Logout</Text>
        
      </TouchableOpacity>
    </SafeAreaView>
    

  );
  
  async function getMobile(){
    const mobile = await AsyncStorage.getItem('mobile');
    Alert.alert("mobile",mobile);
  }
  return ui;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    position: 'relative', 
  },
  button: {
    marginTop: 16,
    height: 60,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonIcon: {
    width: 24,
    height: 24, 
    marginRight: 10, 
  },
  logoutButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
  },
});
