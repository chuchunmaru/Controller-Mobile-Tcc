import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '../Core/Styles'
import Icon from 'react-native-vector-icons/EvilIcons'
import { setColor } from '../Core/SetColor'
import ApplicationError from '../Components/ApplicationError'



export default class Home extends React.Component {

  state = {

  }

  showDevices = async () => {
    try {
      var counter = ''
      counter = await AsyncStorage.getItem(`@counter`)
      if (!counter) {
        counter = 0
      }
      else {
        counter = parseInt(counter)
      }

      console.log(counter)
      for (let i = 0; i < counter ; i++) {
        console.log(`${await AsyncStorage.getItem(`@${i}:topic`)}\n${await AsyncStorage.getItem(`@${i}:name`)}\n${await AsyncStorage.getItem(`@${i}:id`)}\n${await AsyncStorage.getItem(`@${i}:description`)} \n${await AsyncStorage.getItem(`@counter`)}`)
      }

    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.showDevices()
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.viewContainer}>
      </View>
    )
  }
}