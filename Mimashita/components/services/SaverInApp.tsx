import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

// In the application stockage
export const storeData = async (animeToSave: object) => {
  console.log("Saving data in storage ... ");
  let id = animeToSave.id.toString();
  try {
    await AsyncStorage.setItem(id, JSON.stringify(animeToSave), () => {
      AsyncStorage.mergeItem(id, JSON.stringify(animeToSave), () => {
        AsyncStorage.getItem(id, (err, result) => {
          Alert.alert("Success", "Your list has been updated !");
          console.log(result);
        }); 
      });
    });
  } catch (error) {
    alert("Error when storing data in the app, sorry.");
    console.err(error);
  }
};

export const retrieveData = async idAnimeToGet => {
  try {
    const value = await AsyncStorage.getItem(idAnimeToGet);
    if (value !== null) {
      return (value); 
    }
  } catch (error) {
    console.err(error);
  }
};

