import React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import Search from "./Search";
import MyList from "./MyList";

interface Props {
  pageName: string;
}

/*
const data = [
  { title: "A", data: [{"Albator"}] },
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
]; */

export default class Content extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.updatePlanToWatch = this.updatePlanToWatch.bind(this);
    this.updateWatched = this.updateWatched.bind(this);
  }

  updatePlanToWatch(anime: string){
    alert("Update plan to watch ! "+anime);
  }

  updateWatched(anime: string){
    alert("Update plan to watch ! "+anime);
  }

  render() {
    return (
      <View style={styles.Content}>
        {this.props.pageName == "Search" && 
          <Search addPlanToWatch={this.updatePlanToWatch} addToWatched={this.updateWatched} />}
        {this.props.pageName == "My list" && 
          <MyList />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    backgroundColor: "#242424"
  }
});
