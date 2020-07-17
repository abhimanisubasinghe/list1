import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {updateProduct } from '../../store/actions/index'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class productUpdate  extends React.Component {

    state ={
        controls: {
                productName: {
                  value: this.props.product.productName,
                  valid: false,
                  touched: false,
                  validationRules: {
                    notEmpty: true
                  }

                },
                productDetail: {
                    value: this.props.product.productDescription,
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
    
    productUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.product.productKey)
        const productName = (this.state.controls.productName.value?this.state.controls.productName.value: this.props.product.productName )
        const productDescription = (this.state.controls.productDetail.value?this.state.controls.productDetail.value: this.props.product.productDescription )
        this.props.onUpdateProduct(this.props.product.productKey, productName, productDescription);
        this.reset()
        //this.props.product.navigation.dispatch(popAction);
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
            }
        })
    }

    componentDidMount(){
        this.reset()
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

    render(){
       // console.log(this.props.product)
        let updateButton = (
            <DefaultButton color='green' onPress= {this.productUpdateHandler}>
                  Update
            </DefaultButton>
        )

        if(this.props.isLoading){
            updateButton = <ActivityIndicator color='black'/>
        }

        return(
            <View>
                <TouchableHighlight>
            <Card style={styles.container} collapsable>
            <CardItem bordered>
                <Text style={styles.productName} >Updating: </Text>
                <Text style={styles.productDescription}>{this.props.product.productName}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <DefaultInput
                placeholder= {this.props.product.productName}
                onChangeText= {this.productNameChangedHandler} 
                value={this.state.controls.productName.value}
                style={styles.inputField}
                /> 
                <DefaultInput
                placeholder= {this.props.product.productDescription}
                onChangeText= {this.productDetailChangedHandler} 
                multiline = {true}
                numberOfLines= {5}
                value={this.state.controls.productDetail.value}
                style={styles.inputField}
                />  
              </Body>
            </CardItem>
            <CardItem footer bordered>
              {updateButton}
            </CardItem>
          </Card>
          </TouchableHighlight>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",  
        width: '100%',
        borderWidth: 2,
        borderColor: '#eee'
    },
    productName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    productDescription: {
        color: '#303030',
        fontSize: 15,
        fontStyle: 'italic',

    },
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdateProduct: (key, productName, productDescription) => dispatch(updateProduct(key, productName, productDescription))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productUpdate);