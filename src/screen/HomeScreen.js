import React, {useState}  from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'

import Tile from "../components/Tile";
import CustomModal from "../components/CustomModal";
import images from "../image";

const HomeScreen = ({ navigation }) => {
    const [custom, setCustom] = useState(false);

    // custom time control
    const openClockCustom = (timecontrol, increment, secondControl, diff, timecontrol2, increment2, secondControl2) => {
        // convert to mills
        timecontrol = timecontrol * 10
        increment = increment * 10
        
        if (!diff) {
            if (!secondControl) {
                timecontrol = timecontrol * 60

            }
            setCustom(false) 
            navigation.navigate('Clock',{timecontrol: timecontrol, increment: increment})
        } else {
            // different time control between player
            timecontrol2 = timecontrol2 * 10
            increment2 = increment2 * 10

            if (!secondControl) {
                timecontrol = timecontrol * 60
            }
            if (!secondControl2) {
                timecontrol2 = timecontrol2 * 60
            }
            setCustom(false) 
            navigation.navigate('Clock',{timecontrol: timecontrol, increment: increment, timecontrol2: timecontrol2, increment2: increment2})
        }
    }
    
    return (

        <View style={styles.backgroundScreen}>
            <StatusBar hidden={true}/>
            <View style={styles.insideScreen}>
                <Image source={images.horsy} style={styles.horse} resizeMode='contain'/>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 600})}>
                    <Tile time="1 + 0" name="Bullet" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 1200, increment: 20})}>
                    <Tile time="2 + 1" name="Bullet" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 1800})}>
                    <Tile time="3 + 0" name="Blitz"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 1800, increment: 20})}>
                    <Tile time="3 + 2" name="Blitz"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 3000})}>
                    <Tile time="5 + 0" name="Blitz"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 3000, increment: 30})}>
                <Tile time="5 + 3" name="Blitz"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 6000})}>
                <Tile time="10 + 0" name="Rapid"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 6000, increment: 50})}>
                <Tile time="10 + 5" name="Rapid"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 9000, increment: 100})}>
                <Tile time="15 + 10" name="Rapid"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 18000, increment: 200})}>
                <Tile time="30 + 20" name="Classical"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Clock', {timecontrol: 54000, increment: 300})}>
                <Tile time="90 + 30" name="Classical"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setCustom(true)}>
                    <Tile name="Custom"/>
                </TouchableOpacity>
            </View>
            <CustomModal 
                visible={custom}
                onClick={() => setCustom(false)} 
                onNavigateModal={openClockCustom}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundScreen: {
        backgroundColor: '#F1E8DC',
        width: '100%',
        height: '100%',
    },
    insideScreen: {
        width: '90%',
        height: '95%',
        backgroundColor: '#DFB995',
        left: 20,
        bottom: 20,
        right:20,
        top: 20,
        borderRadius: 23,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingVertical: 50
    },
    horse: {
        position: 'absolute',
        height: '120%',
        width: '100%',
        opacity: 0.2
    }
})

export default HomeScreen