import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { pickerStyle, styles } from '../styles/common';
import colors from '../assets/theme/colors';
import RNPickerSelect from "react-native-picker-select";

const OutroComponent = ({ editMode, attachmentNo, uploads, setUploads, setValidUploads, handleAdd, handleChangeInput, handleRemove
, selectOneFile, navigation, submitRecord, setEditMode, entryId, documentTypes }) => {

    return (
        <>
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

            { uploads.map((field, idx) => {
              return (
                <View key={`${field}-${idx}`} style={{
                  // borderRadius: 1, borderWidth: .3, borderStyle: 'dashed',
                  // borderColor: 'green',
                  marginBottom: 10,
                }}>

                  <View style={editMode ? [styles.pickerEdit, {marginHorizontal: 10}] : styles.picker}>
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
                    <TouchableOpacity onPress={() => selectOneFile(idx, uploads, setUploads, setValidUploads)}>
                      <TextInput style={{ fontSize: 17 }} onFocus={() => selectOneFile(idx, uploads, setUploads, setValidUploads)}
                        label="attachments" placeholder="Click here to upload document" onChangeText={() => selectOneFile(idx, uploads, setUploads, setValidUploads)}
                        value={uploads[idx]['Document'].name} />
                    </TouchableOpacity>
                  </View>

                    <TouchableOpacity onPress={() => handleRemove(idx, uploads, setUploads, setValidUploads)} style={[{ backgroundColor: "red",
                  justifyContent: 'center',
                  margin: 5,
                  alignSelf: 'flex-end', }, styles.button2]}>
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
        </>

    );
};

export default OutroComponent;
