import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { makeAPIRequest, flatData } from "./../services/RequesterAniList";

interface Props {
  anime: String;
  episodesSeen: Int;
}
interface State {}

export default class Anime extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      nbOfEpisodeSeen: "0",
      romaji: "",
      status: "",
      descritption: ""
    };
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    var startQuery = `
            query ($search: String) {
                Media (search: $search, type: ANIME) {
                    title {
                        romaji 
                        english
                        native
                    },
                    episodes,
                    status,
                    description
                }
            }
        `;
    var startVariables = {
      search: this.props.anime
    };
    makeAPIRequest(startQuery, startVariables, this.handleData);
  }

  handleData(data) {
    let flatData = data.data.Media;
    console.log(flatData);
    this.setState({
      data: flatData,
      romaji: flatData.title.romaji,
      episodes: [...Array(flatData.episodes).keys()].map(n => n + 1),
      status: flatData.status,
      descritption: data
    });
  }

  pickerChange(index) {
      this.setState({ nbOfEpisodeSeen: (index+1).toString() });
  }

  render() {
    return (
      <View style={styles.blockAnime}>
        <Text style={styles.itemText}>Anime title : {this.state.romaji}</Text>
        <Text style={styles.itemText}> Nb d'épisodes :</Text>
        
        <Picker
            style={styles.picker}
            selectedValue={this.state.nbOfEpisodeSeen}
            onValueChange={(item, index) => this.pickerChange(index)}
        >{
            this.state.episodes && (
                this.state.episodes.map(epNumber => 
                    <Picker.Item 
                        key={this.state.romaji+epNumber}
                        label={epNumber.toString()}
                        value={epNumber.toString()} />
            ))
        }
        </Picker>

        <Text style={styles.itemText}>Status : {this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockAnime: {
    backgroundColor: "purple",
    marginBottom: 5,
    marginTop: 5,
    padding: 10
  },
  picker: {
    height: 25,
    width: 120,
    backgroundColor: "white",
    color: "black"
  },
  itemText: {
    height: 25,
    color: "white"
  }
});
