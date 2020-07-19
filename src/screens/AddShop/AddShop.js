import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import {addShop,  startAddShop} from '../../store/actions/index'

import PickLocation from '../../components/PickLocation/PickLocation'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

const GOOGLE_PLACES_API_KEY = 'AIzaSyBcs4ko-dTv7DhkZWp0BbcTs0z2nodA4y8'; // never save your real api key in a snack!


class AddShop extends Component {

    state ={
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

    shopNameChangedHandler = (val) => {
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
        //this.props.onAddShop(this.state.controls.shopName.value, this.state.controls.shopDetail.value, this.state.controls.image.value)
        alert(`You added ${this.state.controls.shopName.value}`)
        this.reset()
        this.locationPicker.reset()
    }

    render() {

        let submitButton = (
        <Button 
        title='Add shop' 
        color='black' 
        onPress={this.shopAddedHandler}
        disabled= {!this.state.controls.shopName.valid}
        />
        )

        // if(this.props.isLoading){
        //     submitButton = <ActivityIndicator color='black'/>
        // }

        return (
            
              <View style={styles.container}>
                <Text style={styles.headerTitle}> Add your shop </Text>
                <DefaultInput
                placeholder= 'Your shop name'
                onChangeText= {this.shopNameChangedHandler} 
                value={this.state.controls.shopName.value}
                style={styles.inputField}
                />   
               
                <DefaultInput
                placeholder= 'Your shop details'
                onChangeText= {this.shopDetailChangedHandler} 
                multiline = {true}
                numberOfLines= {5}
                style={styles.inputField}
                value={this.state.controls.shopDetail.value}
                />  
                <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => this.locationPicker = ref}/>
                <View style={styles.button}>
                    {submitButton}
                </View>
                </View>
    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10
    },  
    placeInput: {
      width: '100%'
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
    }
})

// const mapStateToProps = state => {
//     return {
//         isLoading: state.ui.isLoading,
//         shopAdded: state.shops.shopAdded
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onAddShop: (shopName, location,image) => dispatch(AddShop(shopName, location, image)),
//         onStartAddShop: () => dispatch(startAddShop())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps) (AddShop);

export default AddShop;