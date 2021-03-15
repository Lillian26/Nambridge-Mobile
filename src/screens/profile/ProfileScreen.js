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
    <View style={appStyles.container}>
      <View
        // source={require('../../assets/images/backgrounds/currency-bg.jpg')}
        style={[appStyles.col_container, { flex: 2, backgroundColor: colors.accent }]}>
        <View style={[appStyles.col_container, { flex: 2 }]}>
          <TouchableOpacity
            style={styles.edit_button}
            onPress={() => alert('Edit profile function coming soon!')}
          >
            <Icon name="ios-pencil-sharp" style={{ color: colors.primary, }} size={36} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Image style={styles.avatar}
              width={150}
              height={150}
              source={{
                uri: DEFAULT_IMAGE_URI
              }}
            />
          </View>
        </View>
        <View style={[appStyles.col_container, { flex: 1 }]}>
          <View style={appStyles.col_container}>
            <Text style={[appStyles.white, appStyles.font_md]}>{userName}</Text>
            <Text style={[appStyles.white, appStyles.font_lg]}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={[appStyles.col_container, { flex: 3 }]}>
        <ScrollView style={[appStyles.w_100, { flex: 1 }]}>
          <View>
            <Card style={{ paddingBottom: 40 }}>
              <View style={{ padding: 10 }}>

                {/*contact us*/}
                <TouchableOpacity>
                  <View style={[telStyles.container]}>
                    <View style={telStyles.iconRow}>
                      <Icon name="person-circle-outline" style={{ color: "#fe4b34", }} size={26} />
                    </View>
                    <TouchableOpacity
                      style={telStyles.telRow}>
                      <View style={telStyles.telNumberColumn}>
                        <Text style={telStyles.telNumberText}>Name</Text>
                      </View>
                      <View style={telStyles.telNameColumn}>
                        <Text
                          style={telStyles.telNameText}>{firstname} {lastname} </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={telStyles.smsRow}>
                      <Icon
                        ios="logo-whatsapp"
                        android="logo-whatsapp"
                        style={{ color: "#fe4b34", }} />
                    </View>
                  </View>
                </TouchableOpacity>

                {/*contact us*/}
                <TouchableOpacity>
                  <View style={[telStyles.container]}>
                    <View style={telStyles.iconRow}>
                      <Icon name="ios-call" style={{ color: "#fe4b34", }} size={26} />
                    </View>
                    <TouchableOpacity
                      style={telStyles.telRow}>
                      <View style={telStyles.telNumberColumn}>
                        <Text style={telStyles.telNumberText}>Phone</Text>
                      </View>
                      <View style={telStyles.telNameColumn}>
                        <Text style={telStyles.telNameText}>{phone}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={telStyles.smsRow}>
                      <Icon
                        ios="logo-whatsapp"
                        android="logo-whatsapp"
                        style={{ color: "#fe4b34", }} />
                    </View>
                  </View>
                </TouchableOpacity>

                {/*Seperator line*/}
                <View style={sepStyles.container}>
                  <View style={sepStyles.separatorOffset} />
                  <View style={sepStyles.separator} />
                </View>

                <TouchableOpacity>
                  <View style={[mailStyles.container]}>
                    <View style={mailStyles.iconRow}>
                      {/*<Icon*/}
                      {/*    name="ios-mail"*/}
                      {/*    style={{color: "#fe4b34",}}/>*/}
                      <Icon name="ios-mail" style={{ color: "#fe4b34", }} size={26} />
                    </View>
                    <TouchableOpacity
                      style={mailStyles.emailRow}>
                      <View style={mailStyles.emailColumn}>
                        <Text style={mailStyles.emailText}>Email</Text>
                      </View>
                      <View style={mailStyles.emailNameColumn}>
                        <Text style={mailStyles.emailNameText}>{email}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                {/*Seperator line*/}
                <View style={sepStyles.container}>
                  <View style={sepStyles.separatorOffset} />
                  <View style={sepStyles.separator} />
                </View>

                {/*Location view*/}
                {/* <TouchableOpacity>
                  <View style={[mailStyles.container]}>
                    <View style={mailStyles.iconRow}>
                      <Icon
                        name="ios-pin"
                        style={{ color: "#fe4b34", }}
                        size={26}
                      />
                    </View>
                    <View style={mailStyles.emailRow}>
                      <View style={mailStyles.emailColumn}>
                        <Text style={mailStyles.emailText}>Location</Text>
                      </View>
                      <View style={mailStyles.emailNameColumn}>
                        <Text style={mailStyles.emailNameText}>
                          {location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity> */}
              </View>
              <View style={mailStyles.button}>

                <Button
                  rounded
                  style={mailStyles.startBtn}
                  color="#fe4b34"
                  onPress={() => onLogout()}
                >
                  <Text>{'Logout'}</Text>
                </Button>
              </View>
            </Card>

          </View>
        </ScrollView>
      </View>
    </View>
  );
  // }

}

export default PersonalScreen;

const mailStyles = StyleSheet.create({
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
    color: '#fe4b34',
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
    color: '#fe4b34',
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
