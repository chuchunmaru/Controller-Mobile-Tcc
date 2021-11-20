import * as React from 'react'
import { View, StatusBar, BackHandler, ScrollView } from "react-native"
import { DrawerItem } from "@react-navigation/drawer"
import { Avatar, Title, Caption } from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './Styles'
import ProfilePhoto from '../Assets/icons/pp.jpeg'
export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
      <StatusBar hidden={true} barStyle="light-content" />
      <View style={styles.DrawerContainer}>
        <Avatar.Image source={ProfilePhoto} size={80} />
        <View style={styles.TitleView}>
          <Title style={{ fontSize: 16, marginTop: 3, fontWeight: "bold", color: 'black' }}>Chuchunmaru</Title>
          <Caption style={{ fontSize: 14, fontWeight: "200", lineHeight: 14, color: 'black' }}>Dev Solutions</Caption>
        </View>
      </View>
      <ScrollView>
        <View style={styles.bottomDrawerSection}>
          <View style={styles.horizontalLine} />
          <DrawerItem icon={({ color }) => (
            <Ionicons name={'ios-home'} size={35} color={'black'} />
          )}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Home"
            onPress={() => { props.navigation.navigate('Home') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={({ color }) => (
            <Ionicons name={'cog'} size={35} color={'black'} />)}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Settings"
            onPress={() => { props.navigation.navigate('Settings') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={({ color }) => (
            <Ionicons name={'ios-send'} size={35} color={'black'} />)}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Support"
            onPress={() => { props.navigation.navigate('Support') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={({ color }) => (
            <Icon name={'microchip'} size={35} color={'black'} />)}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Device"
            onPress={() => { props.navigation.navigate('Device') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={({ color }) => (
            <Ionicons name={'ios-code-slash'} size={35} color={'black'} />)}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Software"
            onPress={() => { props.navigation.navigate('Software') }} />
          <View style={styles.horizontalLine} />

        </View>
      </ScrollView>
      <View style={{ marginBottom: 10 }}>
        <DrawerItem icon={({ color }) => (
          <Ionicons name={'ios-exit'} size={35} color={'black'} />)}
          labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
          label="Exit"
          onPress={() => { BackHandler.exitApp() }} />
      </View>
    </View>
  )
}