import React from 'react';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Search from "./Search";

interface Props { pageName: string; }

export default class Content extends React.Component<Props>{
    render() {
        return (
            <View style={styles.Content} >
                { this.props.pageName=="Search" && <Search /> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    backgroundColor: '#242424'
  }
});
