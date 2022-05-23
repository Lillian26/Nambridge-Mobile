import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  Text,
  Button,
} from "@99xt/first-born";
import * as Animatable from 'react-native-animatable';
import actuatedNormalize from '../helpers/actuatedNormalize';
import grayColor from '../constants/Colors';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
      <View style={[styles.header, { flex: 2 }]}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logos1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.textSign, {color: '#0165ff', fontSize: 20, marginVertical: actuatedNormalize(15)}]}>NAMBRIDGE</Text>
        <Text style={[styles.title]}>Your company resource center, automate your registers!</Text>

      </View>
      <View style={[styles.footer, { flex: 1 }]}>
        <Animatable.View
          animation="slideInDown"
        >
          <View style={styles.button}>
            <Button
              color="#0165ff"
              onPress={() => navigation.navigate('SignInScreen')}
            >
              <Text style={styles.textSign}>Get Started</Text>
            </Button>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUpBig"
          duraton="1500"
        >
          <View style={styles.button}>
              <Button
                color="#ffffff"
                style={{
                  borderWidth: .5,
                  borderColor: { grayColor },
                }}
                onPress={() => navigation.navigate('SignInScreen')}
              >
                <Text style={{ color: '#0165ff' }}>Login</Text>
              </Button>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const weight_logo = height * 0.3;
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  footer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30
  },
  logo: {
    width: weight_logo,
    height: height_logo
  },
  title: {
    color: "#646464",
    fontSize: actuatedNormalize(18),
    paddingHorizontal: actuatedNormalize(26)
  },
  button: {
    marginTop: 5
  },
  textSign: {
    fontWeight: 'bold'
  }
});

