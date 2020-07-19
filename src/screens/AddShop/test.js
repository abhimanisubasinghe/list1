import * as React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
//import Constants from 'expo-constants';
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, Tab, Tabs, ScrollableTab } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PickLocation from '../../components/PickLocation/PickLocation'

const GOOGLE_PLACES_API_KEY = 'AIzaSyBcs4ko-dTv7DhkZWp0BbcTs0z2nodA4y8';

class test extends React.Component {

    state = {
        locationText: '',
    }

    reset = () => {
        this.setState({
            locationText: ''
        })
    }

    locationTextHandler = val => {
        this.setState({
            locationText: val
        })

    }

    addLocation = () => {
        this.props.onLocationTextInput({
            locationText: val
        })
    }

    render(){
        return (
            <Modal style={styles.container}>
                <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                  <Left>
                    <Button transparent>
                      <Icon name="map" size={30} color="white" />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Set Location</Title>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.addLocation()}>
                      <Icon name="check-circle" size={30} color="white" />
                    </Button>
                  </Right>
                </Header>
              <GooglePlacesAutocomplete
                value = {this.state.locationText}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en', // language of the results
                }}
                onPress={(data, details = null) => console.log(data)}
                onFail={error => console.error(error)}
                requestUrl={{
                  url:
                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                  useOnPlatform: 'web',
                }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
              {/* <PickLocation /> */}
            </Modal>
          );
    }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '10%',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default test;
