import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Button,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { makeAPIRequest, flatData } from "./../services/RequesterAniList";
import { storeData, retrieveData } from "./../services/SaverInApp";

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
      nbOfEpisodeSeen: this.props.episodesSeen.toString(),
      romaji: "",
      status: "",
      descritption: ""
    };
    this.handleData = this.handleData.bind(this);
    this.pickerChange = this.pickerChange.bind(this);
    this.addAnimeToMyList = this.addAnimeToMyList.bind(this);
  } 

  componentDidMount() {
    var startQuery = `
            query ($search: String) {
                Media (search: $search, type: ANIME) {
                    id,
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
    flatData.episodesSeen = this.props.episodesSeen;
    this.setState({
      data: flatData,
      romaji: flatData.title.romaji,
      episodes: [...Array(flatData.episodes).keys()].map(n => n + 1),
      status: flatData.status,
      descritption: data
    });
  }

  pickerChange(index) {
    let newData = this.state.data; 
    newData.episodesSeen = (index+1).toString(); 
    this.setState({ 
      nbOfEpisodeSeen: (index+1).toString(),
      data : newData 
    });
  }

  addAnimeToMyList(){
    storeData(this.state.data); 
  } 
 
  render() {
    return (
      <View style={styles.blockAnime}>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}>Anime title : {this.state.romaji}</Text>
        </View>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}> Episodes seen :</Text>
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
        </View>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}>Status of the anime: {this.state.status}</Text>
        </View>

        <View style={styles.rowBlockCenter}>
          <View style={styles.updateList}>
            <Button
                color="black"
                onPress={this.addAnimeToMyList}
                title="Add to my list!"
            />
          </View> 
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockAnime: {
    backgroundColor: "#424242",
    marginBottom: 5,
    marginTop: 5,
    padding: 10
  },
  picker: {
    height: 30,
    width: 100,
    backgroundColor: "white",
    color: "black"
  },
  itemText: { 
    marginRight: 15,
    color: "white"
  },
  rowBlock: {
    margin: 5,
    flex: 1, 
    flexDirection: "row"
  },
  rowBlockCenter: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center" 
  },
  updateList: {
    width: 150,
    justifyContent: "center"
  }
});
