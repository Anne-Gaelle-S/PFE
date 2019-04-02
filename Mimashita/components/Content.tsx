import React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import Home from "./pages/Home";
// import {AsyncStorage} from 'react-native';
// import { storeData } from "./services/SaveInApp";

interface Props { pageName: string; }
// interface Anime { title: string; }
interface State { 
  animeWatched: Array<object>,
  animePlanToWatch: Array<object> 
}

export default class Content extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      animeWatched: [],
      animePlanToWatch: []
    };
    this.updatePlanToWatch = this.updatePlanToWatch.bind(this);
    this.updateWatched = this.updateWatched.bind(this);
  }
 
  updateWatched(anime: object) {
    alert("Update watched ! " + anime);
    let newAnimeWatchedList = this.state.animeWatched;
    console.log(typeof(newAnimeWatchedList));
    console.log(newAnimeWatchedList);
    this.setState({
      animeWatched: newAnimeWatchedList
    });
    console.log("Anime watched: ");
    console.log(this.state.animeWatched);

    // save in the user db the anime
    // storeData(anime)
    //   .then(console.log("Data saved !")); 
  }

  updatePlanToWatch(anime: object) {
    alert("Update plan to watch ! " + anime);
    let newAnimePlanToWatchList = this.state.animePlanToWatch;
    console.log(typeof(newAnimePlanToWatchList)); 
    console.log(newAnimePlanToWatchList); 
    this.setState({
      animePlanToWatch: newAnimePlanToWatchList
    }); 
    console.log("Anime plan to watched: ");
    console.log(this.state.animePlanToWatch);
    // save in the user db the anime
    // storeData(anime);
  }

  render() {
    return (
      <View style={styles.Content}>

        {this.props.pageName == "Search" && (
          <Search
            addPlanToWatch={this.updatePlanToWatch}
            addToWatched={this.updateWatched}
            animeTrending={this.props.animeTrending}
          />
        )}

        {this.props.pageName == "My list" && 
          <MyList />}

        {this.props.pageName == "Home" && 
          <Home animeSuspectedWatched={this.props.animeSuspectedWatched} />}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    backgroundColor: "#242424",
    paddingBottom: 100 
  }
});
