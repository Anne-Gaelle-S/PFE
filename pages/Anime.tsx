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
    id: Int;
    title: String;
    episodesSeen: Int;
    episodesTotal: Int;
    status: String;
    description: String;
    showDescription: Boolean;
}
interface State {}

export default class Anime extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        id: this.props.id,
        title: this.props.title,
        episodesSeen: this.props.episodesSeen,
        episodesTotal: [...Array(this.props.episodesTotal).keys()].map(n => n + 1),
        status: this.props.status,
        description: this.props.description,
        showDescription: this.props.showDescription
    };
    this.pickerChange = this.pickerChange.bind(this);
    this.addAnimeToMyList = this.addAnimeToMyList.bind(this);
  } 

  pickerChange(index) {
    let newData = this.state.data; 
    newData.episodesSeen = (index+1).toString(); 
    this.setState({ 
      episodesSeen: (index+1).toString(),
      data : newData 
    });
  }

  addAnimeToMyList(){
    storeData({
        id: this.state.id,
        title: this.state.title,
        episodesSeen: this.state.episodesSeen,
        episodesTotal: this.state.episodesTotal,
        description: this.state.description,
        status: this.state.status
    });
  } 
 
  render() {
    return (
      <View style={styles.blockAnime}>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}>Anime title : {this.state.title}</Text>
        </View>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}> Episodes seen :</Text>
          <Picker
              style={styles.picker}
              selectedValue={this.state.episodesSeen}
              onValueChange={(item, index) => this.pickerChange(index)}
          >{
              this.state.episodesTotal && (
                  this.state.episodesTotal.map(epNumber => 
                      <Picker.Item 
                          key={this.state.title+epNumber}
                          label={epNumber.toString()}
                          value={epNumber.toString()} />
              ))
          }
          </Picker>
        </View>

        <View style={styles.rowBlock}>
          <Text style={styles.itemText}>Status of the anime: {this.state.status}</Text>
        </View> 

        { this.state.showDescription && (
            <View style={styles.rowBlock}>
                <Text style={styles.itemText}>Description: {this.state.description}</Text>
            </View>
        )}

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
