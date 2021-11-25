import React from 'react'
import { PermissionsAndroid, View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Home from './Home'
import Device from './Device'
import Settings from './Settings'
import Software from './Software'
import Support from './Support'
import AppLoading from "../Components/AppLoading"
import MQTT from 'react-native-mqtt-angelos3lex'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Wifi from "react-native-iot-wifi"
import SimpleToast from 'react-native-simple-toast'

const Stack = createStackNavigator()

export default class App extends React.Component {

  state = {
    load: false,
    drawer: false,
    deviceMan: false,
    permissions: false,
    details: false,
    placeholderalign: 'center',
    placeholderText: 'Dashboard Description (opcional)',
    deviceName: '',
    deviceId: '',
    description: '',
    newTopic: '',
    ssid: null,
  }

  randomString = () => {
    var rstr = ''
    for (let i = 0; i < 6; i++) {
      rstr += ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').charAt(Math.floor(Math.random() * 52))
    }
    return `${rstr}${this.state.ssid}`
  }


  recordDevice = async (topic, name, description, id) => {
    if (name != '') {
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

        await AsyncStorage.multiSet([[`@${counter}:topic`, topic], [`@${counter}:name`, name], [`@${counter}:id`, id], [`@${counter}:description`, description], [`@counter`, JSON.stringify((counter + 1))]])

        for (let i = 0; i < (counter + 1); i++) {
          console.log(`${await AsyncStorage.getItem(`@${i}:topic`)}\n${await AsyncStorage.getItem(`@${i}:name`)}\n${await AsyncStorage.getItem(`@${i}:id`)}\n${await AsyncStorage.getItem(`@${i}:description`)} \n${await AsyncStorage.getItem(`@counter`)}`)
        }
        
        this.setState({
          deviceMan: false,
          drawer: true,
          details: false,
        })

      } catch (e) {
        console.log(e)
      }
    }
    else {
      SimpleToast.show('O campo nome é obrigatorio')
    }
  }

  AddNewDevice = async () => {
    var topic = this.randomString()
    this.setState({ newTopic: topic })
    Wifi.getSSID((SSID) => {
      this.DeviceConfig(`glksdev${SSID}`, `setTopic@${topic}`)
    })

  }


  DeviceConfig = async (topic, message) => {
    var cfgn = (nvalue) => { this.setState({ details: true, deviceMan: false, newTopic: nvalue }) }
    MQTT.createClient({
      uri: 'mqtt://broker.hivemq.com:1883',
      clientId: 'glksdev',

    }).then(function (client) {

      client.on('message', function (msg) {
        console.log(msg)
        if (msg.data.match('newTopic')) {
          cfgn(msg.data.replace(/newTopic/gi, ""))
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


  async haveDevice() {
    Wifi.getSSID((SSID) => {
      this.setState({ ssid: SSID })
    })
    try {
      const Config = await AsyncStorage.getItem('@counter')
      if (Config != null) {
        this.setState({
          drawer: true,
          load: true
        })
      }
      else {
        this.setState({
          deviceMan: true
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({
        Error: true
      })
    }
  }

  grantedPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissions: true,
        })
        var counter = ''
        counter = await AsyncStorage.getItem(`@counter`)
        if (!counter) {
          counter = 0
        }
        else {
          counter = parseInt(counter)
        }
        if (!counter) {
          this.AddNewDevice()
        }
      }
    } catch (e) {
      console.warn(e)
    }
    this.setState({
      load: true
    })


  }

  componentDidMount() {
    this.haveDevice()
    this.grantedPermissions()
  }

  render() {
    if (!this.state.load) {
      return (
        <AppLoading />
      )
    }
    else if (!this.state.permissions && this.state.load) {
      return (
        <View>
          <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'ghostwhite', padding: 10 }}>
            <StatusBar hidden />
            <FastImage
              style={{ width: '100%', height: '50%' }}
              source={require('../Animations/gpm.gif')}
              resizeMode={FastImage.resizeMode.contain} />
            <Text style={{ color: 'rgba(0, 0, 0, .55)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
              Please! Ensure the necessary permissions for the application to work
            </Text>
            <TouchableOpacity onPress={() => this.grantedPermissions()}>
              <View style={{ paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,.1)' }}>
                <Text style={{ color: 'rgba(0, 0, 0, .55)', marginVertical: 5, fontSize: 40, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
                  Allow
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    else if (this.state.load && this.state.permissions && !this.state.drawer && this.state.deviceMan) {
      return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'ghostwhite' }}>
          <StatusBar hidden />
          <FastImage
            style={{ width: '100%', height: '60%' }}
            source={require('../Animations/mascote.gif')}
            resizeMode={FastImage.resizeMode.contain} />
          <Text style={{ color: 'rgba(0, 0, 0, .55)', marginVertical: 25, fontSize: 30, textAlign: 'center', fontFamily: 'Baskervville-Regular' }}>
            Connecting to Device
          </Text>
        </View>
      )
    }

    else if (this.state.load && this.state.permissions && this.state.details && !this.state.deviceMan) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ height: '90%', width: '100%' }}>
            <StatusBar hidden />
            <View style={{ width: '100%', heigth: '90%' }}>
              <View style={{ height: 50, width: '100%', backgroundColor: 'rgba(25,25,112, .6)', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                <View style={{ width: '100%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 30, textAlign: 'center', color: 'ghostwhite' }}>
                    Config Device
                  </Text>
                </View>
              </View>
              <View style={{ height: '90%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                <View style={{ padding: 2, paddingBottom: 30, marginVertical: 0, height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                  <FastImage
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    source={require('../Animations/cfg.gif')}
                    resizeMode={FastImage.resizeMode.contain} />
                  <View style={{ height: 50, width: '100%', backgroundColor: 'rgba(0,0,80, .45)', marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'center' }}>
                      <TextInput value={this.state.deviceName} onChangeText={text => this.setState({ deviceName: text })} placeholderTextColor={'rgba(255, 255, 255, .8)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={'\bDevice Name'} style={{ color: 'rgba(255, 255, 255, .8)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
                    </View>
                  </View>
                  <View style={{ height: 50, width: '100%', backgroundColor: 'rgba(0,0,80, .45)', marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'center' }}>
                      <TextInput value={this.state.deviceId} onChangeText={text => this.setState({ deviceId: text })} placeholderTextColor={'rgba(255, 255, 255, .8)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={'\bDevice Id (Opcional)'} style={{ color: 'rgba(255, 255, 255, .8)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
                    </View>
                  </View>
                  <View style={{ height: 200, width: '100%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'center' }}>
                      <TextInput maxLength={200} value={this.state.description} onChangeText={text => this.setState({ description: text })} placeholderTextColor={'rgba(255, 255, 255, .8)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={this.state.placeholderText} style={{ color: 'rgba(255, 255, 255, .8)', fontSize: 20, width: '100%', height: 200, backgroundColor: 'rgba(0,0,80, .45)', borderRadius: 4, flexDirection: 'row', textAlign: this.state.placeholderalign }} underlineColorAndroid={'rgba(0, 0, 0, 0)'} multiline />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ bottom: 0, width: '100%', marginBottom: 10 }}>
              <TouchableOpacity onPress={() => this.recordDevice(this.state.newTopic, this.state.deviceName, this.state.description, this.state.deviceId)}>
                <View style={{ height: 50, width: '90%', marginHorizontal: 30, marginLeft: 'auto', marginRight: 'auto', borderColor: 'rgba(0,0,0,.3)', borderWidth: .3, borderRadius: 4, justifyContent: 'center', backgroundColor: 'rgba(25,25,112, .6)', marginTop: 15 }}>
                  <Text style={{ textAlign: 'center', color: 'ghostwhite', fontSize: 25 }}>
                    Save Config
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }

    else if (this.state.load && this.state.drawer && !this.state.deviceMan && !this.state.details) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'scanner'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Device" component={Device} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Software" component={Software} />
            <Stack.Screen name="Support" component={Support} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    else {
      return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'ghostwhite' }}>
          <StatusBar hidden />
          <FastImage
            style={{ width: '100%', height: '60%' }}
            source={require('../Animations/mascote.gif')}
            resizeMode={FastImage.resizeMode.contain} />
        </View>
      )
    }
  }
}
