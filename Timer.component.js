import React, { Component } from 'react';
import { Text, View, Button, Platform } from 'react-native';

import styles from './Timer.styles';
import BackgroundTimer from 'react-native-background-timer';

export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
    };
  }

  onStart = () => {
    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }

    this.interval = BackgroundTimer.setInterval(() => {
      this.setState({
        second: this.state.second + 1,
      });
    }, 1000);
  };

  renderStartButton = () => {
    return <Button title="Start" onPress={this.onStart} />;
  };

  onPause = () => {
    BackgroundTimer.clearInterval(this.interval);
  };

  onReset = () => {
    this.setState({
      second: 0,
    });
    BackgroundTimer.clearInterval(this.interval);
  };

  renderPauseButton = () => {
    return <Button title="Pause" onPress={this.onPause} />;
  };

  renderResetButton = () => {
    return <Button title="Reset" onPress={this.onReset} />;
  };

  renderContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.secondText}>{this.state.second}</Text>
        <View style={styles.buttonWrapper}>
          {this.renderStartButton()}
          {this.renderPauseButton()}
          {this.renderResetButton()}
        </View>
      </View>
    );
  };
  render() {
    const content = this.renderContent();

    return content;
  }
}
