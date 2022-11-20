import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator, Button} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyles';
import {RequestManager, HTTPTransport, Client} from '@open-rpc/client-js';
import Geolocation from 'react-native-geolocation-service';
import base64 from 'react-native-base64';
import whichCountry from 'which-country';
import {_postApi} from './helper';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      drugInfo: {},
      grant: false,
      location: false,
      isTorchOn: false,
      country: '',
      position: {},
      info: false,
    };
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You cannot use');
        this.setState(prev => ({...prev, grant: true}));
        return true;
      } else {
        this.setState(prev => ({...prev, grant: false}));
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  getLocation = () => {
    this.requestLocationPermission().then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState(p => ({
              ...p,
              country: whichCountry([
                parseInt(position.coords.longitude, 10),
                parseInt(position.coords.latitude, 10),
              ]),
              position: position,
              location: true,
            }));
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  verifyDrug = async id => {
    let arr = {id};
    let d_id = uuid.v4();
    const value = await AsyncStorage.getItem('@@drugcipherid');
    if (value === null) {
      await AsyncStorage.setItem('@@drugcipherid', d_id);
    }
    const stringifyObj = JSON.stringify(arr);
    const b64Str = base64.encode(stringifyObj);
    const transport = new HTTPTransport('https://rpc.testnet.near.org');
    const client = new Client(new RequestManager([transport]));
    this.getLocation();
    if (Platform.OS === 'android') {
      let net = NetInfo.fetch().then(isConnected => {
        if (isConnected) {
          return true;
        } else {
          return false;
        }
      });
      if (net) {
        this.setState(prev => ({...prev, info: true}));
        const result = await client.request({
          method: 'query',
          params: {
            request_type: 'call_function',
            finality: 'final',
            account_id: 'contract.drugcipher.testnet',
            method_name: 'view_drug_info',
            args_base64: b64Str,
          },
        });

        if (result.result) {
          this.setState({
            scan: false,
            ScanResult: true,
            drugInfo: JSON.parse(String.fromCharCode(...result.result)),
            info: false,
          });
          let data = JSON.parse(String.fromCharCode(...result.result));
          console.log(data);
          _postApi(
            '/v1/get-info',
            {
              ...data,
              ...this.state.position,
              d_id: await AsyncStorage.getItem('@@drugcipherid'),
              country: this.state.country,
            },
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            },
          );
        } else {
          this.setState(p => ({
            ...p,
            scan: false,
            ScanResult: true,
            info: false,
            check: true,
          }));
        }
      } else {
        Alert.alert('Please check your internet connection!');
      }
    }
  };

  onSuccess = e => {
    const {data} = e;
    if (data) {
      this.setState(prev => ({...prev, scan: false, ScanResult: true}));
      this.verifyDrug(data);
    }
  };
  activeQR = () => {
    this.setState(p => ({...p, scan: true}));
  };
  scanAgain = () => {
    this.setState(p => ({...p, scan: true, ScanResult: false}));
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {scan, ScanResult, drugInfo, info} = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <View style={styles.header}>
            {/* <Button
              onPress={() => BackHandler.exitApp()}
              icon={{source: 'power', direction: 'rtl'}}
              textColor="white"
            /> */}
            <Text style={styles.textTitle}>Drugcipher QR Code</Text>
          </View>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Image
                source={require('../asset/cameram.png')}
                style={{height: 36, width: 36, color: '#03426e'}}
              />
              <Text numberOfLines={8} style={styles.descText}>
                Please move your camera {'\n'} over the QR Code
              </Text>
              <Image
                source={require('../asset/qrcodeimage.png')}
                style={{margin: 5, height: 150, width: 200}}
              />
              <Button
                icon={{source: 'camera', direction: 'rtl'}}
                textColor="#03426e"
                onPress={this.activeQR}
                style={styles.buttonScan}>
                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                  Scan QR Code
                </Text>
              </Button>
            </View>
          )}
          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result</Text>
              <View style={styles.cardView2}>
                {info ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      animating={true}
                      color="#03426e"
                      size="large"
                    />
                  </View>
                ) : (
                  <Fragment>
                    <View style={styles.img}>
                      {!drugInfo.status ? (
                        <Image
                          source={require('../asset/success-icon-10.png')}
                          style={{height: 80, width: 80, color: '#03426e'}}
                        />
                      ) : (
                        <Image
                          source={require('../asset/error-icon.png')}
                          style={{height: 80, width: 80, color: '#03426e'}}
                        />
                      )}
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Drug Manufacturer:
                        <Text style={styles.color}>
                          {' '}
                          {drugInfo.manufcturer_name}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Drug Status:
                        <Text style={styles.color}>
                          {' '}
                          {!drugInfo.status ? 'Good' : 'Bad'}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Drug Name:{' '}
                        <Text style={styles.color}>
                          {' '}
                          {drugInfo.drug_brand_name}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Generic Name:{' '}
                        <Text style={styles.color}>
                          {' '}
                          {drugInfo.generic_name}
                        </Text>{' '}
                      </Text>
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Date Manufactured:
                        <Text style={styles.color}>
                          {' '}
                          {drugInfo.date_manufacture}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.cont}>
                      <Text style={styles.result}>
                        Expiry Date:
                        <Text style={styles.color}>
                          {' '}
                          {drugInfo.expiry_date}
                        </Text>
                      </Text>
                    </View>
                    {drugInfo.status ? (
                      <View style={styles.cont}>
                        <Text style={styles.result}>
                          <Text style={styles.color}>Remark:</Text>{' '}
                          {drugInfo.remark}
                        </Text>
                      </View>
                    ) : (
                      <Text />
                    )}
                    <View style={styles.cont1}>
                      <Button
                        icon="camera"
                        mode="contained"
                        buttonColor="#03426e"
                        onPress={this.scanAgain}>
                        Scan QR Code
                      </Button>
                      <Button
                        icon="cards-diamond-outline"
                        mode="contained"
                        buttonColor="#03426e"
                        onPress={() => console.log('Pressed')}>
                        Claim Tokens
                      </Button>
                    </View>
                  </Fragment>
                )}
              </View>
            </Fragment>
          )}
          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  Please move your camera {'\n'} over the QR Code
                </Text>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
export default Scan;
