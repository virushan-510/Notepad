import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginUi } from "./Login";
import { RegisterUi } from "./Register";
import { HomeUi } from "./Home";
import { LoginHomeUi } from "./LoginHome";
import { CreateNoteUi } from "./CreateNote";
import { AllNotesUi } from "./AllNotes";
import { ViewNoteUi } from "./ViewNote";
import { ViewAllNotesUi } from "./ViewAllNotes";
import LoadingScreen from "./LoadingScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const mobile = await AsyncStorage.getItem("mobile");
        if (mobile) {
          setInitialRoute("LoginHome");
        } else {
          setInitialRoute("Home");
        }
      } catch (error) {
        console.error("Error checking login status: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    // Show the loading screen while checking login status
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeUi} />
        <Stack.Screen name="Login" component={LoginUi} />
        <Stack.Screen name="Register" component={RegisterUi} />
        <Stack.Screen options={{ headerShown: false }} name="LoginHome" component={LoginHomeUi} />
        <Stack.Screen options={{ headerShown: false }} name="CreateNote" component={CreateNoteUi} />
        <Stack.Screen options={{ headerShown: false }} name="AllNotes" component={AllNotesUi} />
        <Stack.Screen options={{ headerShown: false }} name="ViewNote" component={ViewNoteUi} />
        <Stack.Screen options={{ headerShown: false }} name="ViewAllNotes" component={ViewAllNotesUi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
