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
  FlatList
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

  getAllItems(){
    AsyncStorage.getAllKeys( (err, keys) => {
      err ? console.err(err) :
      (console.log(keys))
    }); 
  }

  deleteAll(){
    AsyncStorage.clear( (err) =>
      err && console.err(err)
    );
  }

  render() {
    return (
      <ScrollView>
        <Button 
          onPress={this.deleteAll}
          title='DELETE ALL'
        /> 
        <Text style={styles.itemText}>My list </Text>

        <Button 
          onPress={this.getAllItems}
          title='GET ALL KEYS'
        /> 

        { (this.state.animeWatching) && (
            <FlatList
              data={this.state.animeWatching}
              renderItem={({item}) => 
                <View>
                  { console.log("EPISODES TOTAL: "+item.episodesTotal) }
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
