import React from 'react';
import { View, Text, StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getUrlEspConfig } from '../MqttClient'

export default class extends React.Component {

    componentDidMount(){
        getUrlEspConfig('configTopic', 'getDeviceModel') 
    }


    render() {
        return (
            <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#1c1c1c' }}>
                <StatusBar hidden />
                <FastImage
                    style={{ width: '100%', height: '60%' }}
                    source={require('./animations/animation_500_kugbooul.gif')}
                    resizeMode={FastImage.resizeMode.contain} />
                <Text style={{ color: 'rgba(255, 255, 255, .75)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
                    Connecting to Device...
                </Text>
            </View>
        )
    }
}