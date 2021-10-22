import React from 'react';
import { View, Text, ScrollView, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Core/Styles'
import NetWorkError from '../Components/NetWorkError'
import ApplicationError from '../Components/ApplicationError'
import { devInfo } from '../Core/DevInfo'
import Loader from '../Components/RequestLoading'
import Icon from 'react-native-vector-icons/FontAwesome'

var SoftwareInfo = null

export default class Software extends React.Component {
  _isMounted = false

  state = {
    Load: false,
    RequestSucess: false,
    DeviceIcon: ''
  }

  async _EspServerRequest() {
    try {
      var Url = await AsyncStorage.getItem('@espServerUrl')
      try {
        SoftwareInfo = await (await fetch(Url)).json()
        this.setState({ RequestSucess: true })
      } catch (e) {
        (e == 'TypeError: Network request failed') ? this.setState({ RequestError: true }) : this.setState({ RequestError: false })
        this.setState({ Error: true })
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
    SoftwareInfo = null
    this._isMounted = false
    this.setState({
      RequestSucess: false,
      Load: false
    })
  }



  render() {
    if (this.state.Load && this.state.RequestSucess) {
      return (
        <View style={{ height: '100%', width: '100%', paddingHorizontal: 6, backgroundColor:'#1c1c1c' }}>
          <ScrollView>
            <View style={styles.ListTitleView}>
              <Text style={styles.ListTitleText}>Esp Code</Text>
            </View>
            <View>
              <View>
                <Text style={styles.ListItemTextKey}>Sketch Size: <Text style={styles.ListItemTextValue}>{SoftwareInfo['sketchsize']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Free Sketch Size: <Text style={styles.ListItemTextValue}>{SoftwareInfo['freesketchsize']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Sketch MD5:
                  <Text style={styles.ListItemTextValue}> {SoftwareInfo['sketchmd5']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>SDK Version:
                  <Text style={styles.ListItemTextValue}> {SoftwareInfo['sdkversion']}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Arduino Ide Version:
                  <Text style={styles.ListItemTextValue}> 1.8.15</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Language:
                  <Text style={styles.ListItemTextValue}> C</Text></Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Icon name={'code'} size={100} />
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor:'black', borderRadius: 10 }}>
              <Text style={{ fontSize: 40, fontFamily: 'Montserrat-ExtraLight', color: 'white' }}>Mobile Application</Text>
            </View>
            <View>
              <View>
                <Text style={styles.ListItemTextKey}>Application Name:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.name}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Version:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.version}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Platforms:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.platform}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Developer:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.developer}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>React Native Version:
                  <Text style={styles.ListItemTextValue}> 0.65.1</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>React Native Cli:
                  <Text style={styles.ListItemTextValue}> 2.0.1</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Language:
                  <Text style={styles.ListItemTextValue}> JavaScript</Text></Text>
              </View>
              <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                  <Icon name={'apple'} size={100} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                  <Icon name={'android'} size={100} />
                </View>
              </View>
            </View>
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor:'black', borderRadius: 10 }}>
                <Text style={{ fontSize: 40, fontFamily: 'Montserrat-ExtraLight', color:'white' }}>This Device</Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Device OS:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.deviceos}</Text></Text>
              </View>
              <View>
                <Text style={styles.ListItemTextKey}>Device OS Version:
                  <Text style={styles.ListItemTextValue}> {devInfo.Software.osversion}</Text></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, marginBottom: 10 }}>
              <View>
                <View style={{ padding: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center' }}>
                  <Icon name={'github-alt'} size={100} onPress={() => Linking.openURL(devInfo.Software.devgit)} />
                </View>
                <View>
                  <Text style={{ color:'white', fontFamily: 'InterExtraLight', textAlign: 'center', fontSize: 20 }}>Developer GitHub</Text>
                </View>
              </View>
              <View>
                <View style={{ padding: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center' }}>
                  <Icon name={'github'} size={100} onPress={() => Linking.openURL(devInfo.Software.repository)} />
                </View>
                <View>
                  <Text style={{ color:'white', fontFamily: 'InterExtraLight', textAlign: 'center', fontSize: 20 }}>Project Repository</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    }
    else if (!this.state.Load) {
      return (
        <Loader />
      )
    }
    else if (!this.state.RequestSucess) {
      return (
        <NetWorkError />
      )
    }

    else {
      return (
        <ApplicationError />
      )
    }
  }
}
