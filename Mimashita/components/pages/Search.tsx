import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { makeAPIRequest, flatData } from "./../services/RequesterAniList";
import Anime from "./Anime";
import AccordeonList from "./AccordeonList"

interface Props {
  addPlanToWatch: any;
  addWatched: any;
}
interface State {}

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: this.props.animeTrending, // Array[object]
      inputValue: "",
      sortType: "TRENDING_DESC",
      nbOfResults: 20
    };
    this.updateInput = this.updateInput.bind(this);
    this.searchMatchingAnime = this.searchMatchingAnime.bind(this);
    this.handleData = this.handleData.bind(this);
  } 

  updateInput(newInputValue: string){
    console.log("Input value received : "+newInputValue);
    this.setState({inputValue: newInputValue},
      () => this.searchMatchingAnime());  
  }

  searchMatchingAnime() { 
    let searched = this.state.inputValue;
    console.log("Searching .... "+searched);
    console.log("Sorted by .... "+this.state.sortType);
    if (searched != "") {
      let query = `
        query ($page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            media (sort: `+this.state.sortType+`, search: $search, type: ANIME) {
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
        }
      `; 
      let variables = {
          search: searched,
          page: 1,
          perPage: this.state.nbOfResults
      };
      makeAPIRequest(query, variables, this.handleData);
    } else {
      let sortQuery = `
          query ($page: Int, $perPage: Int) {
          Page (page: $page, perPage: $perPage) {
              media (sort: `+this.state.sortType+`, type: ANIME) {
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
        }
      `;
      let sortVariables = { page: 1, perPage: this.state.nbOfResults };
      makeAPIRequest(sortQuery, sortVariables, this.handleData);
    }
  }

  handleData(data){
    let newDataList = flatData(data);
    console.log("New data found from search :");
    console.log(newDataList);
    this.setState({ dataList: newDataList });
  }

  showAnimeDetails(anime: object){
    return (<Anime 
              id={anime.id}
              title={anime.title.romaji}
              episodesSeen={0}
              episodesTotal={anime.episodes}
              status={anime.status}
              description={anime.description}
              showDescription={true}
            />)
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap a anime name !"
          onChangeText={inputValue => this.updateInput(inputValue)}
        />

        <View style={styles.rowBlock}>
          <Text>Sort by : </Text>
          <Picker
            selectedValue={this.state.sortType}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sortType: itemValue},
                () => this.searchMatchingAnime()
              )
            }>
            <Picker.Item label="trending desc" value="TRENDING_DESC" />
            <Picker.Item label="trending" value="TRENDING" />
            <Picker.Item label="score desc" value="SCORE_DESC" />
            <Picker.Item label="score" value="SCORE" />
            <Picker.Item label="title" value="TITLE_ROMAJI" />
            <Picker.Item label="title desc" value="TITLE_ROMAJI_DESC" />
          </Picker>
        </View>

        <View style={styles.rowBlock}>
          <Text>Number of results : </Text>
          <Picker
            selectedValue={this.state.nbOfResults}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({nbOfResults: itemValue},
                () => this.searchMatchingAnime()
              )
            }>
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="30" value={30} />
            <Picker.Item label="40" value={40} />
            <Picker.Item label="50" value={50} />
          </Picker>
        </View>

 
        <AccordeonList data={this.state.dataList} />

     {/* {   <FlatList
          data={this.state.dataList}
          renderItem={( { item } ) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.key}</Text>
              <View style={styles.itemIcons}>
                <Icon.Button
                  name="plus-square"
                  backgroundColor="#900"
                  onPress={() => this.moreInfos(item)}
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
        />} */}

       

      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowBlock: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15
  },
  searchInput: {
    height: 40,
    paddingLeft: 15,
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
    height: 44,
    borderBottomColor: 'grey',
    borderBottomWidth: 3
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
