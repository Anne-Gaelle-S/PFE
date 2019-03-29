import React from "react";
import { Component } from "react";
import { View, Text } from "react-native";
import { makeAPIRequest } from './RequesterAniList';
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
    makeAPIRequest(startQuery, startVariables, this.handleData);
  }

  

  handleData(data) {
    this.props.endSplashScreen(data);
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
