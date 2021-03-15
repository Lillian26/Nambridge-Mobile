import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

// import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';
import grayColor from '../constants/Colors';

import Users from '../model/users';
import { FormInput, Button, Icon, Text } from "@99xt/first-born";
import Input from '../components/Input';
import colors from '../assets/theme/colors';
import { PositionExample } from "../components/PositionExample";
const SignInScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  // const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);


  const loginHandle = (userName, password) => {
    // alert('User: ' + userName + ' Pass: ' + password)

    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (username.length === 0 || password.length === 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' }
      ]);
      return;
    }
    signIn(foundUser);
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#258c9b' barStyle="light-content" />
      {/* <Animatable.Image
          animation="bounceIn"
          duraton="1800"
          source={require('../assets/logo.jpeg')}
          style={{ width: '30%', flex: 1, alignSelf: 'center'}}
          resizeMode="center"
        /> */}
      <View style={styles.header}>
        {/* <Animatable.Image
          animation="bounceIn"
          duraton="1800"
          source={require('../assets/logof.png')}
          style={{position: 'absolute', top: '30%', left: '15%', width: '25%'}}
          resizeMode="center"
        /> */}
        {/* <PositionExample/> */}
        <Text style={styles.title}>Welcome</Text>
        <Text style={[styles.subTitle]}>Please login here</Text>

      </View>
      {/* <ScrollView> */}
      {/* <View style={styles.form}> */}
      <View style={{ flex: 2, paddingHorizontal: 20, marginTop: 10 }}>
        <Input
          iconPosition="right"
          placeholder="Username"
          onChangeText={(val) => setUsername(val)}
          style={{ backgroundColor: '#f1f3f2', paddingLeft: 15}}
        />
        {data.isValidUser ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
        }

        <Input
          placeholder="Password"
          secureTextEntry={isSecureEntry}
          style={{ backgroundColor: '#f1f3f2', paddingLeft: 15}}
          icon={
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }} style={{backgroundColor: '#f1f3f2', paddingVertical: 10, paddingRight: 5}}>
              <Text style={{ fontSize: 14, paddingRight: 10 }}>{isSecureEntry ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          }
          iconPosition="right"
          onChangeText={(val) => setPassword(val)}
        />
        {data.isValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
        }
        <TouchableOpacity style={{alignItems: 'flex-end'}}>
          <Text style={[ styles.actionTxt,{ marginTop: 5}]}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Button
          block
          color="#258c9b"
          onPress={() => {
            loginHandle(username, password)
          }}
          style={{height: 50}}
        >
          {/* <Icon name="checkmark" /> */}
          <Text style={{fontWeight: 'bold', padding: 3}}>{'SIGN IN'}</Text>
        </Button>

        {/* <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{ color: '#fe4b34', marginTop: 15 }}>Create Account</Text>
          </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{paddingVertical: 20}}>
          <Text style={styles.actionTxt}>{`Don't have an Account? Create`}</Text>
        </TouchableOpacity>

      </View>
      {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#268d9c'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#258c9b'
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 30,
    fontWeight: '600',
    color: '#ffffff'
  },

  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 30,
    // fontWeight: '500',
    color: '#fff'
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 3,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    // marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    // paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    // fontSize: 14,
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  actionTxt: {
    color: "grey", fontSize: 14, fontWeight: 'bold'
  }
});
