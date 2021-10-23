import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, BackHandler } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from 'react-native-simple-toast'
import { styles } from '../Core/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Settings extends React.Component {

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }



  render() {
    return (
      <ScrollView style={styles.viewContainer}>
      </ScrollView>
    )
  }
}
