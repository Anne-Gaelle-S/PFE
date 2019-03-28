import React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import Search from "./Search";
import MyList from "./MyList";

interface Props {
  pageName: string;
}

interface Anime {
  title: string;
}

export default class Content extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.updatePlanToWatch = this.updatePlanToWatch.bind(this);
    this.updateWatched = this.updateWatched.bind(this);
  }

  updatePlanToWatch(anime: string) {
    alert("Update plan to watch ! " + anime);
  }
 
  updateWatched(anime: string) {
    alert("Update watched ! " + anime);
  }

  render() {
    return (
      <View style={styles.Content}>
        {this.props.pageName == "Search" && (
          <Search
            addPlanToWatch={this.updatePlanToWatch}
            addToWatched={this.updateWatched}
            animeTrendingList={this.props.animeTrendingList}
          />
        )}
        {this.props.pageName == "My list" && <MyList />}
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
