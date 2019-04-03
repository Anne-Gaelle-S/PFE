import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button, 
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import Anime from "./Anime";

interface Props {}
interface State {}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animeSuspectedWatched: this.props.animeSuspectedWatched
    };
  }

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
        {text: 'OK', onPress: () =>{
            let myUserName = 'userTest';
            fetch('http://mimashita.im-in.love/reset/'+myUserName, {
              method: 'POST',
              headers: {
                Accept: 'application/json'
              }})
              .then(() => this.setState({animeSuspectedWatched: []}))
              .catch((error) => { console.error(error);});
              }
        },
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

        <View style={styles.paddingBot}>
          <FlatList
            data={this.state.animeSuspectedWatched}
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
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemText: { padding: 5, paddingLeft: 15 },
  paddingBot: { paddingBottom : 120 },
  rowBlockSpace: {
    padding: 10, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: '#252C68',
    borderBottomWidth: 3
  }
});
