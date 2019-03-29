import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  FlatList,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { makeAPIRequest } from "./RequesterAniList";

interface Props {
  addPlanToWatch: any;
  addWatched: any;
}
interface State {}

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: this.props.animeTrendingList,
      inputValue: ""
    };
    this.searchMatchingAnime = this.searchMatchingAnime.bind(this);
    this.addToPlanToWatch = this.addToPlanToWatch.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  searchMatchingAnime(inputValue: string) {
    if (inputValue != "") {
      let query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            media (id: $id, search: $search, type: ANIME) {
              title {
                romaji
                english
                native
              }
            }
          }
        }
      `; 
      let variables = {
          search: inputValue.toString(),
          page: 1,
          perPage: 15
      };
      makeAPIRequest(query, variables, this.handleData);
    } else {
      this.setState({ dataList: this.props.animeTrendingList });
    }
  }

  handleData(data){
    console.log("DATA RECUPERE : ");
    console.log(data);
    this.setState({ dataList: data });
  }

  addToPlanToWatch(anime: string) {
    this.props.addPlanToWatch(anime);
  }

  addToWatched(anime: string) {
    this.props.addToWatched(anime);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap a anime name !"
          onChangeText={inputValue => this.searchMatchingAnime(inputValue)}
        />

        <FlatList
          data={this.state.dataList}
          renderItem={( { item } ) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.key}</Text>
              <View style={styles.itemIcons}>
                <Icon.Button
                  name="plus-square"
                  backgroundColor="#900"
                  onPress={() => this.addToPlanToWatch(item)}
                  borderRadius={0}
                  backgroundColor="#242424"
                  color="#900"
                />
                <Icon.Button
                  name="eye"
                  backgroundColor="#900"
                  onPress={() => this.addToWatched(item)}
                  borderRadius={0}
                  backgroundColor="#242424"
                  color="#900"
                />
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    backgroundColor: "white"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    fontSize: 15,
    height: 44
  },
  itemText: {
    flex: 2,
    color: "white"
  },
  itemIcons: {
    flex: 1,
    height: 40,
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
