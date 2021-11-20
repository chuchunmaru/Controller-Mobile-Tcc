import React from 'react';
import { View, Text, ScrollView } from 'react-native'
import { styles } from '../Core/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetWorkError from '../Components/NetWorkError'
import ApplicationError from '../Components/ApplicationError'
import Loading from '../Components/RequestLoading'
import Icon from 'react-native-vector-icons/FontAwesome5'
var EspDeviceInfo = null

export default class Device extends React.Component {

  _isMounted = false

  state = {
    Load: false,
    RequestSucess: false,
    Error: false,
    RequestError: false,
  }

  async _EspServerRequest() {
    try {
      const Url = await AsyncStorage.getItem('@espServerUrl')
      try {
        EspDeviceInfo = await (await fetch(Url)).json()
        this.setState({ RequestSucess: true })
      } catch (e) {
        (e == 'TypeError: Network request failed') ? this.setState({ RequestError: true }) : this.setState({ Error: true })

      }
    } catch (e) {
      console.log(e)
      this.setState({ Error: true })
    }
    setTimeout(() => this.setState({ Load: true }), 2500)
  }

  componentDidMount() {
    this._EspServerRequest()
    this._isMounted = true
  }

  componentWillUnmount() {
    EspDeviceInfo = null
    this._isMounted = false
    this.setState({
      RequestSucess: false,
      Load: false,
      Error: false
    })
  }



  render() {
    if (this.state.RequestError) {
      return (
        <NetWorkError />
      )
    }
    else if (this.state.Load && this.state.RequestSucess) {
      return (
        <View style={{ height: '100%', width: '100%', paddingHorizontal: 6, backgroundColor:'white' }}>
          <ScrollView>
            <View style={styles.ListTitleView}>
              <Text style={styles.ListTitleText}>Chip Informations</Text>
            </View>
            <View>
              <View>
                <Text style={styles.ListItemTextKey}>Model: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['chipmodel']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Cpu Frequency: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['cpufreq']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Cores: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['chipcores']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>ID: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['chipid']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Revision: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['chiprevision']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Cycle Count: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['cyclecount']}</Text></Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Icon name={'microchip'} size={100} />
              </View>
            </View>
            <View style={styles.ListTitleView}>
              <Text style={styles.ListTitleText}>Memory</Text>
            </View>
            <View>
              <View>
                <Text style={styles.ListItemTextKey}>Flash Chip Size: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['flashchipsize']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Flash Chip Speed: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['flashchipspeed']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Flash Chip Mode: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['flashchipmode']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Heap Size: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['heapsize']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Free Heap: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['freeheap']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Min Free Heap: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['minfreeheap']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Max Alloc Heap: <Text style={styles.ListItemTextValue}>{EspDeviceInfo['maxallocheap']}</Text></Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Icon name={'memory'} size={100} />
              </View>
            </View>
          </ScrollView>
        </View>
      )
    }
    else if (!this.state.Load) {
      return (
        <Loading />
      )
    }
    else {
      return (
        <ApplicationError />
      )
    }
  }
}
