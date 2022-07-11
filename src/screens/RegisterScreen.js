import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  FlatList
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
import {
  ROShareHoldersCard, MOShareHoldersCard, RODirectorsCard, RODInterestCard, RODsSHgParticularsCard
  , MODirectorsCard, ROSecretatriesCard, ROMortgagesCard, CoSealRegisterCard, RODebenturesCard,
  ROBranchesCard
} from '../components/ListCard';

import {
  rOShareHolders, mOShareHolders, rODirectors, rODInterest, rODsSHgParticulars
  , mODirectors, rOSecretatries, rOMortgages, coSealRegister, rODebentures, rOBranches
} from '../model/records';
import registers from '../model/registers';

const RegisterScreen = ({ route, navigation, props }) => {
  const { registerId } = route.params ?? {};
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [recordName, setRecordName] = useState("");
  const [registerRoute, setRegisterRoute] = useState("NotFound");

  const setSpecificData = () => {
    var tRecordName = registers.find(x => x.id == registerId).name;
    switch (tRecordName) {
      case "Register of Shareholders":
        setData(rOShareHolders);
        setRegisterRoute('RegisterOfShareHolders');
        break;
      case "Index of Minutes of Shareholders":
        setData(mOShareHolders);
        setRegisterRoute('MOShareHolders');
        break;
      case "Register of Directors":
        setData(rODirectors);
        setRegisterRoute('RODirectors');
        break;
      case "Register of Directors Interest":
        setData(rODInterest);
        setRegisterRoute('RODInterest');
        break;
      case "Directors Shareholding & Related Particulars":
        setData(rODsSHgParticulars);
        setRegisterRoute('RODsSHgParticulars');
        break;
      case "Index of Minutes of Directors":
        setData(mODirectors);
        setRegisterRoute('MODirectors');
        break;
      case "Register of Secretaries":
        setData(rOSecretatries);
        setRegisterRoute('ROSecretatries');
        break;
      case "Register of Mortgages & Charges":
        setData(rOMortgages);
        setRegisterRoute('ROMortgages');
        break;
      case "Company Seal Register":
        setData(coSealRegister);
        setRegisterRoute('CoSealRegister');
        break;
      case "Register of Debentures":
        setData(rODebentures);
        setRegisterRoute('RODebentures');
        break;
      case "Register of Branches":
        setData(rOBranches);
        setRegisterRoute('ROBranches');
        break;
      default:
        setData(null);
        setRegisterRoute('NotFound');
        break;
    }

  }

  const renderSpecificItem = (item) => {
    var tRecordName = registers.find(x => x.id == registerId).name;
    switch (tRecordName) {
      case "Register of Shareholders":
        return (
          <ROShareHoldersCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />
        );
      case "Index of Minutes of Shareholders":
        return (
          <MOShareHoldersCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Directors":
        return (
          <RODirectorsCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Directors Interest":
        return (
          <RODInterestCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Directors Shareholding & Related Particulars":
        return (
          <RODsSHgParticularsCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Index of Minutes of Directors":
        return (
          <MODirectorsCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Secretaries":
        return (
          <ROSecretatriesCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Mortgages & Charges":
        return (
          <ROMortgagesCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Company Seal Register":
        return (
          <CoSealRegisterCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Debentures":
        return (
          <RODebenturesCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />);
      case "Register of Branches":
        return (
          <ROBranchesCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />
        );
      default:
        return (
          <ROShareHoldersCard
            item={item}
            onOpen={() => navigation.navigate(registerRoute, { entryId: item.id, registerId: registerId })}
          />
        )
    }
  }

  useEffect(() => {
    if (registerId) {
      var tRecordName = registers.find(x => x.id == registerId).name;
      navigation.setOptions({
        title: tRecordName,
      });
      setRecordName(tRecordName);
      setSpecificData();
      setLoading(false)
    }
  })
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#4d505b' barStyle="light-content" />
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <SafeAreaView>

          {!data ?
            <View
              style={[{ alignItems: 'center', paddingTop: actuatedNormalize(50) }]}>
              <Text style={{ fontSize: 18, color: 'gray' }}>List Not found.</Text>
            </View>
            :
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={data}
              numColumns={1}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => renderSpecificItem(item)} />}

        </SafeAreaView>
      }
    </View>
  );
};

export default RegisterScreen;

const { height } = Dimensions.get("screen");
const weight_logo = height * 0.3;
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  footer: {
    // flex: 1,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30
  },
  logo: {
    width: weight_logo,
    // height: height_logo,
    // borderWidth: .5,
    // borderColor: {grayColor}, 
    // borderRadius: 50
  },
  title: {
    color: "#646464",
    fontSize: actuatedNormalize(18),
    // fontWeight: 'bold'
    paddingHorizontal: actuatedNormalize(26)
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

