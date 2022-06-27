import { Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { styles } from '../styles/common';
import { Menu, Divider, Provider } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";

export const MenuGroup = ({recordName, entryId, editMode, visible, setEditMode, closeMenu, openMenu, navigation}) => {

  return(
    <View style={{ padding: 4 }}>
    {!entryId ?
      <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline' }]}>{recordName}</Text>
      :
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', paddingTop: 20, }]}>{recordName}</Text>
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
  )
}