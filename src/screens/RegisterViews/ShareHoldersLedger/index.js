import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList
} from 'react-native';
import {
  Text
} from "@99xt/first-born";
import actuatedNormalize from '../../../helpers/actuatedNormalize';
import ROShareHoldersCard from '../../../components/RegisterCards/ROShareHoldersCard';
import { rOShareHolders } from '../../../model/records';

const ShareHoldersLedger = ({ route, navigation, props }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // setData(rOShareHolders);
    setLoading(false)
  })

  const renderSpecificItem = (item) =>{
    return (
      <ROShareHoldersCard
        item={item}
        onOpen={() => {}}
      />
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <SafeAreaView>
          <View
              style={[{ alignItems: 'center', paddingTop: actuatedNormalize(50) }]}>
          <Text style={{ fontSize: 18, color: 'gray', marginBottom: 50 }}>{`List of ledgers:`}</Text>

          <Text style={{ fontSize: 18, color: 'gray' }}>{`Name of member: __`}</Text>
              </View>

          {/* {!data ?
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
              renderItem={({ item }) => renderSpecificItem(item)} />} */}
        </SafeAreaView>
      }
    </View>
  );
};

export default ShareHoldersLedger;

const { height } = Dimensions.get("screen");
const weight_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  footer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30
  },
  logo: {
    width: weight_logo,
  },
  title: {
    color: "#646464",
    fontSize: actuatedNormalize(18),
    paddingHorizontal: actuatedNormalize(26)
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
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
    fontWeight: 'bold'
  }
});