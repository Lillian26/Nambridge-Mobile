import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar, LogBox, Image, TextInput } from 'react-native';
import colors from '../assets/theme/colors';
import Wizard from "react-native-wizard";
import PrevButton from '../components/PrevButton';
import FinishButton from '../components/FinishButton';
import NextButton from '../components/NextButton';
// import Container from '../components/Container';
import { DEFAULT_IMAGE_URI } from '../constants/general';
import DocumentPicker from 'react-native-document-picker';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/AntDesign";
import grayColor from '../constants/Colors';

//state, hooks for function based

const ConfirmAdvert = ({ navigation }) => {

  const [uploading, setIsUploading] = useState(false);

  const [remembrancePic, setRemembrancePic] = useState(null);

  useEffect(() => {
    // retrieveUserId();
    // fetchDistricts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  //*************************************************************picker and display , click link************************************************** */
  const selectOneFile = async (setFile) => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Action has been Canceled');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <ScrollView style={{ padding: 4 }}>
      <Card>
        <CardItem header style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Preview</Text>
        </CardItem>
        <TextInput
          placeholder="Article Title Here"
          onChangeText={(val) => setUsername(val)}
          style={styles.textInput}>
        </TextInput>
        <TextInput
          placeholder="Article Description Here"
          onChangeText={(val) => setUsername(val)}
          style={[styles.textInput, { marginBottom: 13, textAlignVertical: 'top' }]}
          numberOfLines={5}
          multiline={true}
        >
        </TextInput>
      </Card>
      <Card>
        <CardItem header style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Details</Text>
        </CardItem>
        <View style={styles.featuredPhoto}>
          <TouchableOpacity style={styles.textPhoto} onPress={() => selectOneFile(setRemembrancePic)}>
            <Icon name="plus" size={30} color='rgba(118,121,116, .6)' />
            <Text style={{ color: 'rgba(118,121,116, .65)', }}>
              Add a Photo
            </Text>
          </TouchableOpacity>
          <Animatable.Image
            source={require('../assets/images/imgPlaceholder2.png')}
            style={{ width: '60%', height: 150 }}
            resizeMode="center"
          />
        </View>
      </Card>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => { }} style={[{borderColor: 'rgba(118,121,116, .8)',
    borderWidth: .3,},styles.buttons]}>
          <Text style={{ color: '#fe4b34', alignSelf: 'center' }}>{`Save`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={[{backgroundColor: '#fe4b34'}, styles.buttons]}>
          <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Publish`}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ConfirmAdvert;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textInput: {
    paddingLeft: 15,
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15
  },
  textPhoto: {
    fontSize: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 150,
    width: '40%'
  },
  action3: {
    paddingTop: 5,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
    paddingTop: 10,
  },
  chooseText: {
    color: colors.primary,
    textAlign: 'center',
  },
  cardTitle: {
    color: "#268d9c",
    fontWeight: '700',
    fontSize: 18,
  },
  cardHeader: {
    //   paddingVertical: 0
  },
  featuredPhoto: {
    flexDirection: 'row',
    borderStyle: 'dashed',
    marginBottom: 10,
    borderColor: 'rgba(118,121,116, .3)',
    marginHorizontal: 10,
    borderWidth: .3,
    borderRadius: 1,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textSign: {
    fontWeight: 'bold',
  },
  buttons:{
    paddingVertical: 12,
    borderRadius: 50,
     width: 130,
  }
});
