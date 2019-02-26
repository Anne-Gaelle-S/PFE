import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {}
interface State {}

const data = [
  { title: "A", data: ["Albator"] },
  { title: "F", data: ["Fullmetal Alchemist", "Full moon"] },
  { title: "N", data: ["Naruto", "Nanatsu no taizai"] },
  { title: "O", data: ["One piece"] },
  {
    title: "S",
    data: [
      "Sword Art Online",
      "Shingeki no Kyojin",
      "Shaman King",
      "Steins gate"
    ]
  }
];

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { inputValue: "", matchingAnime: data };
    this.searchMatchingAnime = this.searchMatchingAnime.bind(this);
  }

  searchMatchingAnime(inputValue: string) {
    if (inputValue != "") {
      let newData = data.find(
        (section: object) => inputValue[0].toUpperCase() == section.title
      );
      if (newData) {
        newData.data = newData.data.filter((animeTitle: string) => {
          const myRegex = new RegExp("^" + inputValue, "i");
          return myRegex.test(animeTitle);
        });
        this.setState({ matchingAnime: [newData] });
      } else {
        this.setState({
          matchingAnime: [
            { title: "", data: ["No anime matches your search, sorry ..."] }
          ]
        });
      }
    } else {
      this.setState({ matchingAnime: data });
    }
  }
  
  addToPlanToWatch(){alert("Adding to plan to watch ! ");}

  addToWatched(){alert("Adding to watched ! ");}

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap a anime name !"
          onChangeText={inputValue => this.searchMatchingAnime(inputValue)}
        />

        <SectionList
          sections={this.state.matchingAnime}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.itemIcons}>
                <Icon.Button
                  name="plus-square"
                  backgroundColor="#900"
                  onPress={this.addToPlanToWatch}
                  borderRadius={0} 
                  backgroundColor="#242424"
                  color="#900"
                />
                <Icon.Button
                  name="eye"
                  backgroundColor="#900"
                  onPress={this.addToWatched}
                  borderRadius={0} 
                  backgroundColor="#242424"
                  color="#900"
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
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
