import React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, DrawerLayoutAndroid } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export interface Props {
  name?: string;
  nb?: number;
}

interface State {}

export default class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      test: props.nb || 1
    };
  }

  render() {
    var drawer = (
      <View style={{ flex: 1, backgroundColor: "#8E0D0D" }}>
        <Text style={{ margin: 20, fontSize: 15, textAlign: "left" }}>
          Your buttons here
        </Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        renderNavigationView={() => drawer}
        drawerWidth={250}
      >
        <View>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </DrawerLayoutAndroid>
    );
    /*
    return (
      <View style={styles.Menu}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title="Mon super titre"
          titleColor="white"
          navIconName="md-menu"
          overflowIconName="md-more"
        />
      </View>
    ); */
  }
}

const styles = StyleSheet.create({
  Menu: {
    color: "white",
    backgroundColor: "#8E0D0D"
  },
  toolbar: {
    backgroundColor: "#8E0D0D",
    height: 56
  }
});
