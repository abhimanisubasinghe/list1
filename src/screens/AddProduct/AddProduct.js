import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {addProduct, startAddProduct, getProducts, getUserProducts} from '../../store/actions/index'

import PickImage from '../../components/PickImage/PickImage'
import validate from '../../utils/validation'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import Alerts from '../../components/Alerts/Alerts'

class AddProduct extends Component {

    state ={
        errorAlert: false,
        errorMsg: '',
        successAlert: false,
        successMsg: '',
        infoAlert:false,
        infoMsg: '',
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

    showErrorAlert = (msg) => {
      this.setState(prevState => {
        return{
            errorMsg: msg,
            errorAlert: true
        }
      })
    }
  
    hideErrorAlert = () => {
      this.setState(prevState => {
        return{
          errorMsg: '',
            errorAlert: false
        }
      })
    }
  
  showSuccessAlert = (msg) => {
  this.setState(prevState => {
      return{
          successMsg: msg,
          successAlert: true
      }
  })
  }

  hideSuccessAlert = ()  => {
  this.setState(prevState => {
      return{
          successMsg: '',
          successAlert: false
      }
  })
  }  

  showInfoAlert = (msg) => {
      this.setState(prevState => {
          return{
              infoMsg: msg,
              infoAlert: true
          }
      })
      }
  
  hideInfoAlert = ()  => {
  this.setState(prevState => {
      return{
          infoMsg: '',
          infoAlert: false
      }
  })
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
            errorAlert: false,
            errorMsg: '',
            successAlert: false,
            successMsg: '',
            infoAlert:false,
            infoMsg: '',
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
        //console.log('product owner',this.props.user.Id)
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
        //console.log(this.props.user.Id)
        if(this.state.controls.image.value && this.state.controls.productName.value && this.state.controls.productDetail.value){
          this.showInfoAlert(`Product successfully added`)
          this.props.onAddProduct(this.state.controls.productName.value, this.state.controls.productDetail.value, this.state.controls.image.value,this.props.email)
          this.reset()
          this.imagePicker.reset()
        }
        else{
          this.showErrorAlert('Validation Error!')
        }
        //this.props.onLoadProducts()
        //console.log(this.props.products)
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
                <Alerts alert={this.state.successAlert} onHideAlert={() => this.hideSuccessAlert()} type='success' message={this.state.successMsg} title='Success!'/>
                  <Alerts alert={this.state.errorAlert} onHideAlert={() => this.hideErrorAlert()} type='error' message={this.state.errorMsg} title='Error!'/>
                  <Alerts alert={this.state.infoAlert} onHideAlert={() => this.hideInfoAlert()} type='error' message={this.state.infoMsg} title='Info!'/>
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
        productAdded: state.products.productAdded,
        products: state.products.products,
        email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddProduct: (productName, location,image, userId) => dispatch(addProduct(productName, location, image, userId)),
        onStartAddProduct: () => dispatch(startAddProduct()),
        onLoadProducts: () => dispatch(getProducts()),
        onLoadUserProducts: (userId) => dispatch(getUserProducts(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddProduct);

// export default AddProduct;