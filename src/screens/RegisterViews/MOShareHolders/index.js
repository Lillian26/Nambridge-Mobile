import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, LogBox, Image, TextInput, Alert } from 'react-native';
import colors from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import { Text } from 'native-base';
import Icona from "react-native-vector-icons/AntDesign";
import { mOShareHolders } from '../../../model/records';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
// import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import actuatedNormalize from '../../../helpers/actuatedNormalize';

const MOShareHolders = ({ route, navigation }) => {

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
  const [visible, setVisible] = useState(false);
  const [transferType, setTransferType] = useState(null)

  useEffect(() => {
    if (entryId) {
      navigation.setOptions({
        title: 'View Record',
      });
      getRecordDetails();
      if (editMode) {
        navigation.setOptions({
          title: 'Edit Record',
        });
        alert("Update fields of this record.")
      }
    } else {
      navigation.setOptions({
        title: 'Create New Record',
      });
      setEditMode(true)
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoading(false)
  }, [editMode, loading]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getRecordDetails = () => {
    var theRecord = mOShareHolders.find(x => x.id == entryId);
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

  const fetchRegister = () => {
    axios({
      url: "",
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "getReports"
      }
    })
      .then(res => {
        if (!mountedRef.current) return null;

        if (res.data.status == "500") { signOut() }
        else {
          setReports(res.data.data);

          let thepR = null;
          thepR = res.data.data.find(x => x.priority == "1");
          setPriorityReport(thepR)
        }
      })
      .catch(function (error) {
        console.log("Report list Error caught: " + error);
        AsyncStorage.clear().then(() => { signOut() });
      });
  }

  const createSH = async () => {

    // alert('Saved!'); navigation.navigate('Home')
    Alert.alert("Saved!", "Proceed to add ledger?", [
      { text: 'Add Ledger', onPress: () => { navigation.navigate("ShareHoldersLedger") } },
      { text: 'Cancel', onPress: () => { navigation.navigate('Home') } }])
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 4 }}>
          <View style={{ padding: 4 }}>
            {!entryId ?
              <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline' }]}>Minutes of Shareholders</Text>
              :
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', paddingTop: 20, }]}>Minutes of Shareholders</Text>
                {editMode ? null :

                  <Provider>
                    <View
                      style={{
                        paddingTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 50,
                        marginBottom: visible ? 200 : 0
                      }}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<TouchableOpacity style={{ backgroundColor: '#f5f7fa', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }} onPress={openMenu}>
                          <Iconsp name="options-vertical" size={22} color="#017eff" />
                        </TouchableOpacity>}>
                        <Menu.Item onPress={() => { closeMenu(); navigation.navigate("ShareHoldersLedger") }} icon="folder-account-outline" title="Shareholders Ledger" />
                        <Divider />
                        <Menu.Item onPress={() => { closeMenu(); setEditMode(true) }} icon="file-document-edit-outline" title="Edit Record" />
                        <Divider />
                        <Menu.Item onPress={() => {
                          closeMenu(); Alert.alert('Delete', 'This record will be deleted.', [{ text: 'Continue', onPress: () => { alert('Archived!'); navigation.goBack() } },
                          { text: 'Cancel', onPress: () => { } }])
                        }} icon="trash-can-outline" title="Delete Record" />
                      </Menu>
                    </View>
                  </Provider>

                }
              </View>
            }
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Shareholder Meeting:</Text>
            <TextInput
              value={meetingDate}
              onChangeText={setMeetingDate}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>State whether meeting was?:</Text>
            <TextInput
              value={typeOfMeeting}
              onChangeText={setTypeOfMeeting}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Entry as Member (Shareholder):</Text>
            <TextInput
              value={resolutions}
              onChangeText={setResolutions}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>From whom shares were transfered:</Text>
            {/* <TextInput
          value={fromWhom}
          onChangeText={setFromWhom}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput> */}
            {/* <View style={[styles.action4, { height: actuatedNormalize(50), marginVertical: actuatedNormalize(15), width: '100%', alignSelf: 'center' }]} >
              <Picker style={{
                color: transferType === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: actuatedNormalize(18), fontWeight: '100',
                transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
              }}
                onValueChange={(itemValue, itemIndex) => setTransferType(itemValue)} itemStyle={{ fontSize: actuatedNormalize(18) }} >
                <Picker.Item value={null} label="Select Transfer Type" />
                <Picker.Item value="original_issue" label="Allotment / Original Issue" />
                <Picker.Item value="from_someone" label="Transfer from Someone" />
              </Picker>
            </View> */}
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Amount Paid thereon in UGX</Text>
            <TextInput
              value={amtPaid}
              onChangeText={setAmtPaid}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Transfer of Ordinary Shares:</Text>
            <TextInput
              value={dateOfTransfer}
              onChangeText={setDateOfTransfer}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>To whom Shares are Transferred:</Text>
            <TextInput
              value={toWhom}
              onChangeText={setToWhom}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares transfered:</Text>
            <TextInput
              value={sharesTransfered}
              onChangeText={setSharesTransfered}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Number of Shares Held (balance):</Text>
            <TextInput
              value={shareBalance}
              onChangeText={setShareBalance}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
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
              <TouchableOpacity onPress={() => { alert('Saved!'); setEditMode(false); navigation.navigate('Home') }} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setEditMode(false); }} style={[{
                borderColor: 'rgba(118,121,116, .8)',
                borderWidth: .3,
              }, styles.buttons]}>
                <Text style={{ color: colors.button, alignSelf: 'center' }}>{`Cancel`}</Text>
              </TouchableOpacity>
            </View> : null

            : <View style={styles.button}>
              <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={[{
                borderColor: 'rgba(118,121,116, .8)',
                borderWidth: .3,
              }, styles.buttons]}>
                <Text style={{ color: colors.button, alignSelf: 'center', fontWeight: 'bold' }}>{`Cancel`}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={createSH} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}>{`Create`}</Text>
              </TouchableOpacity>
            </View>}
        </ScrollView>}
    </View>
  );
};

export default MOShareHolders;

const styles = StyleSheet.create({
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
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    paddingBottom: 0,
    color: '#333333',
  },
  action4: {
    paddingTop: actuatedNormalize(5),
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  cardTitleEdit: {
    color: "#333333",
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardTitle: {
    color: "grey",
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  buttons: {
    paddingVertical: 12,
    borderRadius: 50,
    width: 130,
  }
});
