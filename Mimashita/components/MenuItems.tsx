import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = { pageName: string; iconName: string; style: any };

// check : https://stackoverflow.com/questions/45706257/react-native-onpress-extract-id-from-currenttarget

export default class TouchableText extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.textPressed = this.textPressed.bind(this);
  }

  textPressed() {
    this.props.onPressItem(this.props.pageName);
  }

  render() {
    return (
      <Icon.Button
        name={this.props.iconName}
        onPress={this.textPressed}
        style={this.props.style}
        borderRadius={0}>
            <Text style={{ color: "white" }}>{this.props.pageName}</Text>
      </Icon.Button>
    );
  }
}