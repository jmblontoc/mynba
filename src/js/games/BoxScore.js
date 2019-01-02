import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Logos from '../tools/logo';
import TeamStats from '../games/TeamStats';

class BoxScore extends React.Component {

    _isMounted = false;

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('visitTricode') + ' vs. ' + navigation.getParam('homeTricode')
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            vTeam: [],
            hTeam: [],
            players: []
        }
    }

    // replace parameters
    endPoint = 'http://data.nba.net/prod/v1/DATE/GAMEID_boxscore.json';

    loadBoxScore = () => {

        if (this._isMounted) {
            let endpoint = this.initEndPoint();

            fetch(endpoint)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        vTeam: data.stats.vTeam,
                        hTeam: data.stats.hTeam
                    })
                })
                .catch(error => alert('Game has not yet started'));
        }
    }

    initEndPoint = () => {
        const { navigation } = this.props;
        let _endPoint = this.endPoint
                    .replace('DATE', navigation.getParam('date'))
                    .replace('GAMEID', navigation.getParam('gameID'));

        return _endPoint;
    }

    loadPlayerData = () => {
        
        // change 2018 to what YEAR
        let endPoint = 'http://data.nba.net/10s/prod/v1/2018/players.json';

        fetch(endPoint)
                .then(response => response.json())
                .then(data => {

                    if (data) {
                        this.setState({
                            players: data.league.standard
                        })
                    }
                })
                .catch(error => alert('something went wrong'));
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadBoxScore();
        this.loadPlayerData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { navigation } = this.props;
        const homeData =  this.state.hTeam.leaders;
        const visitData = this.state.vTeam.leaders;

        return (
            <ScrollView style={styles.container}>
                <TeamStats
                    tricode={navigation.getParam('visitTricode')}
                    leaders={visitData}
                    players={this.state.players}
                    score={navigation.getParam('vScore')}
                />
                <TeamStats 
                    tricode={navigation.getParam('homeTricode')}
                    leaders={homeData}
                    players={this.state.players}
                    score={navigation.getParam('hScore')}
                />
            </ScrollView>
        );
    }
}


export default BoxScore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});