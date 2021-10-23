import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import { styles } from '../Core/Styles'
import Icon from 'react-native-vector-icons/EvilIcons'
import { setColor } from '../Core/SetColor';
import ApplicationError from '../Components/ApplicationError';



export default class Home extends React.Component {

  _isMounted = false

  state = {
    
  }

  componentDidMount() {
    this._isMounted = true
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