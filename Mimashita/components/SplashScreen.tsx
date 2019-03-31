import React from "react";
import { Component } from "react";
import { View, Text } from "react-native";
import { makeAPIRequest, flatData } from "./services/RequesterAniList";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {};

export default class SplashScreen extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    var startQuery = `
        query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
            media (sort: [TRENDING_DESC], type: ANIME) {
            title {
                romaji 
                english
                native
            }
          } 
        }
      }
    `;

    var startVariables = { 
      page: 1,
      perPage: 30
    };

    makeAPIRequest(startQuery, startVariables, this.handleData, true);
  }
  
  filterDuplicatesAnime(arrayOfAnime){
    return ( arrayOfAnime
      .map(JSON.stringify) // to compare json object
      .filter( (value, index, self) => 
        self.indexOf(value) == index) // filer duplicates anime
      .filter( (value, index, self) => {
        console.log("Value: "+value+"\tindex: "+index+"\tself: "+self);
        return true; }
      )
      .map(JSON.parse) // get it back Array
    );
  }

  handleData(data) {
    let animeTrendingData = flatData(data);
    let myUserName = 'userTest';
    fetch('http://mimashita.im-in.love/animes/'+myUserName)
      .then((response) => response.json())
      .then((json) => {
        let animeSuspectedWatched = this.filterDuplicatesAnime(json.animesToUpdate)
        console.log(animeSuspectedWatched);
        this.props.endSplashScreen(animeTrendingData, animeSuspectedWatched);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text>Splash Screen ... </Text>
        <Text>Please wait we are loading the data ... </Text>
      </View>
    );
  }
}
