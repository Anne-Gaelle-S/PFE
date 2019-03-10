import React from "react";
import { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {};

export default class SplashScreen extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    // Storing it in a separate .graphql/.gql file is also possible
    var myQuery = `
      query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (id: $id, search: $search) {
            id
            title {
              romaji 
              english
              native
            }
          }
        }
      }
    `;

    // Define our query variables and values that will be used in the query request
    var myVariables = {
      search: "A",
      page: 1,
      perPage: 3
    };

    // Define the config we'll need for our Api request
    var url = "https://graphql.anilist.co";
    var options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: myQuery,
        variables: myVariables
      })
    };

    // Make the HTTP Api request
    fetch(url, options)
      .then(this.handleResponse)
      .then(this.handleData)
      .catch(this.handleError);
  }

  handleResponse(response) {
    return response.json().then(function(json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  handleData(data) {
    console.log("LES DONNEES !!!!!!!!!!!!!!!!!!!!!!! ");
    console.log(data);
    this.props.endSplashScreen(data);
  }

  handleError(error) {
    alert("Error, check console");
    console.error(error);
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
