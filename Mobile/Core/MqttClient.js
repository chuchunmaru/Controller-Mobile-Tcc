import MQTT from 'react-native-mqtt-angelos3lex'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Wifi from "react-native-iot-wifi"


export const AddNewDevice = async (device) => {

    Wifi.getSSID((SSID) => {
        DeviceConfig(`Chuchunmaru:${device}:${SSID}`, device, 'ConfigString')
    })
}

const RecordDevice = async (topic, device, url) => {
    var counterDevices = ''
    var randomString = ''
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 50; i++) {
        randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
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

        DeviceConfig(topic, device, `setTopic::${randomString}`)

        await AsyncStorage.setItem(`@${device}:${parseInt(counterDevices)}:url`, url)
        await AsyncStorage.setItem(`@${device}:${parseInt(counterDevices)}:topic`, randomString)

        for (let i = 0; i < counterDevices; i++) {
            console.log(`\nDevice: ${device}\nN°: ${i}\nTopic:${await AsyncStorage.getItem(`@${device}:${i}:topic`)}\nUrl: ${await AsyncStorage.getItem(`@${device}:${i}:url`)}`)
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

        client.on('message', function (msg) {

            console.log(msg)

            if (msg.data.match('serverUrl:')) {
                RecordDevice(topic, device, msg.data.replace(/serverUrl:/i, 'http://'))
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