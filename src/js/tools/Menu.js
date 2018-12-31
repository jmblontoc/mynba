import React from 'React';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MenuItem from '../tools/MenuItem';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.activeMenu = this.props.active;
    }

    render() {
        
        return (
            <View style={styles.nav}>
                <MenuItem 
                    name="STANDINGS"
                    active={this.activeMenu}
                    onMenuPress={() => {this.props.navigation.navigate('Standings')}}
                />
                <MenuItem 
                    name='GAMES'
                    active={this.activeMenu}
                    onMenuPress={() => {this.props.navigation.navigate('Games')}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    nav: {
        backgroundColor: '#404040',
        height: 55,
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    }
})

export default Menu;
