import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Menu from '../tools/Menu';
import moment from 'moment';
import GameInfo from '../games/GameInfo';

class Games extends React.Component {

    _isMounted = false;

    static navigationOptions = {
        header: null,
    }

    state = {
        'numGames': 0,
        'games': [],
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadGameData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadGameData = () => {

        let currDate = moment().subtract(1, 'days').format('YYYYMMDD');

        // todo change url
        let scoreboardToday = 'http://data.nba.net/10s/prod/v1/' + currDate +'/scoreboard.json';

        fetch(scoreboardToday)
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        numGames: data.numGames,
                        games: data.games
                    })
                }
            })
            .catch(error => alert('Something went wrong'))

    }

    render() {

        const renderGames = this.state.games.map((game, i) =>
            <GameInfo data={game} key={i} />
        );

        return(
            <View style={styles.container}>
                <View style={{ height: Dimensions.get('window').height - 10, paddingTop: 50, flex: 1 }}>
                    <ScrollView style={styles.scrollview}>
                        <Text style={styles.title}>{moment().format("LLL")}</Text>
                        <Text style={styles.numGames}>Number of Games:  
                            <Text style={styles.numGamesValue}> {this.state.numGames} </Text>
                        </Text>
                        {renderGames}
                        
                    </ScrollView>
                    <Menu
                        active="games"
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    scrollview: {
    },

    title: {
        fontSize: 23,
        textAlign: 'center'
    },

    numGames: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20
    },

    numGamesValue: {
        fontWeight: 'bold'
    }
});

export default Games;