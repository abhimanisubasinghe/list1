import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {deleteProduct, updateProduct } from '../../store/actions/index'

import ProductUpdate from '../ProductUpdate/ProductUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class productListItem  extends React.Component {

    state = {
        update : false,
        controls: {
            productName: {
              value: this.props.productName,
              valid: false,
              touched: false,
              validationRules: {
                notEmpty: true
              }

            },
            productDetail: {
                value: this.props.productDescription,
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

    productDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.productKey)
        this.props.onDeleteProduct(this.props.productKey);
        //this.props.navigation.dispatch(popAction);
    }

    productUpdateView = () => {
        this.setState(prevState => {
            return {
                update: prevState.update ? false : true
            }
        })
    }

    productUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.productKey)
        const productName = (this.state.controls.productName.value?this.state.controls.productName.value: this.props.productName )
        const productDescription = (this.state.controls.productDetail.value?this.state.controls.productDetail.value: this.props.productDescription )
        this.props.onUpdateProduct(this.props.productKey, productName, productDescription);
        this.reset()
        //this.props.product.navigation.dispatch(popAction);
    }

    reset = () => {
        this.setState({
            update: false,
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
       // console.log(this.props)
        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {this.productUpdateHandler}>
                  Update
            </DefaultButton>
        )

        if(this.state.update){
            updateItem = <View>
                            <TouchableHighlight>
                            <Card collapsable>
                            <CardItem bordered>
                                <Text style={styles.productName} >Updating: </Text>
                                <Text style={styles.productDescription}>{this.props.productName}</Text>
                            </CardItem>
                            <CardItem bordered>
                            <Body>
                            <DefaultInput
                                placeholder= {this.props.productName}
                                onChangeText= {this.productNameChangedHandler} 
                                value={this.state.controls.productName.value}
                                style={styles.inputField}
                                /> 
                                <DefaultInput
                                placeholder= {this.props.productDescription}
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
        }

        let content = <View style={styles.textContainer}>
                        <Text style={styles.productName}>{this.props.productName}</Text>
                        <Text style={styles.productDescription}>{this.props.productDescription}
                        </Text>
                    </View>
        
        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        return(
            <View>
            <TouchableHighlight>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        
                        <Image
                            source={this.props.productImage}
                            style= {styles.productImage}
                            resizeMode = "cover"
                        />
                        {content}
                    </View>  
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this.productDeletedHandler}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="trash"
                                color="#b33434"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={this.productUpdateView}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="edit"
                                color="#409456"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View> 
            </TouchableHighlight>
            {updateItem}
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",  
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 25,
    },
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: 'row',
        alignItems: 'center'
    },
    productImage: {
        marginRight: 10,
        height: 100,
        width: '30%'
    },
    textContainer: {
        width: '70%'
    },
    buttonView:{
        flexDirection: 'row',
       // justifyContent: 'space-evenly'
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
    button: {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteProduct: (key) => dispatch(deleteProduct(key)),
        onUpdateProduct: (key, productName, productDescription) => dispatch(updateProduct(key, productName, productDescription))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productListItem);