import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logos from '../tools/logo';

class TeamStats extends React.Component {

    constructor(props) {
        super(props);

    }

    getPlayerName = (id) => {

        let players = this.props.players;
        for (let i in players) {
            if (players[i].personId === id) {
                return players[i].firstName + " " + players[i].lastName
            }
        }

        return "N/A";
    }

    render() {

        let stats = this.props.leaders;

        let points;
        let assists;
        let rebounds;
        let pointsLeaders = [];
        let assistsLeaders = [];
        let reboundsLeaders = [];

        if (!stats) {
            points = 0;
            assists = 0;
            rebounds = 0;


        }
        else {
            points = stats.points.value;
            assists = stats.assists.value;
            rebounds = stats.rebounds.value;

            pointsLeaders = stats.points.players;
            assistsLeaders = stats.assists.players;
            reboundsLeaders = stats.rebounds.players;
        }

        let renderPoints = pointsLeaders.map((player, i) =>
            <Text style={styles.stats} key={i}>{points} pts - {this.getPlayerName(player.personId)}</Text>
        );

        let renderRebounds = reboundsLeaders.map((player, i) =>
            <Text style={styles.stats} key={i}>{rebounds} rebs - {this.getPlayerName(player.personId)}</Text>
        );

        let renderAssists = assistsLeaders.map((player, i) =>
            <Text style={styles.stats} key={i}>{assists} asts - {this.getPlayerName(player.personId)}</Text>
        );

        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={Logos[this.props.tricode]} />
                </View>
                <View style={styles.scorePH}>
                    <Text style={styles.textScore}>{this.props.score}</Text>
                </View>
                <Text style={styles.textLabel}>POINTS</Text>
                {renderPoints}
                <Text style={styles.textLabel}>REBOUNDS</Text>
                {renderRebounds}
                <Text style={styles.textLabel}>ASSISTS</Text>
                {renderAssists}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
    },
    textLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 5
    },
    stats: {
        textAlign: 'center',
        margin: 2
    },

    textScore: {
        fontSize: 25,
        textAlign: 'center'
    },
    scorePH: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2'
    }
});

export default TeamStats;