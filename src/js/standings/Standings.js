import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Menu from '../tools/Menu';
import ConferenceStandings from '../standings/ConferenceStandings';
import moment from 'moment';

class Standings extends React.Component {

    _isMounted = false;

    static navigationOptions = {
        header: null,
    }

    state = {
        standingsWest: [],
        standingsEast: [],
        teamData: []
    }

    // update this incase the API changes endpoints
    teamsEndpoint = 'http://data.nba.net/prod/v2/YEAR/teams.json';
    currYear = moment().format('YYYY');
    currYear = '2018';
    teamsEndpoint = this.teamsEndpoint.replace('YEAR', this.currYear);

    componentDidMount() {
        this._isMounted = true;
        this.loadTeamData();
        this.loadStandings();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadTeamData = () => {

        fetch(this.teamsEndpoint)
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        teamData: data.league.standard
                    })
                }
            })
            .catch(error => alert('Something went wrong with the team data'))
    }

    loadStandings = () => {

        fetch('http://data.nba.net/10s/prod/v1/current/standings_conference.json')
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        standingsWest: data.league.standard.conference.west,
                        standingsEast: data.league.standard.conference.east
                    })
                }
            })
            .catch(error => alert('Something went wrong'))
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{ height: Dimensions.get('window').height - 10, paddingTop: 50, flex: 1 }}>
                    <ScrollView style={styles.scrollview}>
                        <Text style={styles.title}>NBA Conference Standings</Text>
                        <ConferenceStandings 
                            conference="Western Conference"
                            standings={this.state.standingsWest}
                            confColor='rgb(213, 71, 96)'
                            teamData={this.state.teamData}/>

                        <ConferenceStandings 
                            conference="Eastern Conference"
                            standings={this.state.standingsEast}
                            confColor='rgb(23, 64, 139)'
                            teamData={this.state.teamData}/>
                    </ScrollView>
                    <Menu
                        active="standings"
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
        textAlign: 'center',
        marginBottom: -30
    }
});

export default Standings;