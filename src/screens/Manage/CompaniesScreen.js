import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar, SafeAreaView, FlatList, Alert } from 'react-native';
import colors from '../../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Companies from '../../model/companies';
import actuatedNormalize from '../../helpers/actuatedNormalize';
import { useDispatch, useSelector } from "react-redux";
import { setcompany } from "../../store/slices/activeCompSlice";
import Icon from '../../components/common/Icon';

const CompaniesScreen = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data.length == 0){
      Alert.alert("No companies found!", `This tool is used for digital registers for specific companies.\n\nCreate a company to start using this tool?`,
      [{text: 'Continue', onPress: () => navigation.navigate('NewCompany')}, {text: 'Cancel', onPress: ()=> {}}])
    }
  }, [data])

  const refreshList = () => {
    setData(Companies)
  }

  const selectSpecificCompany = () => {
    if (!selectedCompany) {
      alert('Select a company to continue');
      return
    }
    var tCompanyName = Companies.find(x => x.id == selectedCompany).name;
    dispatch(setcompany({
        companyName: tCompanyName,
        companyId: selectedCompany,
    }))

    alert("Active company updated!");
    navigation.jumpTo('ActiveCompany')

  }

  return (
    <>
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      <View
        style={[styles.footer, {
        }]}
      >
        <SafeAreaView>
          {/* <TouchableOpacity onPress={refreshList} style={{paddingVertical: 15, alignSelf: 'flex-end', marginRight: 20}}>
          <Icon type="fa" size={28} name="refresh" />
          </TouchableOpacity> */}
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[selectedCompany == item.id ? { backgroundColor: '#f5f7fa' } : { backgroundColor: '#fff' },
                  {
                    borderColor: 'rgba(118,121,116, .1)',
                    borderTopWidth: 1
                  }, index == (Companies.length - 1) ? { borderBottomWidth: 1 } : {}]}
                  onPress={() => setSelectedCompany(item.id)}
                >
                  <Text style={{ padding: 15 }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />

        </SafeAreaView>
      </View>
      {data.length !== 0 ?
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          selectSpecificCompany()
        }}
      >
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Text style={{ color: colors.white, fontWeight: 'bold' }}>Activate</Text>
        </Animatable.View>
      </TouchableOpacity>
      : 
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          refreshList()
        }}
      >
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon type="fa" size={28} name="refresh" color={colors.white} />
        </Animatable.View>
      </TouchableOpacity>}
    </>
  );
};

export default CompaniesScreen;

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
    width: 80,
    height: 50,
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
