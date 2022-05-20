import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Card } from 'native-base'
import appStyles from '../../styles/app-style';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Button, FormInput, Text } from "@99xt/first-born";
import { AuthContext } from "../../components/context";
import colors from '../../assets/theme/colors';
import { DEFAULT_IMAGE_URI } from '../../constants/general';


const PersonalScreen = (navigation) => {

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  // const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
  });

  const getUser = () => {
    AsyncStorage.getItem('user')
      .then(user => {
        // console.log(user);

        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);

          setLoading(false)
          setEmail(usr.user_data.email)
          setPhone(usr.user_data.phone_number)
          setUserName(usr.user_data.username)
          setFirstName(usr.user_data.first_name)
          setLastName(usr.user_data.last_name)
          setLocation(usr.user_data.location)

        }
      })
      .catch(err => console.log(err));
  }

  const onLogout = () => {
    signOut()
  }
  // render() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 30, alignSelf: 'center' }}>Recommended Settings</Text>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> Profile </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> Notifications </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 30, alignSelf: 'center' }}>Payment Settings</Text>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> Manage Payment Options </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> Gift Cards </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 30, alignSelf: 'center' }}>Account</Text>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> User Agreement </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10}}>
          <Text style={mailStyles.headerText}> Account Management </Text>
          <Icon2 name="angle-right" color="black" size={15} style={{ paddingTop: 5 }} />
        </View>
      </View>
    </View>
  );
  // }

}

export default PersonalScreen;

const mailStyles = StyleSheet.create({
  headerText:{
    // alignSelf: 'center'
  },
  header: {
    // backgroundColor: '#F5FCFF',
    padding: 10,
    flexDirection: 'row'
  }, active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: '#017eff',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  poweredBy: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  powerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  powerColumn: {
    textAlign: 'center',
  },
  powerNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    alignContent: 'center'
  },
  buttonTouchable: {
    padding: 16,
    marginBottom: 40,
  },
});

const sepStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },
});

const telStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: '#017eff',
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  powerColumn: {}
});
