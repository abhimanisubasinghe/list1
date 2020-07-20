import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

// import {deleteShop, updateShop } from '../../store/actions/index'

import ShopUpdate from '../ShopUpdate/ShopUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class shopListItem  extends React.Component {

    state = {
        update : false,
        controls: {
            shopName: {
              value: this.props.shopName,
              valid: false,
              touched: false,
              validationRules: {
                notEmpty: true
              }

            },
            shopDetail: {
                value: this.props.shopDescription,
                valid: false,
                touched: false,
                validationRules: {
                  notEmpty: true
                }

              },
            location: {
                value: this.props.shopLocations,
            }
        }
    }

    shopDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.shopKey)
        //this.props.onDeleteShop(this.props.shopKey);
        //this.props.navigation.dispatch(popAction);
    }

    shopUpdateView = () => {
        this.setState(prevState => {
            return {
                update: prevState.update ? false : true
            }
        })
    }

    shopUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.shopKey)
        const shopName = (this.state.controls.shopName.value?this.state.controls.shopName.value: this.props.shopName )
        const shopDescription = (this.state.controls.shopDetail.value?this.state.controls.shopDetail.value: this.props.shopDescription )
        //this.props.onUpdateShop(this.props.shopKey, shopName, shopDescription);
        this.reset()
        //this.props.shop.navigation.dispatch(popAction);
    }

    reset = () => {
        this.setState({
            update: false,
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
            }
        })
    }

    componentDidMount(){
        this.reset()
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

    render(){
       // console.log(this.props)
        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {this.shopUpdateHandler}>
                  Update
            </DefaultButton>
        )

        if(this.state.update){
            updateItem = <View>
                            <TouchableHighlight>
                            <Card collapsable>
                            <CardItem bordered>
                                <Text style={styles.shopName} >Updating: </Text>
                                <Text style={styles.shopDescription}>{this.props.shopName}</Text>
                            </CardItem>
                            <CardItem bordered>
                            <Body>
                            <DefaultInput
                                placeholder= {this.props.shopName}
                                onChangeText= {this.shopNameChangedHandler} 
                                value={this.state.controls.shopName.value}
                                style={styles.inputField}
                                /> 
                                <DefaultInput
                                placeholder= {this.props.shopDescription}
                                onChangeText= {this.shopDetailChangedHandler} 
                                multiline = {true}
                                numberOfLines= {5}
                                value={this.state.controls.shopDetail.value}
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
                        <Text style={styles.shopName}>{this.props.shopName}</Text>
                        <Text style={styles.shopDescription}>{this.props.shopDescription}
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
                            source={this.props.shopImage}
                            style= {styles.shopImage}
                            resizeMode = "cover"
                        />
                        {content}
                    </View>  
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this.shopDeletedHandler}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="trash"
                                color="#b33434"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={this.shopUpdateView}>
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
    shopImage: {
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
    shopName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    shopDescription: {
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

// const mapStateToProps = state => {
//     return {
//         isLoading: state.ui.isLoading,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onDeleteShop: (key) => dispatch(deleteShop(key)),
//         onUpdateShop: (key, shopName, shopDescription) => dispatch(updateShop(key, shopName, shopDescription))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(shopListItem);

export default shopListItem;