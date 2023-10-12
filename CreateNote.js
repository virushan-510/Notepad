import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CreateNoteUi({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); 

  const ui = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./images/1.png')} style={styles.logo} />
        <Text style={styles.header}>Create Note</Text>
      </View>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Enter Your Description Here"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        style={[styles.input, styles.descriptionInput]} 
      />
      <Text style={styles.label}>Category</Text>
      <RadioButton.Group
        onValueChange={(value) => setCategory(value)}
        value={category}
      >
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
          <Image source={require('./images/study.png')} style={styles.icon} />
            <RadioButton.Item
              label="Study"
              value="study"
              color="#fff"
              labelStyle={styles.userTypeLabel}
            />
            
          </View>
          <View style={styles.radioItem}>
          <Image source={require('./images/work.png')} style={styles.icon} />
            <RadioButton.Item
              label="Work"
              value="work"
              color="#fff"
              labelStyle={styles.userTypeLabel}
            />
           
          </View>
          <View style={styles.radioItem}>
          <Image source={require('./images/personal.png')} style={styles.icon} />
            <RadioButton.Item
              label="Personal"
              value="personal"
              color="#fff"
              labelStyle={styles.userTypeLabel}
            />
            
          </View>
        </View>
      </RadioButton.Group>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={createNote}
      >
        Save
      </Button>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.registerText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  async function createNote() {
    const mobile = await AsyncStorage.getItem("mobile");

    const note = {
      title: title,
      description: description,
      category: category,
      mobile: mobile,
    };

    try {
      const response = await fetch("http://127.0.0.1/my_notes/createNote.php", {
        method: "POST",
        body: JSON.stringify(note),
      });
      if (response.status === 200) {
        const data = await response.text();
        if (data == "success") {
          Alert.alert("Message", "Note Saved Successfully", [
            {
              text: "OK",
              onPress: () => {
                setTitle("");
                setDescription("");
                navigation.navigate('LoginHome');
              },
            },
          ]);
        } else {
          Alert.alert("Note Added Failed", data);
        }
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  headerContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 60,
    marginEnd: 5,
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginEnd: 10,
  },
  input: {
    marginBottom: 16,
  },
  descriptionInput: {
    height: 320,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 4,
    color: 'white',
  },
  userTypeLabel: {
    color: 'white',
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 10, 
    height: 15, 
  },
  button: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  registerContainer: {
    alignItems: 'center',
    margin: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
