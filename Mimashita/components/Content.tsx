import React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import Home from "./pages/Home";

interface Props { pageName: string; }
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
    backgroundColor: "#D8D8D8", 
    paddingBottom: 80 
  }
});
