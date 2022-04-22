import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar, SafeAreaView, FlatList } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Iconb from "react-native-vector-icons/Ionicons";
import Registers from '../model/registers';
import MenuCard from '../components/MenuCard';

//state, hooks for function based

const HomeScreen = ({ navigation }) => {

  const [balance, setBalance] = useState('');
  const [accNum, setAccNum] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [data, setData] = useState(Registers);

  return (
    <>
      {/* <View style={styles.container} > */}
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      {/* <View style={{ padding: 4 }}>
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TextInput
            placeholder="What are you looking for"
            onChangeText={(val) => setRegisterName(val)}
            style={styles.textInput}>
          </TextInput>
          <Iconb.Button name="search-outline" size={22} style={{ alignSelf: 'center'}} color='rgba(118,121,116, .5)' backgroundColor='#fff'
            onPress={() => { }} />
          </View>
        </Card>
      </View> */}
      {/* </View> */}
      <View
        style={[styles.footer, {
          backgroundColor: '#ebebeb',
        }]}
      >
        <SafeAreaView>

          <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
            // horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <MenuCard
                  menutab={item}
                  onOpen={() => navigation.navigate('RegisterScreen', {registerId: item.id})}
                />
              );
            }} />

        </SafeAreaView>
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigation.navigate('RegistersList');
        }}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon name="plus" size={25} color={colors.white} />
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

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
