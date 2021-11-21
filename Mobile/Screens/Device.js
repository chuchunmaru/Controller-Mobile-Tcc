import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import MQTT from 'react-native-mqtt-angelos3lex';
import ApplicationError from '../Components/ApplicationError'
import Loading from '../Components/RequestLoading'
import LED_OFF from '../Assets/icons/LED_OFF.png'
import LED_GON from '../Assets/icons/LED_GON.png'
import LED_RON from '../Assets/icons/LED_RON.png'
import LED_YON from '../Assets/icons/LED_YON.png'
import RELAY_ON from '../Assets/icons/RELAY_ON.png'
import RELAY_OFF from '../Assets/icons/RELAY_OFF.png'
import BUZZER_ON from '../Assets/icons/BUZZER_ON.png'
import BUZZER_OFF from '../Assets/icons/BUZZER_OFF.png'
import SERVO from '../Assets/icons/SERVO.png'
import GLP from '../Assets/icons/GLP.png'

const width = Dimensions.get('screen').width

export default class Device extends React.Component {



  state = {
    Load: false,
    Status: false,
    RData: null
  }
  // gas/red/green/yellow/buzzer/relay/servo
  mqttClient = async (topic, message) => {
    const setData = (newData) => {
      var rdt = []

      rdt.push({ GLP: newData[0] })

      if (newData[1] == 0) {
        rdt.push({ LED_R: LED_OFF })
      }
      else {
        rdt.push({ LED_R: LED_RON })
      }

      if (newData[2] == 0) {
        rdt.push({ LED_G: LED_OFF })
      }
      else {
        rdt.push({ LED_G: LED_GON })
      }

      if (newData[3] == 0) {
        rdt.push({ LED_Y: LED_OFF })
      }
      else {
        rdt.push({ LED_Y: LED_YON })
      }

      if (newData[4] == 0) {
        rdt.push({ BUZZER: BUZZER_OFF })
      }
      else {
        rdt.push({ BUZZER: BUZZER_ON })
      }

      if (newData[5] == 0) {
        rdt.push({ RELAY: RELAY_ON })
      }
      else {
        rdt.push({ RELAY: RELAY_OFF })
      }
      rdt.push({ SERVO: newData[6] })

      setTimeout(() => {
        this.setState({
          Load: true,
          RData: rdt
        })
      }, 1500)

    }
    MQTT.createClient({
      uri: 'mqtt://broker.hivemq.com:1883',
      clientId: 'glk_s_dev',

    }).then(function (client) {

      client.on('message', function (msg) {
        if (msg.data.match('STATUS')) {
          setData(msg.data.replace(/STATUS/gi, "").split('|'))
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

  async _getStatus() {
    this.mqttClient(this.props.route.params.device.topic, 'status')
    setTimeout(() => {
      this._getStatus()
    }, 20000)
  }


  componentDidMount() {
    console.log(this.props.route.params.device)
    this._getStatus()
  }

  render() {
    if (!this.state.Load) {
      return (
        <Loading />
      )
    }
    else if (this.state.Load) {
      return (
        <View>
          <View style={{ backgroundColor: 'ghostwhite' }}>
            <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>{this.props.route.params.device.name}</Text>
          </View>
          <ScrollView style={{ height: '100%', width: '100%', backgroundColor: 'ghostwhite', paddingTop: 10 }}>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={GLP} style={{ height: 175, width: 150, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Gas Measurement</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{this.state.RData[0]['GLP']}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={SERVO} style={{ height: 145, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Servo Position</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{`${this.state.RData[6]['SERVO']}°`}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={this.state.RData[5]['RELAY']} style={{ height: 145, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Relay State</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{(this.state.RData[5]['RELAY'] == RELAY_ON) ? 'ON' : 'OFF'}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={this.state.RData[4]['BUZZER']} style={{ height: 140, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Buzzer State</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{(this.state.RData[4]['BUZZER'] == BUZZER_ON) ? 'ON' : 'OFF'}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={this.state.RData[2]['LED_G']} style={{ height: 145, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Green Led</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{(this.state.RData[2]['LED_G'] == LED_GON) ? 'ON' : 'OFF'}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={this.state.RData[3]['LED_Y']} style={{ height: 145, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Yellow Led</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{(this.state.RData[3]['LED_Y'] == LED_YON) ? 'ON' : 'OFF'}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', width: '95%', height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 8, borderWidth: .7, borderColor: 'rgba(0,0,0,.55)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
              <View style={{ width: 150, paddingHorizontal: 2.5 }}>
                <Image source={this.state.RData[1]['LED_R']} style={{ height: 145, width: 140, }} />
              </View>
              <View style={{ height: '90%', borderColor: 'rgba(0,0,0, .8)', borderLeftWidth: 1, marginHorizontal: 5 }} />
              <View style={{ width: width - 200, height: 190, backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,0,.45)', fontSize: 30, fontFamily: 'Quicksand-Regular', justifyContent: 'center', textAlign: 'center' }}>Red Led</Text>
                <View style={{ width: 150, height: 100, backgroundColor: 'rgba(70,130,180, .5)', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>{(this.state.RData[1]['LED_R'] == LED_RON) ? 'ON' : 'OFF'}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 15 }} />
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <ApplicationError />
      )
    }
  }
}
