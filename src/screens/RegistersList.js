import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, LogBox, StatusBar, FlatList } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Iconb from "react-native-vector-icons/Ionicons";
import Registers from '../model/registers';
import actuatedNormalize from '../helpers/actuatedNormalize';

const RegistersList = ({ navigation }) => {

  const [data, setData] = useState(Registers);
  const [selectedRegister, setSelectedRegister] = useState(null);

  const createSpecificRecord = () => {
    if (!selectedRegister) {
      alert('Select from the list to continue');
      return
    }
    var tRecordName = Registers.find(x => x.id == selectedRegister).name;
    switch (tRecordName) {
      case "Register of Shareholders":
        navigation.navigate('RegisterOfShareHolders');
        break;
      case "Index of Minutes of Shareholders":
        // navigation.navigate('RegisterOfShareHolders');
        navigation.navigate('NotFound');
        break;
      case "Register of Directors":
        // navigation.navigate('RegisterOfShareHolders');
        navigation.navigate('NotFound');
        break;
      case "Register of Directors Interest":
        // navigation.navigate('RegisterOfShareHolders');
        navigation.navigate('NotFound');
        break;
      case "Directors Shareholding & Related Particulars":
        // navigation.navigate('RegisterOfShareHolders');
        navigation.navigate('NotFound');
        break;
      default:
        navigation.navigate('NotFound');
        break;
    }

  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, [])

  return (
    <>
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      <View
        style={[styles.footer, {
        }]}
      >
        <ScrollView>
          <Text style={{
            fontSize: actuatedNormalize(18), paddingTop: actuatedNormalize(20),
            paddingLeft: actuatedNormalize(15), marginBottom: actuatedNormalize(5)
          }}>Select record type:</Text>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[selectedRegister == item.id ? { backgroundColor: '#f5f7fa' } : { backgroundColor: '#fff' },
                  {
                    borderColor: 'rgba(118,121,116, .1)',
                    borderTopWidth: 1
                  }, index == (Registers.length - 1) ? { borderBottomWidth: 1 } : {}]}
                  onPress={() => setSelectedRegister(item.id)}
                >
                  <Text style={{ padding: 15 }}>{index}) {item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />

        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          // navigation.navigate('RegisterScreen', {registerId: selectedRegister})
          createSpecificRecord()
        }}
      >
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          {/* <Icon name="plus" size={25} color={colors.white} /> */}
          <Text style={{ color: colors.white, fontWeight: 'bold' }}>Create</Text>
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default RegistersList;

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    // width: "100%", height: "100%",
    marginTop: 10,
    paddingVertical: 5,
    // backgroundColor: "#FCFBF9"
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
    width: 75,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  }
});
