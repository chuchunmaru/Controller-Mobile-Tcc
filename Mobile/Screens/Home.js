import React from 'react'
import { ScrollView, StatusBar, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from '../Components/AppLoading'


export default class Home extends React.Component {

  state = {
    load: false
  }

  devices = []

  getDevices = async () => {
    try {
      var counter = ''
      counter = await AsyncStorage.getItem(`@counter`)
      if (!counter) {
        counter = 0
      }
      else {
        counter = parseInt(counter)
      }
      for (let i = 0; i < counter; i++) {
        this.devices.push({ topic: await AsyncStorage.getItem(`@${i}:topic`), id: await AsyncStorage.getItem(`@${i}:id`), name: await AsyncStorage.getItem(`@${i}:name`), description: await AsyncStorage.getItem(`@${i}:description`) })
      }
      this.setState({
        load: true
      })
      console.log(this.devices)
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.getDevices()
  }

  
  render() {
    if (!this.state.load) {
      return (
        <AppLoading />
      )
    }
    else if (this.state.load) {
      return (
        <View style={{ height: '100%', width: '100%', padding: 10, backgroundColor: 'ghostwhite' }}>
          <StatusBar hidden />
          <View style={{ height: 50, width: '99.4%', backgroundColor: 'rgba(255,127,80, .8)', marginVertical: 2, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginBottom: 20 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Text style={{ fontSize: 30, textAlign: 'center', color: 'ghostwhite', width: '100%' }}>
                Devices
              </Text>
            </View>
          </View>
          <View style={{ width: '99%', height: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <SafeAreaView>
              <FlatList style={{ marginBottom: 80, marginTop: 10 }}
                data={this.devices}
                renderItem={({ item }) =>
                  <ScrollView>
                    <View>
                      <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0, .75)', marginTop: 5 }} />
                      <Collapse>
                        <CollapseHeader style={{ justifyContent: 'center', alignItems: 'center', }}>
                          <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 50, flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(0,250,154, .4)', borderRadius: 4, height: 40, alignItems: 'center', justifyContent: 'center', width: '98%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,5, .6)', fontSize: 25, fontFamily: 'Quicksand-Regular' }}>
                                Device: <Text style={{ fontSize: 20 }}>{item.name}</Text>
                              </Text>
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                Name
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                {item.name}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                Description
                              </Text>
                            </View>
                            <View style={{ width: '58%', minHeight: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                {item.description}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                Topic
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 50, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18, fontFamily: 'Quicksand-Regular', marginBottom: 5 }}>
                                {item.topic}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                Id
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18, fontFamily: 'Quicksand-Regular' }}>
                                {item.id}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Device', { device: item })}>
                            <View style={{ backgroundColor: 'rgba(255,165,0, .5)', width: '98%', height: 40, marginVertical: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: 'rgba(255,255,255,.79)', fontSize: 22, fontFamily: 'Montserrat-Regular' }}>
                                Open Device Panel
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </CollapseBody>
                      </Collapse>
                      <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0, .75)', marginBottom: 7.5, }} />
                    </View>
                  </ScrollView>
                }
                keyExtractor={(item, index) => index.toString()} />
            </SafeAreaView>
          </View>
        </View>
      )
    }
  }
}