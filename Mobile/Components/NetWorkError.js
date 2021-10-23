import React from 'react';
import { View, Text, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function () {

    return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }}>
            <StatusBar hidden />
            <Ionicons name={'ios-warning-outline'} size={200} />
            <Text style={{ fontSize: 25, textAlign: 'center', fontFamily: 'InterExtraLight' }}>Network request failed</Text>
        </View>
    )
}