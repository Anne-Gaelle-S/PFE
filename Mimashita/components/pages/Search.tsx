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
      activeSections: [],
      showMore: false,
      sortType: "TRENDING_DESC"
    };
    this.searchMatchingAnime = this.searchMatchingAnime.bind(this);
    this.moreInfos = this.moreInfos.bind(this);
    this.showAnimeDetails = this.showAnimeDetails.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.handleData = this.handleData.bind(this);
  }


  searchMatchingAnime(inputValue: string) {
    if (inputValue != "") {
      let query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            media (id: $id, search: $search, type: ANIME) {
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
      let variables = {
          search: inputValue.toString(),
          page: 1,
          perPage: 30
      };
      makeAPIRequest(query, variables, this.handleData);
    } else {
      this.setState({ dataList: this.props.animeTrendingList });
    }
  }

  handleData(data){
    let newDataList = flatData(data);
    this.setState({ dataList: newDataList });
  }

  addToWatched(anime: object) {
    this.props.addToWatched(anime);
  }

  moreInfos(anime: object) {
    console.log("MORE INFO:");
    console.log(anime);
    this.setState({
      animeToLook: anime,
      showMore: true
    })
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

  pickerChange(index) {
    // this.setState({ 
    //   episodesSeen: (index+1).toString()
    // });
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap a anime name !"
          onChangeText={inputValue => this.searchMatchingAnime(inputValue)}
        />

        <View style={styles.rowBlock}>
          <Text>Sort by : </Text>
          <Picker
            selectedValue={this.state.sortType}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sortType: itemValue})
            }>
            <Picker.Item label="trending desc" value="TRENDING_DESC" />
            <Picker.Item label="trending" value="TRENDING" />
            <Picker.Item label="score desc" value="SCORE_DESC" />
            <Picker.Item label="score" value="SCORE" />
            <Picker.Item label="title" value="TITLE_ROMAJI" />
          </Picker>
        </View>

 
        <AccordeonList data={this.state.dataList} style={styles.accordeon} />

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
  },
  accordeon: {
    backgroundColor: "pink",
    padding: 2,
    height: 50 
  }
});
