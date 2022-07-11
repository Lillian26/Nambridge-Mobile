import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import colors from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import { Text } from 'native-base';
import { rOShareHolders } from '../../../model/records';
import { Menu, Divider, Provider, Card, Title } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
import RNPickerSelect from "react-native-picker-select";
import actuatedNormalize from '../../../helpers/actuatedNormalize';
import { formatTheDateLabel, defaultDate, formatTheDateText, convertArrayToObject } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { pickerStyle, styles } from '../../../styles/common';

const RegisterOfShareHolders = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};//common
  const [loading, setLoading] = useState(true);//common
  const [editMode, setEditMode] = useState(false);//common

  const [record, setRecord] = useState(null)
  const [member, setMember] = useState("")
  const [memberAddress, setMemberAddress] = useState("")
  const [dateOfEntry, setDateOfEntry] = useState(defaultDate);
  const [isDateOfEntryPickerVisible, setDateOfEntryPickerVisibility] = useState(false);
  const [certNo, setCertNo] = useState("")
  const [sharesNo, setSharesNo] = useState("")
  const [amtPaid, setAmtPaid] = useState("")
  const [transferDate, setTransferDate] = useState(defaultDate);
  const [isTransferDateVisible, setTransferDateVisibility] = useState(false);
  const [toWhom, setToWhom] = useState("")
  const [sharesTransfered, setSharesTransfered] = useState("")
  const [shareBalance, setShareBalance] = useState("")
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [visible, setVisible] = useState(false);
  const [transferType, setTransferType] = useState(null);
  const [transferFrom, setTransferFrom] = useState(null);
  const [originalIssue, setOriginalIssue] = useState(null);
  const [availableShares, setAvailableShares] = useState("0");
  const [sharesTotalAmt, setSharesTotalAmt] = useState("0.00");
  const [valuePerShare, setValuePerShare] = useState("0.00");

  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);

  const [documentTypes, setDocumentTypes] = useState([])//common

  const showTransferDatePicker = () => {
    setTransferDateVisibility(true);
  };

  const hideTransferDatePicker = () => {
    setTransferDateVisibility(false);
  };

  const handleTransferConfirm = (e) => {
    hideTransferDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setTransferDate(defaultDate)
    }
    else {
      setTransferDate(date)
    }
  };

  const showDateOfEntryPicker = () => {
    setDateOfEntryPickerVisibility(true);
  };

  const hideDateOfEntryPicker = () => {
    setDateOfEntryPickerVisibility(false);
  };

  const handleDateOfEntryConfirm = (e) => {
    hideDateOfEntryPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfEntry(defaultDate)
    }
    else {
      setDateOfEntry(date)
    }
  };

  //common------------------------------ file upload methods


  function handleChangeInput(i, value, name, uploads, setUploads, setValidUploads) {
    if (value) {
      const values = [...uploads];

      // console.log('values[i][name]', values[i][name])
      const thisVal = name === "Type" ? value : value[0]
      const otherVal = name === "Type" ? values[i]["Document"] : values[i]["Type"]

      if (values[i] && name === "Document") {
        values[i]["Document"] = thisVal
        values[i]["Type"] = otherVal
      }
      else {
        values[i]["Type"] = thisVal
        values[i]["Document"] = otherVal
      }

      setValidUploads(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
      setUploads(values);
      // console.log(uploads);
    }
  }

  function handleAdd(uploads, setUploads, setValidUploads) {
    const values = [...uploads];
    // values.push({ value: null });
    values.push({
      Type: '',
      Document: '',
    });
    setValidUploads(false)
    setUploads(values);
  }

  function handleRemove(i, uploads, setUploads, setValidUploads) {
    const values = [...uploads];
    values.splice(i, 1);
    setValidUploads(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
    setUploads(values);
  }

  const fetchDocumentTypes = () => {
    let dTypes = []
    docTypes.forEach(x => {
      dTypes.push({ label: x.name, value: x.id })
    })
    setDocumentTypes(dTypes);
  }
  // -------------------------------------------------------

  useEffect(() => {
    fetchDocumentTypes(); //common

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
    } else {
      navigation.setOptions({
        title: 'Create New Record',
      });
      setEditMode(true);
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoading(false)
  }, [editMode, loading, transferType]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getRecordDetails = () => {
    var theRecord = rOShareHolders.find(x => x.id == entryId);
    setRecord(theRecord);
    setMember(theRecord.member);
    setMemberAddress(theRecord.member_address);
    setDateOfEntry(new Date(theRecord.date_of_entry));
    setCertNo(theRecord.cert_no);
    setSharesNo(theRecord.shares_no);
    setAmtPaid(theRecord.amount_paid);
    setTransferDate(new Date(theRecord.date_transfered));
    setToWhom(theRecord.to_whom);
    setSharesTransfered(theRecord.shares_transfered);
    setShareBalance(theRecord.shares_no_ord);
    setTransferType(theRecord.transfer_type);
    if (theRecord.transfer_type == "original_issue") { setOriginalIssue(theRecord.original_issue) };
    if (theRecord.transfer_type == "from_someone") { setTransferFrom(theRecord.from_someone) };
    setAttachmentNo(theRecord.no_of_attachments)

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading
  // Document attachment list component

  //*************************************************************picker and display , click link************************************************** */
  const selectOneFile = async (idx) => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // return res;
      // console.log(res, '/n', idx)
      handleChangeInput(idx, res, 'Document', uploads, setUploads, setValidUploads);
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
      return null
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

  const submitRecord = async () => {

    const data = [
      { "member": member },
      { "memberAddress": memberAddress },
      { "dateOfEntry": dateOfEntry },
      { "isDateOfEntryPickerVisible": isDateOfEntryPickerVisible },
      { "certNo": certNo },
      { "sharesNo": sharesNo },
      { "amtPaid": amtPaid },
      { "transferDate": transferDate },
      { "isTransferDateVisible": isTransferDateVisible },
      { "toWhom": toWhom },
      { "sharesTransfered": sharesTransfered },
      { "shareBalance": shareBalance },
      { "attachmentNo": attachmentNo },
      { "visible": visible },
      { "transferType": transferType },
      { "transferFrom": transferFrom },
      { "originalIssue": originalIssue },
      { "uploads": uploads }
    ]

    console.log("to submit: ", data)

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
              <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline' }]}>Register of Shareholders</Text>
              :
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', paddingTop: 20, }]}>Register of Shareholders</Text>
                {/* menu */}
                {editMode ? null :

                  <Provider>
                    <View
                      style={{
                        paddingTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 50,
                        marginBottom: visible ? 240 : 0
                      }}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<TouchableOpacity style={{ backgroundColor: '#f5f7fa', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }} onPress={openMenu}>
                          <Iconsp name="options-vertical" size={22} color="#017eff" />
                        </TouchableOpacity>}>
                        <Menu.Item onPress={() => { closeMenu(); setEditMode(true) }} icon="file-document-edit-outline" title="Edit Record" />
                        <Divider />
                        <Menu.Item onPress={() => {
                          closeMenu(); Alert.alert('Delete', 'This record will be deleted.', [{ text: 'Continue', onPress: () => { alert('Archived!'); navigation.goBack() } },
                          { text: 'Cancel', onPress: () => { } }])
                        }} icon="trash-can-outline" title="Delete Record" />
                        <Divider />
                        <Menu.Item onPress={() => { closeMenu(); navigation.navigate("ShareHoldersLedger") }} icon="folder-plus-outline" title="Add Transaction" />
                        <Divider />
                        <Menu.Item onPress={() => { closeMenu(); navigation.navigate("ShareHoldersLedger") }} icon="folder-table-outline" title="Shareholders Ledger" />
                      </Menu>
                    </View>
                  </Provider>

                }
              </View>
            }
          </View>

          {/* Summary cards */}

            <View style={[{ paddingTop: 15, flexDirection: 'column', justifyContent: 'space-between' }]}>
            <Card.Content>
            <Title>Available Shares {availableShares}</Title>
        </Card.Content>
        <Card.Content>
            <Title>Total Amount Of Shares {sharesTotalAmt}</Title>
        </Card.Content>
        <Card.Content>
            <Title>Value Per Share {valuePerShare}</Title>
        </Card.Content>
            </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Member (Shareholder):</Text>
            <TextInput
              value={member}
              onChangeText={setMember}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Member (Shareholder):</Text>
            <TextInput
              value={memberAddress}
              onChangeText={setMemberAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Entry as Member (Shareholder):</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfEntryPicker} onKeyPress={showDateOfEntryPicker} label="Date of Entry" placeholder="Date of Entry"
              value={dateOfEntry == '' ? '' : formatTheDateLabel(dateOfEntry)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfEntryPickerVisible}
              mode="date"
              date={dateOfEntry}
              onConfirm={handleDateOfEntryConfirm}
              onCancel={hideDateOfEntryPicker}
            />
          </View>
          <Text style={[editMode ? styles.cardTitleEdit : styles.cardTitle, { paddingTop: 15 }]}>Shares:</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[{ flex: 1 }]}>
              <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Cert No.</Text>
              <TextInput

                value={certNo}
                onChangeText={setCertNo}
                style={editMode ? styles.textInputEdit : styles.textInput}
                editable={editMode}>
              </TextInput>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares No.</Text>
              <TextInput

                value={sharesNo}
                onChangeText={setSharesNo}
                style={editMode ? styles.textInputEdit : styles.textInput}
                editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>From whom shares were transfered:</Text>
            <View style={editMode ? [styles.pickerEdit, { marginHorizontal: 10 }] : styles.picker}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: "Select Transfer Type", value: null }}
                onValueChange={(value) => setTransferType(value)}
                items={[
                  { label: "Allotment / Original Issue", value: "original_issue" },
                  { label: "Transfer from Someone", value: "from_someone" },
                ]}
                disabled={!editMode}
                value={transferType}
                style={pickerStyle}
              />
            </View>
            <View style={{ marginTop: actuatedNormalize(5) }}>
              {transferType == "original_issue" &&
                <TextInput
                  placeholder='Allotment / Original Issue'
                  value={`Allotment / Original Issue value: ${originalIssue}`}
                  onChangeText={setOriginalIssue}
                  style={editMode ? styles.textInputEdit : styles.textInput}
                  editable={editMode}>
                </TextInput>}
              {transferType == "from_someone" &&
                <TextInput
                  placeholder='From Someone'
                  value={`From: ${transferFrom}`}
                  onChangeText={setTransferFrom}
                  style={editMode ? styles.textInputEdit : styles.textInput}
                  editable={editMode}>
                </TextInput>}
            </View>
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
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showTransferDatePicker} onKeyPress={showTransferDatePicker} label="Date of Transfer" placeholder="Date of Transfer"
              value={transferDate == '' ? '' : formatTheDateLabel(transferDate)} />
            <DateTimePickerModal
              isVisible={isTransferDateVisible}
              mode="date"
              date={transferDate}
              onConfirm={handleTransferConfirm}
              onCancel={hideTransferDatePicker}
            />
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

          {!editMode ?
            <View style={{ paddingTop: 15, flexDirection: 'row', paddingBottom: 25 }}>
              <Text style={styles.cardTitle}>Relevant Documents: </Text>
              <Text>{attachmentNo}</Text>
            </View>
            :
            <View style={[{ paddingTop: 15 }]}>
              <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Attach Relevant Documents:</Text>

              <TouchableOpacity onPress={() => handleAdd(uploads, setUploads, setValidUploads)} style={[{ backgroundColor: "green", marginVertical: 10 }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Add Upload`}</Text>
              </TouchableOpacity>

              {uploads.map((field, idx) => {
                return (
                  <View key={`${field}-${idx}`} style={{
                    // borderRadius: 1, borderWidth: .3, borderStyle: 'dashed',
                    // borderColor: 'green',
                    marginBottom: 10,
                  }}>

                    <View style={editMode ? [styles.pickerEdit, { marginHorizontal: 10 }] : styles.picker}>
                      <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select Document Type", value: null }}
                        onValueChange={(val) => {
                          handleChangeInput(idx, val, 'Type', uploads, setUploads, setValidUploads);
                        }}
                        items={documentTypes}
                        disabled={!editMode}
                        value={uploads[idx]['Type']}
                        style={pickerStyle}
                      />
                    </View>

                    <View style={[styles.action3]}>
                      <TouchableOpacity onPress={() => selectOneFile(idx)}>
                        <TextInput style={{ fontSize: 17 }} onFocus={() => selectOneFile(idx)}
                          label="attachments" placeholder="Click here to upload document" onChangeText={() => selectOneFile(idx)}
                          value={uploads[idx]['Document'].name} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => handleRemove(idx, uploads, setUploads, setValidUploads)} style={[{
                      backgroundColor: "red",
                      justifyContent: 'center',
                      margin: 5,
                      alignSelf: 'flex-end',
                    }, styles.button2]}>
                      <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Remove`}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

            </View>}
          {entryId ?
            editMode ? <View style={styles.button}>
              <TouchableOpacity onPress={() => submitRecord()} style={[{ backgroundColor: colors.button }, styles.buttons]}>
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

              <TouchableOpacity onPress={submitRecord} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}>{`Create`}</Text>
              </TouchableOpacity>
            </View>}
        </ScrollView>}
    </View>
  );
};

export default RegisterOfShareHolders;
