import React from "react"
import AppLoading from "../Components/AppLoading"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class CheckConfig extends React.Component {

    state = {
        haveDevice: false,
        Error: false,
    }

    async haveDevice() {
        try {
            const Config = await AsyncStorage.getItem('@countter')
            if (Config != null) {
                this.props.navigation.navigate('Home')
            }
            else {
                this.props.navigation.navigate('DeviceManager')
            }
        } catch (e) {
            console.log(e)
            this.setState({
                Error: true
            })
        }
    }

    componentDidMount() {
        this.haveDevice()
    }


    render() {
        return (
            <AppLoading />
        )
    }
}