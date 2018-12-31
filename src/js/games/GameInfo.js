import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Logos from '../tools/logo';
import moment from 'moment';
import { withNavigation } from 'react-navigation';

class GameInfo extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.currDate = moment().subtract('1', 'days').format("YYYYMMDD");
    }

    render() {

        const vTriCode = this.data.vTeam.triCode;
        const hTriCode = this.data.hTeam.triCode;

        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={() => {this.props.navigation.navigate('BoxScore', {
                    'date': this.currDate,
                    'gameID': this.data.gameId,
                    'visitTricode': vTriCode,
                    'homeTricode': hTriCode,
                    'vScore': this.data.vTeam.score,
                    'hScore': this.data.hTeam.score
                })}}>
                <View style={[styles.subcontainer]}>
                    <Image 
                        source={Logos[vTriCode]}
                        style={styles.logo}  
                    />
                    <Text>{vTriCode}</Text>
                    <Text>{this.data.vTeam.score}</Text>
                </View>
                <View style={[styles.subcontainer, styles.middle]}>
                    <Text>@</Text>
                </View>
                <View style={[styles.subcontainer]}>
                    <Image 
                        source={Logos[hTriCode]}
                        style={styles.logo}  
                    />
                    <Text>{hTriCode}</Text>
                    <Text>{this.data.hTeam.score}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10
    },

    middle: {
        justifyContent: 'center'
    },

    subcontainer: {
        margin: 8,
        alignItems: 'center',
    },

    logo: {
        height: 70,
        width: 70
    }
});

export default withNavigation(GameInfo);