import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyles';

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }
  onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    console.log(e.data);
    // if (check === 'http') {
    //   Linking.openURL(e.data).catch(err =>
    //     console.error('An error occured', err),
    //   );
    // } else {
    //   this.setState({
    //     result: e,
    //     scan: false,
    //     ScanResult: true,
    //   });
    // }
  };
  activeQR = () => {
    this.setState({scan: true});
  };
  scanAgain = () => {
    this.setState({scan: true, ScanResult: false});
  };
  componentDidMount() {
    this.activeQR();
  }
  render() {
    const {scan, ScanResult, result} = this.state;
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <View style={styles.header}>
            <Button
              onPress={() => BackHandler.exitApp()}
              icon={{source: 'power', direction: 'rtl'}}
              textColor="white"></Button>
            <Text style={styles.textTitle}>Scan QR Code</Text>
          </View>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Image
                source={require('../asset/cameram.png')}
                style={{height: 36, width: 36, color: '#03426e'}}></Image>
              <Text numberOfLines={8} style={styles.descText}>
                Please move your camera {'\n'} over the QR Code
              </Text>
              <Image
                source={require('../asset/qrcodeimage.png')}
                style={{margin: 5, height: 150, width: 200}}></Image>
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
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonScan}>
                  <View style={styles.buttonWrapper}>
                    <Button
                      onPress={() => BackHandler.exitApp()}
                      icon={{source: 'camera', direction: 'rtl'}}>
                      Press me
                    </Button>
                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                      Click to scan again
                    </Text>
                  </View>
                </TouchableOpacity>
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
              bottomContent={
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#767571',
                    padding: 10,
                    padingTop: 10,
                    marginBottom: 30,
                    marginTop: 0,
                    borderRadius: 20,
                  }}>
                  <Button
                    icon={({size}) => (
                      <Image
                        source={require('../asset/flashlight.png')}
                        style={{
                          width: size + 40,
                          height: size + 20,
                          tintColor: '#03426e',
                        }}
                      />
                    )}
                    style={{borderLeft: 1}}
                  />
                  <Button
                    onPress={() => this.scanner.reactivate()}
                    onLongPress={() => this.setState({scan: false})}
                    icon={({size}) => (
                      <Image
                        source={require('../asset/cameram.png')}
                        style={{
                          width: size + 10,
                          height: size + 10,
                          tintColor: '#03426e',
                          marginTop: 6,
                        }}
                      />
                    )}
                    style={{borderLeft: 1}}
                  />
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
export default Scan;
