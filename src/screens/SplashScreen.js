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
import actuatedNormalize from '../helpers/actuatedNormalize';
import grayColor from '../constants/Colors';

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
      <View style={{ flex: 1 }}></View>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logo.jpeg')}
          style={styles.logo}
          resizeMode="center"
        />
        <Text style={[styles.title]}></Text>

      </View>
      <View style={[styles.footer]}>
        <Animatable.View
          animation="slideInDown"
        >
          <View style={styles.button}>
            <Button
              color="#fe4b34"
              onPress={() => navigation.navigate('SignInScreen')}
            >
              <Text style={styles.textSign}>Get The Word Out</Text>
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
                {/* <Icon name="checkmark" /> */}
                <Text style={{ color: '#fe4b34' }}>Login</Text>
              </Button>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flex: 1,
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
    height: height_logo,
    // borderWidth: .5,
    // borderColor: {grayColor}, 
    // borderRadius: 50
  },
  title: {
    color: grayColor,
    fontSize: actuatedNormalize(14),
    // fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    // alignItems: 'flex-end',
    marginTop: 5
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

