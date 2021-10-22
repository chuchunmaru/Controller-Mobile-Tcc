import MQTT from 'react-native-mqtt-angelos3lex'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Wifi from "react-native-iot-wifi"


export const AddNewDevice = async (device) => {

    Wifi.getSSID((SSID) => {
        DeviceConfig(`CHUCHUNMARU:${device}:${SSID}`, device, 'ConfigString')
    })
}

const RecordDevice = async (topic, device, url) => {
    var counterDevices
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 50; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    try {
        try {
            counterDevices = await AsyncStorage.getItem(`@Counter:${device}`)

            if (counterDevices == null) {
                counterDevices = 1
            }
        }
        catch (e) {
            console.log(e)
        }

        DeviceConfig(topic, device, `newTopic::${stringAleatoria}`)

        await AsyncStorage.setItem(`@${device}:${parseInt(counterDevices)}`, url)
        await AsyncStorage.setItem(`@${device}:${parseInt(counterDevices)}:topic`, stringAleatoria)

        for (let i = 0; i < counterDevices; i++) {
            console.log(`\n${device} ${i}: \nTopic: ${await AsyncStorage.getItem(`@${device}:${parseInt(counterDevices)}:topic`)}\n` + await AsyncStorage.getItem(`@${device}:${parseInt(counterDevices)}`))
        }

    }
    catch (e) {
        console.log(e)
    }

    await AsyncStorage.setItem(`@Counter:${device}`, JSON.stringify((parseInt(counterDevices) + 1)))

}

const DeviceConfig = async (topic, device, message) => {

    MQTT.createClient({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: 'chuchunmaru:)'
    }).then(function (client) {

        client.on('closed', function () {
            console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
            console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {

            console.log(msg)

            if (msg.data.match('URLCONFIG:')) {
                RecordDevice(topic, device, msg.data.replace(/URLCONFIG:/i, 'http://'))
            }


        });

        client.on('connect', function () {
            console.log('connected');
            client.subscribe(topic, 0);
            client.publish(topic, message, 0, false);
        });

        client.connect();
    }).catch(function (err) {
        console.log(err);
    });

}