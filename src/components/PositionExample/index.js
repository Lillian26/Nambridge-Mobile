import React, { Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { AnimatedGradient } from "./AnimatedGradientWithPosition";

const styles = StyleSheet.create({
  component: {
    flex: 1
  },
  header: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center"
  }
});

const colors1 = ["#240080", "#DA21B7"];

const colors2 = ["#240080", "#DA21B7"];

const colors3 = ["blue", "red"];

const orientation1 = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

const orientation2 = {
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 }
};

const orientation3 = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

export class PositionExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: colors1,
      orientation: orientation1
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => this.updateOrientation(), 800);
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  updateOrientation() {
    const list = [
      { colors: colors1, orientation: orientation1 },
      { colors: colors2, orientation: orientation2 },
      { colors: colors3, orientation: orientation3 }
    ]

    const num = Math.floor(Math.random() * 2) + 1
    console.log('num is : ', (num <= 0 ? 0 : num-1))
    console.log(list[(num <= 0 ? 0 : num - 1)])
    this.setState(list[(num <= 0 ? 0 : num - 1)]);
  }
  render() {
    const { colors, orientation } = this.state;

    return (
      <AnimatedGradient
        style={{ flex: 1 }}
        colors={colors}
        orientation={orientation}
      />
    );
  }
}
