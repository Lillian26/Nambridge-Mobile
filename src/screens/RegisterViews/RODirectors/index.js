import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rODirectors } from '../../../model/records';
// import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const RODirectors = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [director, setDirector] = useState("")  
  const [nationality, setNationality] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState(defaultDate);
  const [isDateOfBirthPickerVisible, setDateOfBirthPickerVisibility] = useState(false);
  const [directorAddress, setDirectorAddress] = useState("")
  const [officeHeld, setOfficeHeld] = useState("")
  const [appointmentDate, setAppointmentDate] = useState(defaultDate);
  const [isAppointmentDateVisible, setAppointmentDateVisibility] = useState(false);
  const [resignationDate, setResignationDate] = useState(defaultDate);
  const [isResignationDateVisible, setResignationDateVisibility] = useState(false);
  const [appBoardResolnDate, setAppBoardResolnDate] = useState(defaultDate);
  const [isAppBoardResolnDateVisible, setAppBoardResolnVisibility] = useState(false);
  const [cessationDate, setCessationDate] = useState(defaultDate);
  const [isCessationDateVisible, setCessationDateVisibility] = useState(false);
  const [cessationReason, setCessationReason] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common
  

// -------------------------- handlers for Date of Resignation Picker --------------------------------------------

const showResignationDatePicker = () => {
  setResignationDateVisibility(true);
};

const hideResignationDatePicker = () => {
  setResignationDateVisibility(false);
};

const handleResignationConfirm = (e) => {
  hideResignationDatePicker();
  var date = new Date(e);

  if (isNaN(date.getTime())) {
    setResignationDate(defaultDate)
  }
  else {
    setResignationDate(date)
  }
};

// -------------------------- handlers for Date of Cessation Picker --------------------------------------------

const showCessationDatePicker = () => {
  setCessationDateVisibility(true);
};

const hideCessationDatePicker = () => {
  setCessationDateVisibility(false);
};

const handleCessationConfirm = (e) => {
  hideCessationDatePicker();
  var date = new Date(e);

  if (isNaN(date.getTime())) {
    setCessationDate(defaultDate)
  }
  else {
    setCessationDate(date)
  }
};

// -------------------------- handlers for Date of Appointment Board Resoln Picker --------------------------------------------

  const showAppBoardResolnPicker = () => {
    setAppBoardResolnVisibility(true);
  };

  const hideAppBoardResolnPicker = () => {
    setAppBoardResolnVisibility(false);
  };

  const handleAppBoardResolnConfirm = (e) => {
    hideAppBoardResolnPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setAppBoardResoln(defaultDate)
    }
    else {
      setAppBoardResoln(date)
    }
  };

  // -------------------------- handlers for Date of Appointment Picker --------------------------------------------


  const showAppointmentDatePicker = () => {
    setAppointmentDateVisibility(true);
  };

  const hideAppointmentDatePicker = () => {
    setAppointmentDateVisibility(false);
  };

  const handleAppointmentConfirm = (e) => {
    hideAppointmentDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setAppointmentDate(defaultDate)
    }
    else {
      setAppointmentDate(date)
    }
  };

  // -------------------------- handlers for Date of Birth Picker --------------------------------------------

  const showDateOfBirthPicker = () => {
    setDateOfBirthPickerVisibility(true);
  };

  const hideDateOfBirthPicker = () => {
    setDateOfBirthPickerVisibility(false);
  };

  const handleDateOfBirthConfirm = (e) => {
    hideDateOfBirthPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfBirth(defaultDate)
    }
    else {
      setDateOfBirth(date)
    }
  };

  useEffect(() => {
    fetchDocumentTypes( docTypes, setDocumentTypes)

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
    var theRecord = rODirectors.find(x => x.id == entryId);
    setRecord("Register of Directors");
    setDirector(theRecord.director);
    setDirectorAddress(theRecord.director_address);
    setDateOfBirth(new Date(theRecord.date_of_birth));
    setNationality(theRecord.nationality);
    setOfficeHeld(theRecord.office_held)
    setAppointmentDate(new Date(theRecord.appointment_date));
    setResignationDate(new Date(theRecord.resignation_date));
    setAppBoardResolnDate(new Date(theRecord.date_resolution_appointment));
    setCessationDate(new Date(theRecord.office_cessation_date));
    setCessationReason(theRecord.cessation_reason)
    setAttachmentNo(theRecord.no_of_attachments)

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading

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

          <MenuGroup recordName={record} entryId={entryId} editMode={editMode} visible={visible} setEditMode={setEditMode} closeMenu={closeMenu} openMenu={openMenu}
          navigation={navigation} />

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Director:</Text>
            <TextInput
              value={director}
              onChangeText={setDirector}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Nationality:</Text>
            <TextInput
              value={nationality}
              onChangeText={setNationality}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Birth:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfBirthPicker} onKeyPress={showDateOfBirthPicker} label="Date of Entry" placeholder="Date of Entry"
              value={dateOfBirth == '' ? '' : formatTheDateLabel(dateOfBirth)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfBirthPickerVisible}
              mode="date"
              date={dateOfBirth}
              onConfirm={handleDateOfBirthConfirm}
              onCancel={hideDateOfBirthPicker}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address:</Text>
            <TextInput
              value={directorAddress}
              onChangeText={setDirectorAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Office Held:</Text>
            <TextInput
              value={officeHeld}
              onChangeText={setOfficeHeld}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Appointment Effective Date:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showAppointmentDatePicker} onKeyPress={showAppointmentDatePicker} 
              value={appointmentDate == '' ? '' : formatTheDateLabel(appointmentDate)} />
            <DateTimePickerModal
              isVisible={isAppointmentDateVisible}
              mode="date"
              date={appointmentDate}
              onConfirm={handleAppointmentConfirm}
              onCancel={hideAppointmentDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Resignation Effective Date:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showResignationDatePicker} onKeyPress={showResignationDatePicker} label="Resignation Effective Date" placeholder="Date of Transfer"
              value={resignationDate == '' ? '' : formatTheDateLabel(resignationDate)} />
            <DateTimePickerModal
              isVisible={isResignationDateVisible}
              mode="date"
              date={resignationDate}
              onConfirm={handleResignationConfirm}
              onCancel={hideResignationDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Board Resolution in which appointment was made:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showAppBoardResolnPicker} onKeyPress={showAppBoardResolnPicker} label="Date of Board Resolution in which appointment was made" placeholder="Date of Transfer"
              value={appBoardResolnDate == '' ? '' : formatTheDateLabel(appBoardResolnDate)} />
            <DateTimePickerModal
              isVisible={isAppBoardResolnDateVisible}
              mode="date"
              date={appBoardResolnDate}
              onConfirm={handleAppBoardResolnConfirm}
              onCancel={hideAppBoardResolnPicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Cessation of Office:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showCessationDatePicker} onKeyPress={showCessationDatePicker} label="Date of Cessation of Office" placeholder="Date of Transfer"
              value={cessationDate == '' ? '' : formatTheDateLabel(cessationDate)} />
            <DateTimePickerModal
              isVisible={isCessationDateVisible}
              mode="date"
              date={cessationDate}
              onConfirm={handleCessationConfirm}
              onCancel={hideCessationDatePicker}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Reasons for Cessation of Office:</Text>
            <TextInput
              value={cessationReason}
              onChangeText={setCessationReason}
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

export default RODirectors ;
