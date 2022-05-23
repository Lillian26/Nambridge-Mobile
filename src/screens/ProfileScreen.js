import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Card } from 'native-base'
// import appStyles from '../styles/app-style';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Button, FormInput, Text } from "@99xt/first-born";
import { AuthContext } from "../components/context";
import colors from '../assets/theme/colors';
import { DEFAULT_IMAGE_URI } from '../constants/general';


const PersonalScreen = (navigation) => {

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  // const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [nin, setNin] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
  }, [userName, email, nin, userId]);

  const getUser = async () => {
    await AsyncStorage.getItem('user')
      .then(user => {
        // console.log(user);

        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          // console.log(usr[0].email)

          setLoading(false)
          setUserName(usr[0].username)
          setEmail(usr[0].email)
          setNin(usr[0].nin)

          //use userId to fetch/update legal certificate
          setUserId(usr[0].userId)

        }
      })
      .catch(err => console.log(err));
  }

  const onLogout = () => {
    signOut()
  }
  // render() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 }}>
      <View style={{ flex: 2 }}>
        <Text style={styles.sectionTitle}>User Account</Text>
        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Name:</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View style={[styles.inputView, { paddingTop: 20 }]}>
          <Text style={styles.cardTitle}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}>
          </TextInput>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.sectionTitle}>Profile Details</Text>
        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Nin Number:</Text>
          <TextInput
            value={nin}
            onChangeText={setNin}
            style={styles.textInput2}>
          </TextInput>
        </View>
        <View style={[styles.inputView, { paddingTop: 20 }]}>
          <Text style={styles.cardTitle}>Upload documents:</Text>
          <TextInput

            style={styles.textInput2}>
          </TextInput>
        </View>
      </View>
      <View style={{ flex: 1}}>

        <TouchableOpacity onPress={() => { alert('saved!') }} style={[{ backgroundColor: colors.button }, styles.buttons]}>
          <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Update`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  // }

}

export default PersonalScreen;

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingTop: 30, alignSelf: 'center' },
  cardTitle: {
    paddingLeft: 10,
    fontSize: 17,
  },
  textInput: {
    marginHorizontal: 10,
    fontSize: 17,
    borderColor: 'rgba(118,121,116, .3)',
    borderBottomWidth: .3,
    borderRadius: 1,
    color: '#333333',
    paddingBottom: 2
  },
  separator: {
    borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
    borderColor: colors.button, marginBottom: 10,
  },
  textInput2: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 17,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    paddingBottom: 2,
    color: '#333333'
  },
  buttons: {
    paddingVertical: 12,
    borderRadius: 50,
    width: 130,
  },
});
