import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Text
} from "react-native";
import SplashScreen from "./components/SplashScreen";
import MenuItems from "./components/MenuItems";
import Content from "./components/Content";
import Icon from "react-native-vector-icons/FontAwesome";

//react-native run-android

type Props = {};
interface State {
  dataLoad: boolean;
  pageName: string;
  dataContent: any;
}

export default class App extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      dataLoad: false,
      pageName: "Home"
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.handlePressOnMenu = this.handlePressOnMenu.bind(this);
    this.handleDataLoad = this.handleDataLoad.bind(this);
  }

  openDrawer() {
    this.menu.openDrawer();
  }

  handlePressOnMenu = newPageName => {
    this.setState({ pageName: newPageName });
    this.menu.closeDrawer();
  };

  handleDataLoad(animeList, animeSuspected) {
    console.log("ANIME SUSPECTS :");
    console.log(animeSuspected);
    this.setState({
        animeTrendingList: animeList,
        animeSuspectedWatched: animeSuspected,
        dataLoad: true
    });
  } 

  render() {
    var menu = (
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
              onPressItem={this.handlePressOnMenu}
              style={styles.menuItems}
            />
          )}
        />
      </View>
    );

    return (
      <View style={{ flex: 1, alignSelf: 'stretch'}}>
        <StatusBar backgroundColor="#A51616" barStyle="light-content" />
        {this.state.dataLoad ? (
          <DrawerLayoutAndroid
            drawerWidth={300}
            renderNavigationView={() => menu }
            ref={_menu => (this.menu = _menu)}
          >
            <Icon.ToolbarAndroid
              title={this.state.pageName}
              onIconClicked={this.openDrawer}
              navIconName="navicon"
              style={styles.toolbar}
              titleColor="white"
              overflowIconName="navicon"
            />
            <Content 
              pageName={this.state.pageName} 
              animeTrendingList={this.state.animeTrendingList} 
              animeSuspectedWatched={this.state.animeSuspectedWatched}
            />
          </DrawerLayoutAndroid>
        ) : (
          <SplashScreen endSplashScreen={this.handleDataLoad} />
        )}
      </View>
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
