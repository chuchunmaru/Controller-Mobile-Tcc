import React from 'react';
import { View, Text, StatusBar } from 'react-native'
import * as Progress from 'react-native-progress'
import FastImage from 'react-native-fast-image'

export default function () {

    return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#1c1c1c' }}>
            <StatusBar hidden />
            <FastImage
                style={{ width: '100%', height: '60%' }}
                source={require('../Animations/animation_500_kugbgik3.gif')}
                resizeMode={FastImage.resizeMode.contain} />
            <Text style={{ color: 'rgba(255, 255, 255, .75)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
                Getting Data
            </Text>
        </View>
    )
}