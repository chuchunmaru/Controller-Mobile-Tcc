import React from 'react';
import { View, Text, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' //microchip

export default function () {

    return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'whitesmoke' }}>
            <StatusBar hidden />
            <Icon name={'android'} size={150} />
            <Text style={{ marginVertical: 20, fontSize: 30, textAlign: 'center', fontFamily: 'InterExtraLight' }}>Application Error</Text>
            <Icon name={'apple'} size={150} />
        </View>
    )
}