import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import Games from './src/js/games/Games';
import Standings from './src/js/standings/Standings';
import BoxScore from './src/js/games/BoxScore';

const MyNBATracker = createStackNavigator(
  {
    Games: {screen: Games},
    Standings: {screen: Standings},
    BoxScore: {screen: BoxScore}
  }, 
  {
    initialRouteName: 'Games'
  }
);


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyNBATracker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
