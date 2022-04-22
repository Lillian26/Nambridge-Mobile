import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  Button,
  FormInput,
} from "@99xt/first-born";
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPwScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    isValidUser: true,
  });


  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const loginHandle = (userName) => {

    if (userName.length === 0 ) {
      Alert.alert('Wrong Input!', 'Username field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }
    Alert.alert('Request submitted', "", [{text: 'Okay'}])
  };

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#258c9b' barStyle="light-content" />
    <View style={styles.header}>
      <Icon size={40} color="grey" name="unlock-alt" />
      <Text style={styles.title}>Password Reset</Text>

    </View>
    {/* <ScrollView> */}
    {/* <View style={styles.form}> */}
    <View style={{ paddingHorizontal: 20 }}>
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
      <View style={{alignItems: 'center'}}>
      <Button
        block
        color="#258c9b"
        onPress={() => {
          loginHandle(username)
        }}
        style={{height: 50}}
      >
        <Text style={{fontWeight: 'bold', padding: 3}}>{'RESET'}</Text>
      </Button>
      </View>
    </View>
    <View style={styles.button}>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={{alignItems: 'center', flexDirection: 'row'}}>
      <Text style={[ styles.actionTxt, {color: "grey"}]}>Remeber your password? </Text>
      <Text style={[ styles.actionTxt, {color: "#258c9b"}]}>Go to login</Text>
      </TouchableOpacity>

    </View>
    {/* </View> */}
    {/* </ScrollView> */}
  </View>
  );
};

export default ForgotPwScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#268d9c'
    justifyContent: 'space-between',
    paddingVertical: 40
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: '600',
    color: 'grey'
  },

  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 30,
    // fontWeight: '500',
    color: '#fff'
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
    alignItems: 'center',
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
    fontSize: 14, fontWeight: 'bold'
  }
});

