import React, { Component } from 'react';
import { View, Text, TextInput,  StyleSheet, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Subtitle ,  Tab, Tabs, ScrollableTab } from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

import {addShop,  startAddShop, getShops} from '../../store/actions/index'
import Icon from 'react-native-vector-icons/FontAwesome5';
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'
import { TouchableOpacity } from 'react-native-gesture-handler';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBcs4ko-dTv7DhkZWp0BbcTs0z2nodA4y8'; // never save your real api key in a snack!

Geocoder.init(GOOGLE_PLACES_API_KEY);


class AddShop extends Component {

    state ={
        modalVisible: false,
        inputLocation: {
          lat: '',
          lng: ''
        },
        controls: {
                shopName: {
                  value: "",
                  valid: false,
                  touched: false,
                  validationRules: {
                    notEmpty: true
                  }

                },
                shopDetail: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                      notEmpty: true
                    }
  
                  },
                location: {
                    value: null,
                    valid: false
                },
            }
    }

    shopNameManualChangedHandler = (val) => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            shopName: {
              ...prevState.controls.shopName,
              value: val,
              valid: validate(val, prevState.controls.shopName.validationRules),
              touched: true
            }
          }
        };
      });
    }

    shopNameChangedHandler = (val) => {
        console.log(val)
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                shopName: {
                  ...prevState.controls.shopName,
                  value: val,
                  valid: validate(val, prevState.controls.shopName.validationRules),
                  touched: true
                }
              }
            };
          });
        Geocoder.from(val)
        .then(json => {
            var location = json.results[0].geometry.location;
            this.setState({
              inputLocation: {
                lat: location.lat,
                lng: location.lng
              }
            })
            this.locationPicker.changeState(location);
        })
        .catch(error => console.warn(error));
        
    }

    modalVisibleHandler = () => {
      this.setState(prevState => {
        return {
          modalVisible: prevState.modalVisible ? false: true
        }
      })
    }

    modalAddHandler = () => {
      
    }

    shopDetailChangedHandler = (val) => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                shopDetail: {
                  ...prevState.controls.shopDetail,
                  value: val,
                  valid: validate(val, prevState.controls.shopDetail.validationRules),
                  touched: true
                }
              }
            };
          });
    }

    reset = () => {
        this.setState({
            modalVisible: false,
            controls: {
                shopName: {
                  value: "",
                  valid: false,
                  touched: false,
                  validationRules: {
                    notEmpty: true
                  }

                },
                shopDetail: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                      notEmpty: true
                    }
  
                  },
                location: {
                    value: null,
                    valid: false
                },
            }
        })
    }

    componentDidMount(){
        this.reset()
    }

    componentDidUpdate(){
        //console.log('test',this.props.navigation)
        // if(this.props.shopAdded){
        //     this.props.navigation.navigate('FindShop')
        //     this.props.onStartAddShop()
        // }
    }

    locationPickedHandler = location => {
      this.setState(prevState => {
          return{
              controls: {
                  ...prevState.controls,
                  location: {
                      value: location,
                      valid: true
                  }
              }
          }
      })
  }

    shopAddedHandler = () => {
        this.props.onAddShop(this.state.controls.shopName.value, this.state.controls.shopDetail.value, this.state.controls.location.value)
        alert(`You added ${this.state.controls.shopName.value}`)
        this.reset()
        this.locationPicker.reset()
        this.props.onLoadShops()
    }

    render() {

        let submitButton = (
        <DefaultButton  
        color='black' 
        onPress={this.shopAddedHandler}
        disabled= {!this.state.controls.shopName.valid || !this.state.controls.location.valid}
        >
          AddShop
        </DefaultButton>
        )

        if(this.props.isLoading){
            submitButton = <ActivityIndicator color='black'/>
        }

        let placeInput = 'Your shop name'

        if(this.state.controls.shopName.value){
          placeInput = this.state.controls.shopName.value
        }

        return (
  
            
              <ScrollView keyboardShouldPersistTaps='always'>
                <View  style={styles.container}>
                <Text style={styles.headerTitle}> Add your shop </Text>
                <View style={styles.placeInputView}>
                <DefaultInput
                placeholder= {placeInput}
                onChangeText= {this.shopNameManualChangedHandler} 
                value={this.state.controls.shopName.value}
                style={styles.inputFieldPlace}
                />   
                <DefaultButton  
                  color='black' 
                  onPress={this.modalVisibleHandler}
                  style= {styles.inputFieldPlaceButton}
                  >
                    Search
                </DefaultButton>
                </View>
                <Modal isVisible={this.state.modalVisible} style={styles.modal} >
                <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                  <Left>
                    <Button transparent>
                      <Icon name="map" size={30} color="white" />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Search your shop </Title>
                  </Body>
                </Header>
                <GooglePlacesAutocomplete
                  //onChangeText= {this.shopNameChangedHandler} 
                  //value={this.state.controls.shopName.value}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en', // language of the results
                    components: 'country:lk',
                  }}
                  onPress={( data,details = null) => {
                    console.log(data, details)
                    this.shopNameChangedHandler(data.description)
                  }}
                  //onPress={console.log(query)}
                  listViewDisplayed={false}  
                  
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
                  }}/>
                <DefaultButton  
                  color='green' 
                  onPress={this.modalVisibleHandler}
                  >
                    Set Location
                </DefaultButton>
                </Modal>
                <DefaultInput
                placeholder= 'Your shop details'
                onChangeText= {this.shopDetailChangedHandler} 
                multiline = {true}
                numberOfLines= {5}
                style={styles.inputField}
                value={this.state.controls.shopDetail.value}
                />  
                <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => this.locationPicker = ref}
                lat={this.state.inputLocation.lat}
                lng={this.state.inputLocation.lng}
                />
                <View style={styles.button}>
                    {submitButton}
                </View>
                </View>
                </ScrollView>
    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 15
    },  
    modal: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      flex: 1,
      padding: 10
    },
    placeInput: {
      width: '100%'
    },
    placeInputView: {
      flexDirection: 'row'
    },  
    headerTitle: {
      fontSize: 25,
      textTransform: 'capitalize',
      fontWeight: 'bold'
    },
    shopholder:{
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: '#eee',
        width: '80%',
        height: 150,
        borderRadius: 15
    },
    button: {
        margin: 8
    },
    previewImage:{
       width: '100%',
       height: '100%',
       borderRadius: 15
    },
    inputField: {
        borderColor: 'black'
    },
    inputFieldPlace: {
      borderColor: 'black',
      width: '75%'
  },
  inputFieldPlaceButton: {
    width: '25%',
    //height: '20%'
}
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        shopAdded: state.shops.shopAdded,
        shops: state.shops.shops
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddShop: (shopName, location,image) => dispatch(addShop(shopName, location, image)),
        onStartAddShop: () => dispatch(startAddShop()),
        onLoadShops: () => dispatch(getShops())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddShop);

//export default AddShop;