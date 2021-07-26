import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Tile = ( props ) => {
    // console.log(props)
    return (
        <View style={styles.tiles}>
            {props.name != "Custom" && <Text style={styles.timeFormat}>{props.time}</Text>}
            <Text style={styles.TimeName}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tiles: {
        width: 80,
        height: 80,
        backgroundColor: '#4D2C26',
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: 30,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    timeFormat: {
        color: '#F1E8DC',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    TimeName: {
        color: '#F1E8DC',
        alignSelf: 'center'
    }
})

export default Tile