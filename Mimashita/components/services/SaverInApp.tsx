import {AsyncStorage} from 'react-native';

// In the application stockage
export const storeData = async (animeToSave: object) => {
  console.log("Saving data ... ");
    try {
        await AsyncStorage.setItem(animeToSave.id, animeToSave.key);
    } catch (error) {
        alert(
            "Error when storing data in the app, sorry."
        );
        console.err(error);
    }
};

// From the application stockage
/*
export const _retrieveDataFromApp = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      console.log(value);
    } else {
        console.log("Not found this data in the app ... ")
    }
  } catch (error) {
    alert(
        "Error when retrieve data in the app, sorry"
    );
    console.err(error);
  }
};*/
