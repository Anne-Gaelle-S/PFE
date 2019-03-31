import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button, 
  FlatList
} from "react-native";
import Anime from "./Anime";

interface Props {}
interface State {}

export default class Home extends React.Component<Props, State> {
  render() { 
    return (
      <View>
        <Text style={styles.itemText}> Recently watched : </Text>
        <FlatList
          data={this.props.animeSuspectedWatched}
          renderItem={({item}) => 
            <View>
              <Text style={styles.itemText}>{item.nameAnime} : Episode {item.nEp} </Text> 
              <Anime anime={item.nameAnime} episodesSeen={item.nEp}/> 
            </View> 
          }
        />

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemText: { color: "white" }
});
