import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import { AuthContext } from '../components/context';

import Users from '../model/users';
import { Button, Text } from "@99xt/first-born";
import Input from '../components/Input';
const SignInScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = (userName, password) => {

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
      <StatusBar backgroundColor='#0165ff' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={[styles.subTitle]}>Please login here</Text>

      </View>
      <View style={{ flex: 2, paddingHorizontal: 20, marginTop: 10 }}>
        <Input
          iconPosition="right"
          placeholder="Username"
          onChangeText={(val) => setUsername(val)}
          style={styles.inputField}
        />

        <Input
          placeholder="Password"
          secureTextEntry={isSecureEntry}
          style={styles.inputField}
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
      </View>
      <View style={styles.button}>
        <Button
          block
          color="#0165ff"
          onPress={() => {
            loginHandle(username, password)
          }}
          style={{height: 50}}
        >
          <Text style={{fontWeight: 'bold', padding: 3}}>{'SIGN IN'}</Text>
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPwScreen')} style={{alignItems: 'flex-end'}}>
          <Text style={[ styles.actionTxt,{ marginTop: 5, paddingVertical: 20}]}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#0165ff'
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
    color: '#fff'
  },
  inputField: { backgroundColor: '#f1f3f2', paddingLeft: 15},
  button: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  actionTxt: {
    color: "grey", fontSize: 14, fontWeight: 'bold'
  }
});
