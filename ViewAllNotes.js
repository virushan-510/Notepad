import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Image } from "react-native";


export function ViewAllNotesUi({ navigation, route }) {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState([]);
  const [id, setId] = useState([]);
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mobile = await AsyncStorage.getItem("mobile");

        const apiUrl = "http://127.0.0.1/my_notes/viewAllNotes.php";
        const requestBody = {
          mobile: mobile,
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.status === 200) {
          const data = await response.json();
          const notes = data.title;
          const description = data.description;
          const id = data.id;
          const categoryID = data.category;
          const date = data.date;
          setNotes(notes);
          setDescription(description);
          setId(id);
          setCategory(categoryID);
          setDate(date);
          setLoading(false);
        } else {
          Alert.alert("Error", "Failed to fetch data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  const ui = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>My Notes</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <NoteItem
              title={item}
              date={date[index]}
              description={description[index]}
              category={category[index]}
            />
          )}
        />
      )}
    </View>
  );

  function NoteItem({ title, date, description, category }) {
    let categoryImage;
    if (category == 1) {
      categoryImage = require('./images/study.png');
    } else if (category == 2) {
      categoryImage = require('./images/work.png');
    } else if (category == 3) {
      categoryImage = require('./images/personal.png');
    }
    const truncatedDescription = description.slice(0, 8);

    return (
      <TouchableOpacity style={styles.noteItem} onPress={() => viewNote(title)}>
        <View style={styles.iconContainer}>
          <Image source={categoryImage} style={styles.categoryIcon} />
        </View>
        <View style={styles.noteInfoContainer}>
          <Text style={styles.noteText}>{title}</Text>
          <Text style={styles.noteDescription}>{truncatedDescription}...</Text>
          <Text style={styles.noteDate}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  async function viewNote(title) {
    const index = notes.indexOf(title);
    const noteDescription = description[index];
    const noteId = id[index];
    const noteCategory = category[index];
    const noteDate = date[index];
    navigation.navigate('ViewNote', {
      title,
      noteDescription,
      noteId,
      noteCategory,
      noteDate,
    });
  }
  

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  header: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    marginRight: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  noteInfoContainer: {
    flex: 1,
  },
  noteText: {
    color: "white",
    fontSize: 18,
  },
  noteDate: {
    color: "white",
    fontSize: 14,
  },
  noteDescription: {
    color: "white",
    fontSize: 14,
    marginTop:10,
  },
});
