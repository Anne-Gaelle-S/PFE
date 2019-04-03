import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button, 
  FlatList,
  Alert
} from "react-native";
import Anime from "./Anime";

interface Props {}
interface State {}

export default class Home extends React.Component<Props, State> {

  deleteAll(){
    Alert.alert(
      'Confirm deleting',
      'All items will be deleted and webExtension reset. Are you sure to continue ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View>

        <View style={styles.rowBlockSpace}>
          <Text style={styles.itemText}> RECENTLY WATCHED : </Text>
          <Button
            width="100"
            color="#A51616"
            onPress={this.deleteAll}
            title="Delete all"
          />
        </View>

        <FlatList
          data={this.props.animeSuspectedWatched}
          renderItem={({item}) => 
            <View>
              <Text style={styles.itemText}>{item.title.romaji} : Episode {item.episodesSeen} </Text> 
              { <Anime 
                id={item.id}
                title={item.title.romaji}
                episodesSeen={item.episodesSeen}
                episodesTotal={item.episodes}
                status={item.status}
                description={item.description}
                showDescription={false}
              />  }
            </View> 
          }
          keyExtractor={(item) => item.id.toString()}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemText: { color: "white", padding: 7 },
  rowBlockSpace: {
    padding: 10, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black"
  }
});
