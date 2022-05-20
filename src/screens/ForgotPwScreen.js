import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  Button,
} from "@99xt/first-born";
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPwScreen = ({ navigation }) => {

  const [eamil, setEmail] = useState('');

  const resetHandle = (userEmail) => {

    if (userEmail.length === 0 ) {
      Alert.alert('Wrong Input!', 'Email field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }
    Alert.alert('Request submitted!', "Check your email for next steps.", [{text: 'Okay', onPress: navigation.navigate("SplashScreen")}])
  };

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#0165ff' barStyle="light-content" />
    <View style={styles.header}>
      <Icon size={40} color="grey" name="unlock-alt" />
      <Text style={styles.title}>Password Reset</Text>

    </View>
    <View style={{ paddingHorizontal: 20 }}>
      <Input
        iconPosition="right"
        placeholder="eamil"
        onChangeText={(val) => setEmail(val)}
        style={{ backgroundColor: '#f1f3f2', paddingLeft: 15}}
      />
      <View style={{alignItems: 'center'}}>
      <Button
        block
        color="#0165ff"
        onPress={() => {
          resetHandle(eamil)
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
      <Text style={[ styles.actionTxt, {color: "#0165ff"}]}>Go to login</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default ForgotPwScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    alignItems: 'center',
  },
  actionTxt: {
    fontSize: 14, fontWeight: 'bold'
  }
});

