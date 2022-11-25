import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {_fetchApi} from './helper';
import styles from './ScanStyles';

export default function BookMark() {
  const [list, setList] = useState([]);
  const getScanHistory = useCallback(async () => {
    const value = await AsyncStorage.getItem('@@drugcipherid');
    _fetchApi(
      `/v1/get-scan-history?id=${value}&query_type=book`,
      res => {
        if (res.success) {
          setList(res.result);
        }
      },
      err => {
        console.log(err);
      },
    );
  }, []);
  useEffect(() => {
    getScanHistory();
  }, [getScanHistory]);
  return (
    <View style={styles.scrollViewStyle}>
      <Text style={styles.textTitle3}>DrugCipher Bookmark</Text>
      <View style={styles.cardVew3}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {list.length ? (
              list.map((item, key) => (
                <List.Item
                  key={key}
                  title={item.manufcturer_name}
                  description={`${item.drug_brand_name} ${item.generic_name}`}
                  right={props => (
                    <List.Icon {...props} icon={'bookmark'} color="#03426e" />
                  )}
                />
              ))
            ) : (
              <Text />
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
