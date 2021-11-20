import { StyleSheet } from "react-native"
import { color } from "react-native-reanimated"

export const styles = StyleSheet.create({

  DrawerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    paddingLeft: 10,
  },

  TitleView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 20
  },

  bottomDrawerSection: {
    minHeight: 500,
    justifyContent: 'space-between'
  },

  horizontalLine: {
    borderBottomColor: 'rgba(0, 20, 100, .2)',
    borderBottomWidth: 1,
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  viewContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },

  InputTextUrl: {
    color: 'rgba(0, 0, 0, .9)',
    backgroundColor: 'rgba(0, 0, 0, .125)',
    width: '85%',
    marginLeft: 'auto',
    borderRadius: 8,
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
  },

  TouchSetUrl: {
    backgroundColor: 'rgba(0 ,0 ,0, .1)',
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginTop: 50,
    borderRadius: 8,

  },

  InputCamp: {
    marginTop: '20%',
    width: '98%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .5)',
    paddingVertical: 5,
    paddingEnd: 0,
    borderRadius: 8
  },

  InputIcon: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  InputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  InputContainerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '15%'
  },

  TouchSetUrlText: {
    color: 'rgba(0, 0, 0, .5)',
    fontSize: 25,
    fontFamily: 'InterExtraLight'
  },

  InputView: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },

  ListTitleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor:'black',
    paddingBottom: 8,
    borderRadius: 9
  },

  ListTitleText: {
    fontSize: 40,
    fontFamily: 'Baskervville-Regular',
    color: 'white'
  },

  ListItemTextKey: {
    fontSize: 20,
    fontFamily: 'Quicksand-Light',
    color:'white',

  },

  ListItemTextValue: {
    fontSize: 16, 
    fontFamily: 'Quicksand-Light' ,
    color:'white'
  }


})