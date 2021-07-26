import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Switch } from 'react-native'
import Modal from 'react-native-modal'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomClock = ( props ) => {
    // timecontrol for both or white
    const [minutesValueW, setMinutesValueW] = useState(1)
    const [secondsValueW, setSecondssValueW] = useState(0)

    // timecontrol for black if necessary
    const [minutesValueB, setMinutesValueB] = useState(1)
    const [secondsValueB, setSecondssValueB] = useState(0)

    // toggle for change time control to seconds for white or both
    const [isEnabledW, setIsEnabledW] = useState(false);
    const toggleSwitchW = () => setIsEnabledW(previousState => !previousState);

    // toggle for change time control to seconds for black
    const [isEnabledB, setIsEnabledB] = useState(false);
    const toggleSwitchB = () => setIsEnabledB(previousState => !previousState);

    // toggle for set different timecontrol
    const [isDiffEnabled, setIsDiffEnabled] = useState(false);
    const toggleDiffSwitch = () => setIsDiffEnabled(previousState => !previousState);

    // passing data parameter to props
    const navigateModal = () => {
        if (!isDiffEnabled) {
            props.onNavigateModal(
                minutesValueW, 
                secondsValueW, 
                isEnabledW,
                isDiffEnabled
            );
            
        } else {
            props.onNavigateModal(
                minutesValueW, 
                secondsValueW, 
                isEnabledW,
                isDiffEnabled, 
                minutesValueB, 
                secondsValueB, 
                isEnabledB
            );
        }
    }
    return (
        <Modal 
            style={styles.modalStyle}
            isVisible={props.visible}
            onBackdropPress={props.onClick}
            animationIn='fadeInDown'
            animationOut='fadeOutUp'
        >
            <View style={[styles.formclock,isDiffEnabled ? {height: 560} : {height: 400}]}>
                <Text style={styles.title}>Create a Game</Text>
                <View style={styles.swithStyle}>
                    <Text>{minutesValueW} </Text>
                    <Text style={styles.controlText}>{!isEnabledW ? "Minutes" : "Seconds"} per Side</Text>
                </View>
                
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={60}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#4C2B27"
                    step={!isEnabledW ? 1 : 5}
                    value={minutesValueW}
                    onValueChange={(minutesValueW) => setMinutesValueW(minutesValueW)}
                />
                <View style={styles.swithStyle}>
                    <Text style={styles.optional}>Change to Seconds</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#DFB995" }}
                        thumbColor={isEnabledW ? "#4C2B27" : "#f4f3f4"}
                        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                        onValueChange={toggleSwitchW}
                        value={isEnabledW}
                    />
                </View>
                <View style={styles.swithStyle}>
                    <Text>{secondsValueW} </Text>
                    <Text style={styles.controlText}>Seconds Increment</Text>
                </View>
                
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={30}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#4C2B27"
                    step={1}
                    value={secondsValueW}
                    onValueChange={(secondsValueW) => setSecondssValueW(secondsValueW)}
                />
                <View style={styles.swithStyle}>
                    <Text style={styles.optional}>Different time format between player</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#DFB995" }}
                        thumbColor={isDiffEnabled ? "#4C2B27" : "#f4f3f4"}
                        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                        onValueChange={toggleDiffSwitch}
                        value={isDiffEnabled}
                    />  
                </View>
                
                {/* show if toggle activated */}
                {isDiffEnabled && <View>
                    <View style={styles.swithStyle}>
                        <Text>{minutesValueB} </Text>
                        <Text style={styles.controlText}>{!isEnabledB ? "Minutes" : "Seconds"} for Black</Text>
                    </View>
                    
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={60}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#4C2B27"
                        step={!isEnabledB ? 1 : 5}
                        value={minutesValueB}
                        onValueChange={(minutesValueB) => setMinutesValueB(minutesValueB)}
                    />
                    <View style={styles.swithStyle}>
                        <Text style={styles.optional}>Change to Seconds</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#DFB995" }}
                            thumbColor={isEnabledB ? "#4C2B27" : "#f4f3f4"}
                            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                            onValueChange={toggleSwitchB}
                            value={isEnabledB}
                        />
                    </View>
                    <View style={styles.swithStyle}>
                        <Text>{secondsValueB} </Text>
                        <Text style={styles.controlText}>Seconds Increment :</Text>
                    </View>
                    
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={30}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#4C2B27"
                        step={1}
                        value={secondsValueB}
                        onValueChange={(secondsValueB) => setSecondssValueB(secondsValueB)}
                    />
                </View>}

                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={navigateModal}
                >
                    <Text style={styles.innerButton}>Start</Text>
                </TouchableOpacity>
                <View style={styles.closeStyle}>
                    <Icon name="times" size={30} color="#dfb995" onPress={props.onClick}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    formclock: {
        width: 300,
        height: 400,
        backgroundColor: '#F1E8DC',
        alignItems: 'center',
        paddingTop: 20,
        borderRadius: 8
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
    },
    optional: {
        fontSize: 11
    },
    startButton: {
        width: 100,
        height: 30,
        backgroundColor: '#4D2C26',
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5
    },
    innerButton: {
        color: '#F5EFD7'
    },
    controlText: {
        marginVertical: 10,
    },
    swithStyle: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    closeStyle: {
        position: 'absolute',
        top: -15,
        left: 285,
    }
})

export default CustomClock