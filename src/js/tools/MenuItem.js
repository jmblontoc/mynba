import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.activeMenu = this.props.active;
    }

    isActive = () => {
        return this.activeMenu.toUpperCase() === this.props.name
    }

    render() {

        if (this.isActive()) {
            return (
                <TouchableOpacity 
                    style={[styles.container, styles.active]} 
                    onPress={this.props.onMenuPress}
                >
                    <Text style={styles.text}>{this.props.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={this.props.onMenuPress}
            >
                <Text style={styles.text}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        color: 'white',
        textAlign: 'center'
    },

    active: {
        backgroundColor: '#595959'
    }
})

export default MenuItem;