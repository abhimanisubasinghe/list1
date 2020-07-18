import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {addShop,  startAddShop} from '../../store/actions/index'

import PickImage from '../../components/PickImage/PickImage'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

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
                image: {
                    value: null,
                    valid: false
                }
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
        // if(this.props.shopAdded){
        //     this.props.navigation.navigate('FindShop')
        //     this.props.onStartAddShop()
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

    shopAddedHandler = () => {
        this.props.onAddShop(this.state.controls.shopName.value, this.state.controls.shopDetail.value, this.state.controls.image.value)
        alert(`You added ${this.state.controls.shopName.value}`)
        this.reset()
        this.imagePicker.reset()
        //this.locationPicker.reset()
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

        if(this.props.isLoading){
            submitButton = <ActivityIndicator color='black'/>
        }

        return (
            <ScrollView >
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        shopAdded: state.shops.shopAdded
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddShop: (shopName, location,image) => dispatch(AddShop(shopName, location, image)),
        onStartAddShop: () => dispatch(startAddShop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddShop);

// export default AddShop;