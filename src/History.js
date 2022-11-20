import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {_fetchApi, _postApi} from './helper';
import styles from './ScanStyles';

export default function History() {
  const [list, setList] = useState([]);
  const getScanHistory = useCallback(async () => {
    const value = await AsyncStorage.getItem('@@drugcipherid');
    _fetchApi(
      `/v1/get-scan-history?id=${value}&query_type=history`,
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
  const book = item => {
    _postApi(
      '/v1/bookmark-api',
      {index: item},
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  };
  const bookMark = _ind => {
    let arr = [];
    list &&
      list.forEach((item, index) => {
        if (_ind === index) {
          arr.push({...item, bookmark: true});
          book(item.index);
        } else {
          arr.push(item);
        }
      });
  };
  useEffect(() => {
    getScanHistory();
  }, [getScanHistory]);
  return (
    <View style={styles.scrollViewStyle}>
      <Text style={styles.textTitle3}>DrugCipher</Text>
      <View style={styles.cardVew3}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {list.length ? (
              list.map((item, key) => (
                <List.Item
                  key={key}
                  title={
                    <View style={styles.cont2}>
                      <Text>{item.manufcturer_name}</Text>
                      <Text style={{marginLeft: 120}}>
                        {moment(item.date).startOf('hour').fromNow()}
                      </Text>
                    </View>
                  }
                  onPress={() => {
                    bookMark(key);
                  }}
                  description={`${item.drug_brand_name} ${item.generic_name}`}
                  right={props => (
                    <List.Icon
                      {...props}
                      icon={item.bookmark ? 'bookmark' : 'bookmark-outline'}
                      color="#03426e"
                    />
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
