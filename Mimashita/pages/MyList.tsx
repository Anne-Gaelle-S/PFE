import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  ScrollView,
  Button,
  FlatList,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import Anime from "./Anime";

interface Props {}
interface State {}

export default class MyList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animeWatching: []
    };
    this.deleteAll = this.deleteAll.bind(this);
  }
  
  componentDidMount(){
    AsyncStorage.getAllKeys( (err, keys) => {
      err ? console.err(err) : (
        AsyncStorage.multiGet(keys, (err, res) => {
            if(err){ console.err(err) }
            else {
              let animeWatchingList = res.map(item => JSON.parse(item[1]))
              this.setState({  animeWatching: animeWatchingList });
            }
        })
      )
    })
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
            AsyncStorage.clear( (err) => {
            this.setState({animeWatching: []})
            err && console.err(err)
          })
        }},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <ScrollView>
        <Button 
          width="100"
          color="#A51616"
          onPress={this.deleteAll}
          title='DELETE ALL'
        /> 

        { (this.state.animeWatching) && (
            <FlatList
              data={this.state.animeWatching}
              renderItem={({item}) => 
                <View>
                  { <Anime
                    id={item.id}
                    title={item.title}
                    episodesSeen={item.episodesSeen}
                    episodesTotal={item.episodesTotal}
                    status={item.status}
                    description={item.description}
                    showDescription={false}
                  />  }
                </View> 
              }
              keyExtractor={(item, index) => index.toString()}
            />
        )}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  itemText: {
    color: "white"
  }
});
