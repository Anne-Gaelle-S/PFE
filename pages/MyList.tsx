import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
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
    };
  }
  
  componentDidMount(){
    console.log("__________________________________");
    console.log("GET ALL ITEMS :");
    AsyncStorage.getAllKeys( (err, keys) => {
      err ? console.err(err) :
      (
        AsyncStorage.multiGet(keys, (err, res) => {
          if(err){ console.err(err) }
          else {
            console.log(res);
            res.map((e) => JSON.parse(e[1]));
            console.log("RES BIS : ");  
            console.log(res);
            this.setState({ 
              animeWatching: res
            });
          }
        })
      ) 
    });
  } 

  getAllItems(){
    console.log("__________________________________");
    console.log("GET ALL ITEMS :");
    AsyncStorage.getAllKeys( (err, keys) => {
      err ? console.err(err) :
      (console.log(keys))
    }); 
  }

  deleteAll(){
    console.log("Deleting all items");
    AsyncStorage.clear( (err) =>
      err && console.err(err)
    );
  }

  render() {
    return (
      <View>
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
                  <Text style={styles.itemText}>{console.log(item)} {item.title} : Episode {item.episodesSeen} </Text> 
                  { <Anime 
                    id={item.id}
                    title={item.title}
                    episodesSeen={item.episodesSeen}
                    episodesTotal={item.episodes}
                    status={item.status}
                    description={item.description}
                    showDescription={false}
                  />  }
                </View> 
              }
              keyExtractor={(item, index) => index.toString()}
            />
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  itemText: {
    color: "white"
  }
});
