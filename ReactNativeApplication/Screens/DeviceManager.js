import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, PermissionsAndroid } from 'react-native'
import FastImage from 'react-native-fast-image'
import AppLoading from '../Components/AppLoading';
import { AddNewDevice } from '../Core/MqttClient';

export default class DeviceManager extends React.Component {

    state = {
        deviceSelected: false,
        permissions: false,
        Load: false
    }

    grantedPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    permissions: true
                })
            }

        } catch (e) {
            console.warn(e)
        }

        this.setState({
            Load: true
        })

    }

    componentDidMount() {
        this.grantedPermissions()
    }

    render() {
        if (!this.state.deviceSelected && this.state.permissions) {
            return (
                <View style={{ backgroundColor: '#1c1c1c', height: '100%', width: '100%' }}>
                    <StatusBar hidden />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={{ width: 300, height: 300 }}
                            source={require('../Animations/animation_500_kujfztxb.gif')}
                            resizeMode={FastImage.resizeMode.contain} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} >

                        <TouchableOpacity onPress={() => AddNewDevice('ESP32')} >
                            <View style={{ marginVertical: 15, borderRadius: 8, backgroundColor: 'rgba(255, 255, 255, .2)', height: 200, width: '96%', marginLeft: 'auto', marginRight: 'auto' }}>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => AddNewDevice('ESP8266')}>
                            <View style={{ marginVertical: 15, borderRadius: 8, backgroundColor: 'rgba(255, 255, 255, .2)', height: 200, width: '96%', marginLeft: 'auto', marginRight: 'auto' }}>

                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )
        }

        else if (this.state.deviceSelected && this.state.permissions) {
            return (
                <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#1c1c1c' }}>
                    <StatusBar hidden />
                    <FastImage
                        style={{ width: '100%', height: '60%' }}
                        source={require('../Animations/animation_500_kugbooul.gif')}
                        resizeMode={FastImage.resizeMode.contain} />
                    <Text style={{ color: 'rgba(255, 255, 255, .75)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
                        Connecting to Device...
                    </Text>
                </View>
            )
        }

        else if (!this.state.permissions && !this.state.Load) {
            return (
                <AppLoading />
            )
        }

        else if (this.state.Load && !this.state.permissions) {
            return (
                <View>
                    <Text>lixo</Text>
                </View>
            )
        }
    }
}