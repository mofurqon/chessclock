import React, {useReducer, useState, useEffect} from 'react'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native'
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome';

import CountDown from '../components/Countdown';
import Timeout from '../components/Timeout';

let whowins = '';
let timecontrol2 = 0;
let increment2 = 0;

// reducer for clicking the display black and white
const reducer = (state, action) => {
    switch (action.type) {
        /*
            white: touchable opacity for white 
            black: touchable opacity for black
            press: pressable for both
            turn: decide the turn of two, for swithing color
            finish: if the game is finished
        */
        case 'start':
            if ( state.turn === "black") {
                return {...state, white: false, black: true, press: true}    
            }
            return {...state, white: true, black: false, press: true}
        case 'white_clicked':
            return {...state, white: false, black: true, turn: "black"}
        case 'black_clicked':
            return {...state, white: true, black: false, turn: "white"}
        case 'pause':
            return {...state, white: false, black: false, press: false}
        case 'stop':
            return {...state, white: false, black: false, press: false, finish: true}
        default:
            return state;
    }
}

const Clock = ({ navigation, route}) => {
    const [state, dispatch] = useReducer(reducer, { white: false, black: false, press: false, turn: "white", finish: false});
    const {white, black, press, turn, finish} = state;
    const [timeend, setTimeend] = useState(false);
    
    const [soundStart, setSoundStart] = useState();
    const [soundEnd, setSoundEnd] = useState();
    const [soundPress, setSoundPress] = useState();

    // sound for start and puse the game
    const playSoundStart = async () => {
        const soundstart = new Sound('start.wav', Sound.MAIN_BUNDLE, (err) => {
            if (err) {
                // console.log('error', err);
                return;
            }
            setSoundStart(soundstart);
            soundstart.play();
        }); 
    }

    // sound for end the game
    const playSoundEnd = async () => {
        const soundend = new Sound('danger.wav', Sound.MAIN_BUNDLE, (err) => {
            if (err) {
                // console.log('error', err);
                return;
            }
            setSoundEnd(soundend);
            soundend.play();
        }); 
    }

    // sound for press the display white or black
    const playSoundPress = async () => {
        const soundpress = new Sound('click.wav', Sound.MAIN_BUNDLE, (err) => {
            if (err) {
                // console.log('error', err);
                return;
            }
            setSoundPress(soundpress);
            soundpress.play();
        }); 
    }

    useEffect(() => {
        return soundStart ? () => {
            // console.log('release');
            soundStart.release();
        } : undefined;
    }, [soundStart]);

    useEffect(() => {
        return soundEnd ? () => {
            // console.log('release');
            soundEnd.release();
        } : undefined;
    }, [soundEnd])

    useEffect(() => {
        return soundPress ? () => {
            // console.log('release');
            soundPress.release();
        } : undefined;
    }, [soundPress])

    // for finishing the game and modal popup
    const setFinishWhite = () => {
        whowins = "Black Wins";
        playSoundEnd();
        setTimeend(true);
        dispatch({type: 'stop'})
    }
    const setFinishBlack = () => {
        whowins = "White Wins";
        playSoundEnd();
        setTimeend(true);
        dispatch({type: 'stop'})
    }

    const startHandler = () => {
        playSoundStart();
        dispatch({ type: press ? 'pause' : 'start'})
    }

    const pressWhiteHandler = () => {
        playSoundPress();
        dispatch({type: 'white_clicked'})
    }

    const pressBlackHandler = () => {
        playSoundPress();
        dispatch({ type: 'black_clicked'})
    }

    // time control if there's a difference
    if (route.params.timecontrol2 === undefined) {
        timecontrol2 = route.params.timecontrol;
        increment2 = route.params.increment;
    } else {
        timecontrol2 = route.params.timecontrol2;
        increment2 = route.params.increment2;
    }

    return (
        <View style={styles.background}>
            {/* lighside area */}
            <TouchableOpacity 
                style={[styles.ligthSide, turn === "white" ? {backgroundColor: '#DFB995'} : {backgroundColor: '#4D2C26'}]}
                onPress={pressWhiteHandler} 
                disabled={press && white ? false : true}
            >
                <View style={[styles.timeBoxLight, white ? {backgroundColor: '#F1E8DC'} : {backgroundColor: '#b5b5b5'}]}>
                    <CountDown 
                        until={route.params.timecontrol}
                        running={white}
                        increment={route.params.increment || 0}
                        onFinish={setFinishWhite}
                    />
                </View>
            </TouchableOpacity>
            {/* darkside area */}
            <TouchableOpacity 
                style={[styles.darkSide, turn === "black" ? {backgroundColor: '#DFB995'} : {backgroundColor: '#4D2C26'}]}
                onPress={pressBlackHandler}
                disabled={press && black ? false : true}
            >
                <View style={[styles.timeBoxDark, black ? {backgroundColor: '#F1E8DC'} : {backgroundColor: '#b5b5b5'}]}>
                    <CountDown 
                        until={timecontrol2}
                        running={black}
                        increment={increment2 || 0}
                        onFinish={setFinishBlack}
                    />
                </View>
            </TouchableOpacity>

            {/* button control */}
            <View style={styles.buttonControl}>
                {!finish && <TouchableOpacity style={styles.circular} onPress={startHandler}>
                    {press ? <Icon name="pause" size={30} color="#F1E8DC" /> : <Icon name="play" size={30} color="#F1E8DC" />}
                </TouchableOpacity>}
                {(!press || finish) && <TouchableOpacity style={styles.circular} onPress={() => navigation.navigate('Home')}>
                    <Icon name="times" size={30} color="#F1E8DC" />
                </TouchableOpacity>}
                {/* {!press && <TouchableOpacity style={styles.circular} onPress={playSound}>
                    <Ionicons name="md-reload-outline" size={30} color="#F1E8DC" />
                </TouchableOpacity>} */}
            </View>
            
            {/* time runs out */}
            <Timeout 
                visibility={timeend}
                onClick={() => setTimeend(false)}
                whowins={whowins}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5efd7'
    },
    ligthSide: {
        width: '100%',
        height: '50%',
        backgroundColor: '#DFB995'
    },
    darkSide: {
        width: '100%',
        height: '50%',
        backgroundColor: '#4D2C26',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    timeBoxLight: {
        width: 115,
        height: 55,
        top: 14,
        left: 14,
        backgroundColor: '#F1E8DC',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    timeBoxDark: {
        width: 115,
        height: 55,
        bottom: 14,
        right: 14,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonControl: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    circular: {
        width: 67,
        height: 67,
        backgroundColor: '#1C1616',
        borderRadius: 67,
        marginHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'center'
    }

})

export default Clock