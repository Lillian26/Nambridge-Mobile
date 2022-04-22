import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';


const MenuCard = (props) => {

  const { menutab, onOpen } = props

  return (

    <Card containerStyle={styles.card}>
      <TouchableOpacity
        onPress={() => onOpen()}
        style={{ justifyContent: 'center' }}
      >
        <View style={styles.container}>
          {/* <View>
                        <Image
                            style={{width: 60, height: 60}}
                            source={menutab.image}
                        />
                    </View> */}
          {/* <View style={styles.titleView}> */}
          <Text style={styles.sector}>{menutab.name}</Text>
          {/* </View> */}
        </View>

        <Divider style={{ backgroundColor: '#808B96', marginVertical: 10 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.notes}>{'View more'}</Text>
        </View>
      </TouchableOpacity>
    </Card>

  );
}
export default MenuCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: 150,
  },
  container: {
    alignItems: 'center',
  },
  titleView: {
    // flex: 5,
  },
  notes: {
    fontSize: 15,
    color: '#99A3A4',
  },
  sector: {
    fontSize: 15,
    marginTop: 10,
    // fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize'
  }
});
