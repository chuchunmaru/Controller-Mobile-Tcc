import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Core/Styles'
import Icon from 'react-native-vector-icons/EvilIcons'
import { setColor } from '../Core/SetColor';
import ApplicationError from '../Components/ApplicationError';



export default class Home extends React.Component {

  _isMounted = false

  state = {
    
  }

async aser () {
  for (let i = 0; i < 2; i++) {
    console.log(`\nDevice: Esp32\nN°: ${i}\nTopic:${await AsyncStorage.getItem(`@${i}:topic`)}\n)}`)
}
}

  componentDidMount() {
    this._isMounted = true
    this.aser()
  }

  componentWillUnmount() {
    this._isMounted = false

  }

  render() {
    return (
      <View style={styles.viewContainer}>
      </View>
    )
  }
}