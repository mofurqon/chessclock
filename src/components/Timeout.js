import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';

const Timeout = ( props ) => {
    return (
        <Modal
            style={styles.alertModal}
            isVisible={props.visibility}
            onBackdropPress={props.onClick}
            animationIn='fadeIn'
            animationOut='fadeOut'
        >
            <View style={styles.alertView}>
                <Text style={styles.alertText}>{props.whowins}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    alertModal: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    alertView: {
        width: 200,
        height:240,
        backgroundColor: '#F5EFD7',
        opacity: 0.8,
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    alertText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Timeout;