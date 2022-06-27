import { StyleSheet } from "react-native";
import actuatedNormalize from "../helpers/actuatedNormalize";

export const pickerStyle = {
  inputIOS: {
    color: '#333',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  action3: {
    paddingTop: 5,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inputAndroid: {
    color: '#333',
    fontSize: 16,
  },
  placeholderColor: 'grey',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
export const styles = StyleSheet.create({
  textInputEdit: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    paddingBottom: 5,
    color: '#333333'
  },
  textInput: {
    marginHorizontal: 10,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    paddingBottom: 0,
    color: '#333333',
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontSize: actuatedNormalize(17),
    paddingTop: actuatedNormalize(20)
  },
  action4: {
    paddingTop: actuatedNormalize(5),
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  cardTitleEdit: {
    color: "#333333",
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardTitle: {
    color: "grey",
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textSign: {
    fontWeight: 'bold',
  },
  buttons: {
    paddingVertical: 12,
    borderRadius: 50,
    width: 130,
  },
  button2: {
    paddingVertical: 10,
    borderRadius: 50,
    width: 130,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  pickerEdit: {
    // marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    // paddingBottom: 5,
    marginBottom: 5,
    color: '#333333'
  },
  picker: {
    marginHorizontal: 10,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    paddingBottom: 0,
    color: '#333333',
  },
  action3: {
    borderBottomColor: 'rgba(118,121,116, .2)',
    borderBottomWidth: .5,
    paddingBottom: 5,
    marginHorizontal: 10
},
});