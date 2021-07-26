import React, {useState} from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
// import Modal from 'react-native-modal';

import CountDown from '../components/Countdown'

const Example = () => {
    const [run, setRun] = useState(false);
    return(
    <View>
        <StatusBar hidden={true}/>
        <Text>Example</Text>
        <CountDown 
            until={30}
            running={run}
        />
        <TouchableOpacity style={{width: 20, height: 20, backgroundColor: 'black'}} onPress={() => setRun(true)}>

        </TouchableOpacity>
        <TouchableOpacity style={{width: 20, height: 20, backgroundColor: 'pink'}} onPress={() => setRun(false)}>

        </TouchableOpacity>
        <TouchableOpacity style={{width: 20, height: 20, backgroundColor: 'purple'}}>

        </TouchableOpacity>
    </View>
    )
}

export default Example;