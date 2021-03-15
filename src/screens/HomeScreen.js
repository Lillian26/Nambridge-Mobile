import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';

//state, hooks for function based

const HomeScreen = ({ navigation }) => {

  const [balance, setBalance] = useState('');
  const [accNum, setAccNum] = useState('');

  return (
    <>
    <View style={styles.container} >
      <StatusBar backgroundColor='#dad7de' barStyle="dark-content" />
      <View style={[styles.content, { height: "20%" }]}>
        <View style={{ alignSelf: "center", padding: 20 }}>
          <Text style={{ fontWeight: "100", fontSize: 20 }}>
            Balance
                    </Text>
          <Text style={{ paddingTop: 10, fontWeight: "100", fontSize: 23 }}>
            50M
                    </Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ padding: 10, fontWeight: "100" }}>
            Transactions
                    </Text>
        </View>
      </View>
    </View>
    <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigation.navigate('CreateAdvert');
        }}>
        <Icon name="plus" size={21} color={colors.white} />
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
  },
});
