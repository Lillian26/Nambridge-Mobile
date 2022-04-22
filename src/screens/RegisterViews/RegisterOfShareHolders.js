import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, LogBox, Image, TextInput, Alert } from 'react-native';
import colors from '../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import {Text } from 'native-base';
import Icona from "react-native-vector-icons/AntDesign";
import { rOShareHolders } from '../../model/records';

const RegisterOfShareHolders = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [member, setMember] = useState("")
  const [memberAddress, setMemberAddress] = useState("")
  const [dateOfEntry, setDateOfEntry] = useState("")
  const [certNo, setCertNo] = useState("")
  const [sharesNo, setSharesNo] = useState("")
  const [fromWhom, setFromWhom] = useState("")
  const [amtPaid, setAmtPaid] = useState("")
  const [dateOfTransfer, setDateOfTransfer] = useState("")
  const [toWhom, setToWhom] = useState("")
  const [sharesTransfered, setSharesTransfered] = useState("")
  const [shareBalance, setShareBalance] = useState("")
  const [attachments, setAttachments] = useState([])

  useEffect(() => {
    // retrieveUserId();
    // fetchDistricts();
    if (entryId) {
      navigation.setOptions({
        title: 'View Record',
      });
      getRecordDetails();
      if (editMode) {
        navigation.setOptions({
          title: 'Edit Record',
        });
      }
    }else{
      navigation.setOptions({
        title: 'Create New Record',
      });
      setEditMode(true)
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoading(false)
  }, [editMode, loading]);

  const getRecordDetails = () => {
    var theRecord = rOShareHolders.find(x => x.id == entryId);
    setRecord(theRecord);
    setMember(theRecord.member);
    setMemberAddress(theRecord.member_address);
    setDateOfEntry(theRecord.date_of_entry);
    setCertNo(theRecord.cert_no);
    setSharesNo(theRecord.shares_no);
    setFromWhom(theRecord.from_whom);
    setAmtPaid(theRecord.amount_paid);
    setDateOfTransfer(theRecord.date_transfered);
    setToWhom(theRecord.to_whom);
    setSharesTransfered(theRecord.shares_transfered);
    setShareBalance(theRecord.shares_no_ord);

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading
  // Document attachment list component

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
    <View style={{flex: 1}}>
      {loading ?
      <ActivityIndicator animating={loading} color="#268d9c" /> 
      :
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 4 }}>
      <View style={{ padding: 4 }}>
        {!entryId ?
          <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline'}]}>Register of Shareholders</Text>
          :
          <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>
            <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', flex: 2 }]}>Register of Shareholders</Text>
            {editMode ? null :
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => { 
                  Alert.alert('Edit', 'Make changes to this record.', [{text: 'Continue', onPress: ()=>{setEditMode(true)}},
                {text: 'Cancel', onPress: ()=> {}}])
                 }} style={{ flexDirection: 'row' }}>
                  <Icona name="edit" size={25} color="blue" />
                  {/* <Text style={{color: 'blue'}}>Edit</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                  Alert.alert('Delete', 'This record will be deleted.', [{text: 'Continue', onPress: ()=>{alert('Archived!'); navigation.navigate('Home')}},
                  {text: 'Cancel', onPress: ()=> {}}])
                  }}
                  style={{ flexDirection: 'row' }}>
                  <Icona name="delete" size={25} color={colors.button} />
                  {/* <Text style={{color: 'orange'}}>Delete</Text> */}
                </TouchableOpacity>
              </View>}
          </View>
        }
      </View>

      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Member (Shareholder):</Text>
        <TextInput
          value={member}
          onChangeText={setMember}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Member (Shareholder):</Text>
        <TextInput
          value={memberAddress}
          onChangeText={setMemberAddress}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Entry as Member (Shareholder):</Text>
        <TextInput
          value={dateOfEntry}
          onChangeText={setDateOfEntry}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <Text style={[editMode ? styles.cardTitleEdit : styles.cardTitle, { paddingTop: 15 }]}>Shares:</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={[styles.inputView, { flex: 1 }]}>
          <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Cert No.</Text>
          <TextInput

            value={certNo}
          onChangeText={setCertNo}
            style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
          </TextInput>
        </View>
        <View style={[styles.inputView, { flex: 1 }]}>
          <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares No.</Text>
          <TextInput

            value={sharesNo}
          onChangeText={setSharesNo}
            style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
          </TextInput>
        </View>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>From whom shares were transfered:</Text>
        <TextInput
          value={fromWhom}
          onChangeText={setFromWhom}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Amount Paid thereon in UGX</Text>
        <TextInput
          value={amtPaid}
          onChangeText={setAmtPaid}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Transfer of Ordinary Shares:</Text>
        <TextInput
          value={dateOfTransfer}
          onChangeText={setDateOfTransfer}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>To whom Shares are Transferred:</Text>
        <TextInput
          value={toWhom}
          onChangeText={setToWhom}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares transfered:</Text>
        <TextInput
          value={sharesTransfered}
          onChangeText={setSharesTransfered}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Number of Shares Held (balance):</Text>
        <TextInput
          value={shareBalance}
          onChangeText={setShareBalance}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { paddingTop: 15 }]}>
        <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Attach Relevant Documents:</Text>
        <TextInput
          value={attachments.length.toString()}
          // onChangeText={setAttachments}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>
      </View>
      {entryId ?
        editMode ? <View style={styles.button}>
          <TouchableOpacity onPress={() => { alert('Saved!'); setEditMode(false); navigation.navigate('Home') }} style={[{ backgroundColor: '#268d9c' }, styles.buttons]}>
            <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setEditMode(false);}} style={[{
            borderColor: 'rgba(118,121,116, .8)',
            borderWidth: .3,
          }, styles.buttons]}>
            <Text style={{ color: '#268d9c', alignSelf: 'center' }}>{`Cancel`}</Text>
          </TouchableOpacity>
        </View> : null

        : <View style={styles.button}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={[{
            borderColor: 'rgba(118,121,116, .8)',
            borderWidth: .3,
          }, styles.buttons]}>
            <Text style={{ color: '#268d9c', alignSelf: 'center' }}>{`Cancel`}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { alert('Saved!'); navigation.navigate('Home') }} style={[{ backgroundColor: '#268d9c' }, styles.buttons]}>
            <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Create`}</Text>
          </TouchableOpacity>
        </View>}
    </ScrollView>}
    </View>
  );
};

export default RegisterOfShareHolders;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textInputEdit: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    paddingBottom: 5,
    color: '#333333'
  },
  textInput: {
    marginHorizontal: 10,
    // marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    // paddingLeft: 15,
    paddingBottom: 0,
    color: '#333333',
    // fontWeight: '700'
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
  cardTitleEdit: {
    color: "#333333",
    // fontWeight: '700',
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardTitle: {
    color: "grey",
    // fontWeight: '700',
    paddingLeft: 10,
    // paddingBottom: 2,
    fontSize: 16,
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
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textSign: {
    fontWeight: 'bold',
  },
  buttons: {
    paddingVertical: 12,
    borderRadius: 50,
    width: 130,
  },
  textInput2: {
    paddingLeft: 15,
    fontSize: 16,
  },
  inputView: {

  },
  btnShadow: {
    shadowColor: 'rgba(255,101,80, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  }
});
