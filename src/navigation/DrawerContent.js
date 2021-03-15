import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Icon from '../components/common/Icon';

import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';

export function DrawerContent(props) {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

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

  const menuItems = [
    {
      icon: <Icon type="fontisto" size={17} name="player-settings" />,
      name: 'Settings',
      onPress: () => {
        props.navigation.navigate('Profile');
      },
    },
    {
      icon: <Icon type="material" size={17} name="logout" />,
      name: 'Logout',
      onPress: signOut,
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView style={styles.container2}>
        <Image
          height={70}
          width={70}
          source={require('../assets/logof.png')}
          style={styles.logoImage}
        />
        <View style={{ paddingHorizontal: 7 }}>
          {menuItems.map(({ name, icon, onPress }) => (
            <Drawer.Section style={styles.drawerSection} key={name}>
              <DrawerItem 
                icon={({ color, size }) => (
                  <View style={styles.icon}>{icon}</View>
                )}
                label={name}
                onPress={onPress}
              />
            </Drawer.Section>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container2: {
    padding: 20,
    backgroundColor: "#dad7de",
    height: "100%"
  },
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
  drawerContent: {
    flex: 1,
    // backgroundColor: '#dad7de'
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#5b2c90',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
