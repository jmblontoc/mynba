import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Logos from '../tools/logo';

class ConferenceStandings extends React.Component {

    constructor(props) {
        super(props);
    }

    getTeamName = (id) => {
        let data = this.props.teamData;
        for (let i in data) {
            if (data[i].teamId == id)
                return data[i].nickname;
        }
        return "Not Available";
    }

    getLogo = (id) => {
        let data = this.props.teamData;
        for (let i in data) {
            if (data[i].teamId == id)
                return data[i].tricode;
        }
        return "Not Available";
    }

    render() {


        const makeTable = this.props.standings.map((d, i) => 
            <View
                key={i + 1}
                style={this.styles.header}
            >
                <View style={[this.styles.headerRow, {flex: 0.5}]}>
                    <Text>{i + 1}</Text>
                </View>
                <View style={[this.styles.headerRow, this.styles.imgParent]}>
                    <Image 
                        source={Logos[this.getLogo(d.teamId)]}
                        style={this.styles.image}
                        resizeMode='center'
                    />
                </View>
                <View style={[this.styles.headerRow, {flex: 3}]}>
                    <Text>{this.getTeamName(d.teamId)}</Text>
                </View>
                <View style={[this.styles.headerRow, {flex: 1}]}>
                    <Text style={this.styles.headerText}>{d.win}</Text>
                </View>
                <View style={[this.styles.headerRow, {flex: 1}]}>
                    <Text style={this.styles.headerText}>{d.loss}</Text>
                </View>
                <View style={[this.styles.headerRow, {flex: 1}]}>
                    <Text style={this.styles.headerText}>{d.isWinStreak ? "W" : "L" }{d.streak}</Text>
                </View>
            </View>
        );

        return (
            <View style={this.styles.container}>
                <View style={this.styles.conferenceHeader}>
                    <Text style={this.styles.conferenceText}>{this.props.conference}</Text>
                </View>
                {makeTable}
            </View>
        );
    }

    styles = StyleSheet.create({

        container: {
            alignItems: 'center',
            marginTop: 50,
            flex: 1
        },
        header: {
            flexDirection: 'row',
            flex: 1
        },
        conferenceHeader: {
            padding: 10,
            backgroundColor: this.props.confColor,
            width: '100%'
        },
        conferenceText: {
            color: 'white',
            fontSize: 20,
            textAlign: 'center'
        },

        headerRow: {
            margin: 10,
            padding: 5,
            justifyContent: 'center'
        },

        headerText: {
            textAlign: 'right'
        },

        image: {
            height: 45,
            width: 45,
        },
        
        imgParent: {
            flex: 1
        }
    });
}

export default ConferenceStandings;