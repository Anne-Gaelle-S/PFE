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

export default class MyList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View>
        <Text style={styles.itemText}>My list </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  itemText: {
    color: "white"
  }
});
