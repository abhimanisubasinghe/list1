import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {addProduct,  startAddProduct} from '../../store/actions/index'

import PickImage from '../../components/PickImage/PickImage'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class AddProduct extends Component {

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
        // if(this.props.productAdded){
        //     this.props.navigation.navigate('FindProduct')
        //     this.props.onStartAddProduct()
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

    productAddedHandler = () => {
        this.props.onAddProduct(this.state.controls.productName.value, this.state.controls.productDetail.value, this.state.controls.image.value)
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
        onPress={this.productAddedHandler}
        disabled= {!this.state.controls.productName.valid}
        />
        )

        if(this.props.isLoading){
            submitButton = <ActivityIndicator color='black'/>
        }

        return (
            <ScrollView >
                <View style={styles.container}>
                <Text style={styles.headerTitle}> Add your product </Text>
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
    headerTitle: {
      fontSize: 25,
      textTransform: 'capitalize',
      fontWeight: 'bold'
    },
    productholder:{
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
        productAdded: state.products.productAdded
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddProduct: (productName, location,image) => dispatch(addProduct(productName, location, image)),
        onStartAddProduct: () => dispatch(startAddProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddProduct);

// export default AddProduct;