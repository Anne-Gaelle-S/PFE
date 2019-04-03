import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
    StyleProp,
    ViewStyle,
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
import Anime from "./Anime";

// const SECTIONS =

export default class AccordeonList extends Component {
    constructor(props: Props) {
        super(props);
        this.state = { 
            activeSections: [],
            sections: this.updateList(this.props.data)
        }
        this.updateList = this.updateList.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._updateSections = this._updateSections.bind(this);
    };

    updateList(data){
        return (data.map( animeObj => {
            return ({ 
                "title": animeObj.title.romaji,
                "content":  <Anime 
                                id={animeObj.id}
                                title={animeObj.title.romaji}
                                episodesSeen={0}
                                episodesTotal={animeObj.episodes}
                                status={animeObj.status}
                                description={animeObj.description}
                                showDescription={true}
                            /> 
            })
        }))
    }

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                {section.content} 
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <ScrollView>
                <Accordion
                    sections={this.state.sections}
                    activeSections={this.state.activeSections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    borderBottomColor: 'grey',
    borderBottomWidth: 3 
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  }
})