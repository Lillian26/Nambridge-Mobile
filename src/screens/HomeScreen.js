import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, FlatList, Alert } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import Registers from '../model/registers';
import MenuCard from '../components/MenuCard';
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {

  const company = useSelector((state) => state.company);

  const [data, setData] = useState(Registers);

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      if(!company.companyName){
        Alert.alert("No active company found!", `This tool is used for digital registers for specific companies.\n\Select a company to start using this tool?`,
        [{text: 'Continue', onPress: () => navigation.navigate('Manage')}, {text: 'Cancel', onPress: ()=> {}}])
      }
    })
  
    return unsubscribe
  }, [navigation, company.companyName])

  return (
    <>
      <StatusBar backgroundColor='#f5f7fa' barStyle="dark-content" />
      <View
        style={[styles.container]}
      >
        <SafeAreaView>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
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
    backgroundColor: '#f5f7fa',
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
  }
});
