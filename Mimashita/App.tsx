/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  StatusBar,
  DrawerLayoutAndroid,
  ToolbarAndroid
} from "react-native";
import MenuItems from "./components/MenuItems";
import Content from "./components/Content";
import Icon from "react-native-vector-icons/FontAwesome";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

//react-native run-android

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      pageName: "Home"
    };
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  handlePress = (newPageName) => {
    this.setState({ pageName: newPageName });
    this.drawer.closeDrawer();
  }

  render() {
    var drawer = (
      <View style={styles.menu}>
        <FlatList
          data={[
            { key: "Home", iconName: "home" },
            { key: "Search", iconName: "search" },
            { key: "My list", iconName: "film" },
            { key: "Options", iconName: "gear" },
            { key: "Deconnexion", iconName: "lock" }
          ]}
          renderItem={({ item }) => (
            <MenuItems
              pageName={item.key}
              iconName={item.iconName}
              onPressItem={this.handlePress}
              style={styles.menuItems}
            />
          )}
        />
      </View>
    );
    return (
      <DrawerLayoutAndroid
        renderNavigationView={() => drawer}
        drawerWidth={250}
        ref={_drawer => (this.drawer = _drawer)}
      >
      
        <StatusBar backgroundColor="#A51616" barStyle="light-content" />
        <Icon.ToolbarAndroid
          title={this.state.pageName}
          onIconClicked={this.openDrawer}
          navIconName="navicon"
          style={styles.toolbar}
          titleColor="white"
          overflowIconName="navicon"
        />
        <Content pageName={this.state.pageName} />

      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: "#6D0F0F"
  },
  menu: {
    flex: 1,
    backgroundColor: "#6D0F0F"
  },
  menuItems: {
    fontSize: 20,
    padding: 20,
    backgroundColor: "#6D0F0F"
  }
});
