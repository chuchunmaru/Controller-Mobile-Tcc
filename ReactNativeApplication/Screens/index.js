import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from '../Core/DrawerContent'
import Home from './Home'
import Device from './Device'
import Settings from './Settings'
import Software from './Software'
import Support from './Support'
import DeviceManager from './DeviceManager'
import CheckConfig from './CheckConfig'

const Drawer = createDrawerNavigator()

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
          <Drawer.Screen name="CheckConfig" component={CheckConfig} />
          <Drawer.Screen name="DeviceManager" component={DeviceManager} />
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Device" component={Device} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Software" component={Software} />
          <Drawer.Screen name="Support" component={Support} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
