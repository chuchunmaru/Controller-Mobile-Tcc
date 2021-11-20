import React from 'react';
import { View, Text, StatusBar, PermissionsAndroid } from 'react-native'
import FastImage from 'react-native-fast-image'
import AppLoading from '../Components/AppLoading'
import MQTT from 'react-native-mqtt-angelos3lex'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Wifi from "react-native-iot-wifi"

const randomString = () => {
    var rstr = ''
    for (let i = 0; i < 50; i++) {
        rstr += ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').charAt(Math.floor(Math.random() * 61))
    }

    return rstr
}

export default class DeviceManager extends React.Component {

    state = {
        permissions: false,
        Load: false
    }

    randomString = () => {
        var rstr = ''
        for (let i = 0; i < 50; i++) {
            rstr += ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').charAt(Math.floor(Math.random() * 61))
        }
    
        return rstr
    }
    
    recordDevice = async (topic) => {
        var counter = ''
    
        try {
            try {
                counter = await AsyncStorage.getItem(`@counter`)
                if (!counter) {
                    counter = 0
                }
                else {
                    counter = parseInt(counter)
                }
    
            } catch (e) {
                console.log(e)
            }
    
            AsyncStorage.multiSet([[`@${counter}:topic`, topic], [`@counter`, JSON.stringify((counter + 1))]])
        } catch (e) {
            console.log(e)
        }
    }
    
    AddNewDevice = async () => {
        var topic = randomString()
        Wifi.getSSID((SSID) => {
            this.DeviceConfig(`Chuchunmaru:Esp32:${SSID}`, `setTopic::${topic}`)
        })
    
    }
    
    
    DeviceConfig = async (topic, message)=> {
        var recordDevice = this.recordDevice
        MQTT.createClient({
            uri: 'mqtt://broker.hivemq.com:1883',
            clientId: randomString(),
            
        }).then(function (client) {
    
            client.on('message', function (msg) {
                console.log(msg)
                if (msg.data.match('newTopic')) {
                    recordDevice(msg.data.replace(/newTopic/gi, ""))
                }
            })
    
            client.on('connect', function () {
                console.log('connected')
                client.subscribe(topic, 0)
                client.publish(topic, message, 0, false)
            })
    
            client.connect()
        }).catch(function (err) {
            console.log(err)
        })
    
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
                this.AddNewDevice()
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

        if (this.state.permissions) {
            return (
                <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'ghostwhite' }}>
                    <StatusBar hidden />
                    <FastImage
                        style={{ width: '100%', height: '60%' }}
                        source={require('../Animations/mascote.gif')}
                        resizeMode={FastImage.resizeMode.contain} />
                    <Text style={{ color: 'rgba(0, 0, 0, .55)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
                        Connecting to Device ...
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
                    <Text>Acesse as configurações do seu dispositivo e conceda as permissões necessarias !!!</Text>
                </View>
            )
        }
    }
}