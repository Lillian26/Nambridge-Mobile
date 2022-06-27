import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, LogBox, Image, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rODebentures } from '../../../model/records';
import { Menu, Divider, Provider } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
// import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { formatTheDateLabel, defaultDate, formatTheDateText } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const RODebentures = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [debentureNo, setDebentureNo] = useState("")
  const [directorAddress, setDirectorAddress] = useState("")
  const [dateOfDebenture, setDateOfDebenture] = useState(defaultDate);
  const [isDateOfDebenturePickerVisible, setDateOfDebenturePickerVisibility] = useState(false);
  const [authoriznDate, setAuthoriznDate] = useState(defaultDate);
  const [isAuthoriznDateVisible, setAuthoriznDateVisibility] = useState(false);
  const [amountSecured, setAmountSecured] = useState("")
  const [debentureHolder, setDebentureHolder] = useState("")
  const [debentureHolderAddress, setDebentureHolderAddress] = useState("")
  const [propertyDesc, setPropertyDesc] = useState("")
  const [interestRatePerAnnum, setInterestRatePerAnnum] = useState("")
  const [interestPerAnnum, setInterestPerAnnum] = useState("")
  const [interestDueDate, setInterestDueDate] = useState(defaultDate);
  const [isInterestDueDateVisible, setInterestDueDateVisibility] = useState(false);
  const [redemptionDate, setRedemptionDate] = useState(defaultDate);
  const [isRedemptionDateVisible, setRedemptionVisibility] = useState(false);
  const [remarks, setRemarks] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common


  // -------------------------- handlers for Date of InterestDue Picker --------------------------------------------

  const showInterestDueDatePicker = () => {
    setInterestDueDateVisibility(true);
  };

  const hideInterestDueDatePicker = () => {
    setInterestDueDateVisibility(false);
  };

  const handleInterestDueConfirm = (e) => {
    hideInterestDueDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setInterestDueDate(defaultDate)
    }
    else {
      setInterestDueDate(date)
    }
  };

  // -------------------------- handlers for Date of Authorization Board Resoln Picker --------------------------------------------

  const showRedemptionPicker = () => {
    setRedemptionVisibility(true);
  };

  const hideRedemptionPicker = () => {
    setRedemptionVisibility(false);
  };

  const handleRedemptionConfirm = (e) => {
    hideRedemptionPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setRedemption(defaultDate)
    }
    else {
      setRedemption(date)
    }
  };

  // -------------------------- handlers for Date of Authorization Picker --------------------------------------------


  const showAuthoriznDatePicker = () => {
    setAuthoriznDateVisibility(true);
  };

  const hideAuthoriznDatePicker = () => {
    setAuthoriznDateVisibility(false);
  };

  const handleAuthorizationConfirm = (e) => {
    hideAuthoriznDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setAuthoriznDate(defaultDate)
    }
    else {
      setAuthoriznDate(date)
    }
  };

  // -------------------------- handlers for Date of Debenture Picker --------------------------------------------

  const showDateOfDebenturePicker = () => {
    setDateOfDebenturePickerVisibility(true);
  };

  const hideDateOfDebenturePicker = () => {
    setDateOfDebenturePickerVisibility(false);
  };

  const handleDateOfDebentureConfirm = (e) => {
    hideDateOfDebenturePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfDebenture(defaultDate)
    }
    else {
      setDateOfDebenture(date)
    }
  };

  // -------------------------------------------------------

  useEffect(() => {
    fetchDocumentTypes(docTypes, setDocumentTypes); //common
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
      setEditMode(true)
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoading(false)
  }, [editMode, loading]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getRecordDetails = () => {
    var theRecord = rODebentures.find(x => x.id == entryId);
    setRecord(theRecord);
    setDebentureNo(theRecord.debenture_no);
    setDateOfDebenture(new Date(theRecord.date_of_debenture));
    setAuthoriznDate(new Date(theRecord.debenture_authorization_date));
    setAmountSecured(theRecord.amount_secured)
    setDebentureHolder(theRecord.debenture_holder);
    setDebentureHolderAddress(theRecord.debenture_holder_address);
    setPropertyDesc(theRecord.property_charged_description);
    setInterestRatePerAnnum(theRecord.yearly_interest_rate)
    setInterestPerAnnum(theRecord.yearly_interest);
    setInterestDueDate(new Date(theRecord.date_interest_becoming_due));
    setRedemptionDate(new Date(theRecord.redemption_date));
    setRemarks(theRecord.remarks);
    setAttachmentNo(theRecord.no_of_attachments)

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading
  // Document attachment list component

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

    // alert('Saved!'); navigation.navigate('Home')
    Alert.alert("Saved!", "Record sucessfully saved!", [
      { text: 'Cancel', onPress: () => { navigation.goBack() } },
      { text: 'Go to Home', onPress: () => { navigation.navigate('Home') } }])
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 4 }}>
          <View style={{ padding: 4 }}>
            {!entryId ?
              <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline' }]}>Register of Directors</Text>
              :
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', paddingTop: 20, }]}>Register of Directors</Text>
                {editMode ? null :

                  <Provider>
                    <View
                      style={{
                        paddingTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 50,
                        marginBottom: visible ? 155 : 0
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
                      </Menu>
                    </View>
                  </Provider>

                }
              </View>
            }
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Number of Debenture (Series):</Text>
            <TextInput
              value={debentureNo}
              onChangeText={setDebentureNo}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Debenture (Series):</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfDebenturePicker} onKeyPress={showDateOfDebenturePicker} label="Date of Entry" placeholder="Date of Entry"
              value={dateOfDebenture == '' ? '' : formatTheDateLabel(dateOfDebenture)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfDebenturePickerVisible}
              mode="date"
              date={dateOfDebenture}
              onConfirm={handleDateOfDebentureConfirm}
              onCancel={hideDateOfDebenturePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Resolutions Authorizing the Issue of Debentures:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showAuthoriznDatePicker} onKeyPress={showAuthoriznDatePicker} 
              value={authoriznDate == '' ? '' : formatTheDateLabel(authoriznDate)} />
            <DateTimePickerModal
              isVisible={isAuthoriznDateVisible}
              mode="date"
              date={authoriznDate}
              onConfirm={handleAuthorizationConfirm}
              onCancel={hideAuthoriznDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Amount Secured:</Text>
            <TextInput
              value={amountSecured}
              onChangeText={setAmountSecured}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Debenture Holder:</Text>
            <TextInput
              value={debentureHolder}
              onChangeText={setDebentureHolder}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Debenture Holder:</Text>
            <TextInput
              value={debentureHolderAddress}
              onChangeText={setDebentureHolderAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Description of Property Charged:</Text>
            <TextInput
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Rate of Interest per Annum:</Text>
            <TextInput
              value={interestRatePerAnnum}
              onChangeText={setInterestRatePerAnnum}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Interest per annum:</Text>
            <TextInput
              value={interestPerAnnum}
              onChangeText={setInterestPerAnnum}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Interest Becoming Due:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showInterestDueDatePicker} onKeyPress={showInterestDueDatePicker} label="InterestDue Effective Date" placeholder="Date of Transfer"
              value={interestDueDate == '' ? '' : formatTheDateLabel(interestDueDate)} />
            <DateTimePickerModal
              isVisible={isInterestDueDateVisible}
              mode="date"
              date={interestDueDate}
              onConfirm={handleInterestDueConfirm}
              onCancel={hideInterestDueDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Redemption:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showRedemptionPicker} onKeyPress={showRedemptionPicker} label="Date of Redemption" placeholder="Date of Transfer"
              value={redemptionDate == '' ? '' : formatTheDateLabel(redemptionDate)} />
            <DateTimePickerModal
              isVisible={isRedemptionDateVisible}
              mode="date"
              date={redemptionDate}
              onConfirm={handleRedemptionConfirm}
              onCancel={hideRedemptionPicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Remarks:</Text>
            <TextInput
              value={remarks}
              onChangeText={setRemarks}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <OutroComponent editMode={editMode} attachmentNo={attachmentNo} uploads={uploads} setUploads={setUploads} setValidUploads={setValidUploads}
            handleAdd={handleAdd} handleChangeInput={handleChangeInput} handleRemove={handleRemove} selectOneFile={selectOneFile} navigation={navigation}
            submitRecord={submitRecord} setEditMode={setEditMode} entryId={entryId} documentTypes={documentTypes}/>
        </ScrollView>}
    </View>
  );
};

export default RODebentures;
