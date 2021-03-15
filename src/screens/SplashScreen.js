import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {
  Text,
  Icon,
  Button,
} from "@99xt/first-born";
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#5b2c90' barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={[styles.title]}>Get The Word Out</Text>

      </View>
      <Animatable.View
        style={[styles.footer]}
        animation="fadeInUpBig"
      >

        <View style={styles.button}>
          <TouchableOpacity style={{}}>
            <Button
              rounded
              style={styles.button}
              color="#ec4143"
              onPress={() => navigation.navigate('SignInScreen')}
            >
              <Icon name="checkmark" />
              <Text style={styles.textSign}>Get Started</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b2c90'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 10
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    // color: 'white',
    fontWeight: 'bold'
  }
});

