import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import Icon from '../../components/common/Icon';
import colors from '../../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Iconb from "react-native-vector-icons/Ionicons";

//state, hooks for function based

const DraftsScreen = ({ navigation }) => {

  const [balance, setBaslance] = useState('');
  const [accNum, setAccNum] = useState('');

  return (
    <>
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      <View style={{ padding: 4 }}>
       
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigation.navigate('CreateAdvert2');
        }}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon name="plus" size={25} color={colors.white} />
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default DraftsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", height: "100%",
    // marginTop: 10,
    // padding: 5,
    backgroundColor: "#FCFBF9"
  },
  content: {
    //   backgroundColor: '#fff',
    borderRadius: 10,
    //   elevation: 10,
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
    width: "90%",
    // height: "85%"

  },
  floatingActionButton: {
    backgroundColor: colors.button,
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  textInput: {
    paddingLeft: 15,
    fontSize: 16,
  },
});