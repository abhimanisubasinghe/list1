import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
//import {addPlace,  startAddPlace} from '../../store/actions/index'

import PickImage from '../../components/PickImage/PickImage'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ShareProduct extends Component {

    state ={
        controls: {
                productName: {
                  value: "",
                  valid: false,
                  touched: false,
                  validationRules: {
                    notEmpty: true
                  }

                },
                productDetail: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                      notEmpty: true
                    }
  
                  },
                image: {
                    value: null,
                    valid: false
                }
            }
    }

    productNameChangedHandler = (val) => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                productName: {
                  ...prevState.controls.productName,
                  value: val,
                  valid: validate(val, prevState.controls.productName.validationRules),
                  touched: true
                }
              }
            };
          });
    }

    productDetailChangedHandler = (val) => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                productDetail: {
                  ...prevState.controls.productDetail,
                  value: val,
                  valid: validate(val, prevState.controls.productDetail.validationRules),
                  touched: true
                }
              }
            };
          });
    }

    reset = () => {
        this.setState({
            controls: {
                productName: {
                  value: "",
                  valid: false,
                  touched: false,
                  validationRules: {
                    notEmpty: true
                  }

                },
                productDetail: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                      notEmpty: true
                    }
  
                  },
                image: {
                    value: null,
                    valid: false
                }
            }
        })
    }

    componentDidMount(){
        this.reset()
    }

    componentDidUpdate(){
        //console.log('test',this.props.navigation)
        // if(this.props.placeAdded){
        //     this.props.navigation.navigate('FindPlace')
        //     this.props.onStartAddPlace()
        // }
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return{
                controls: {
                    ...prevState.controls,
                    image:{
                        value: image,
                        valid: true 
                    }
                }
            }
        })
    }

    placeAddedHandler = () => {
       // this.props.onAddPlace(this.state.controls.productName.value, this.state.controls.location.value, this.state.controls.image.value)
        alert(`You added ${this.state.controls.productName.value}`)
        this.reset()
        this.imagePicker.reset()
        //this.locationPicker.reset()
    }

    render() {

        let submitButton = (
        <Button 
        title='Add product' 
        color='black' 
        onPress={this.placeAddedHandler}
        disabled= {!this.state.controls.productName.valid}
        />
        )

        // if(this.props.isLoading){
        //     submitButton = <ActivityIndicator color='black'/>
        // }

        return (
            <ScrollView >
                <View style={styles.container}>
                <Text> Add your product </Text>
                <DefaultInput
                placeholder= 'Your product name'
                onChangeText= {this.productNameChangedHandler} 
                value={this.state.controls.productName.value}
                style={styles.inputField}
                />    
                <DefaultInput
                placeholder= 'Your product details'
                onChangeText= {this.productDetailChangedHandler} 
                multiline = {true}
                numberOfLines= {5}
                style={styles.inputField}
                value={this.state.controls.productDetail.value}
                />  
                <PickImage onImagePick={this.imagePickedHandler} ref={ref => this.imagePicker = ref}/>
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
        padding: 10
    },  
    placeholder:{
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
//         placeAdded: state.places.placeAdded
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onAddPlace: (productName, location,image) => dispatch(addPlace(productName, location, image)),
//         onStartAddPlace: () => dispatch(startAddPlace())
//     }
// }

//export default connect(mapStateToProps, mapDispatchToProps) (ShareProduct);

export default ShareProduct;