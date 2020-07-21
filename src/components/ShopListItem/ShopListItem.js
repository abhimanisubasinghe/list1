import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image,Dimensions, TouchableOpacity, Text, TextInput, ActivityIndicator,ScrollView, KeyboardAvoidingView } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import Modal from 'react-native-modal';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MapView from 'react-native-maps'

import {deleteShop, updateShop } from '../../store/actions/index'

//import ShopUpdate from '../ShopUpdate/ShopUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'
import PickLocation from '../PickLocation/PickLocation'

class shopListItem  extends React.Component {

    state = {
        modalLocation : false,
        updateModal: false,
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
                value: this.props.shopLocation,
                valid: true
            }
        },
        focusedLocation:{
            latitude: this.props.shopLocation.latitude ,
            longitude:this.props.shopLocation.longitude ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
    }

    shopDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.shopKey)
        this.props.onDeleteShop(this.props.shopKey);
        //this.props.navigation.dispatch(popAction);
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

    modalView = () => {
        //this.reset()
        this.setState(prevState => {
            return {
                modalLocation: prevState.modalLocation ? false : true,
                focusedLocation:{
                    latitude: this.props.shopLocation.latitude ,
                    longitude:this.props.shopLocation.longitude ,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
                },   
            }
        })
    }

    updateModalView = () => {
        // this.locationPicker.changeState(this.props.shopLocation)
        //console.log(this.locationPicker)
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
        //this.shopUpdateHandler()

    }

    updateHandler = () => {
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
        this.shopUpdateHandler()
    }


    shopUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        //console.log(this.props.shopKey)
        const shopName = (this.state.controls.shopName.value?this.state.controls.shopName.value: this.props.shopName )
        const shopDescription = (this.state.controls.shopDetail.value?this.state.controls.shopDetail.value: this.props.shopDescription )
        const shopLocation = (this.state.controls.location.value?this.state.controls.location.value: this.props.shopLocation )
        //console.log(this.props.shopName, this.props.shopDescription, this.props.shopLocation)
        //console.log(shopName, shopDescription, shopLocation)
        this.props.onUpdateShop(this.props.shopKey, shopName, shopDescription, shopLocation);
        this.reset()
        //this.props.shop.navigation.dispatch(popAction);
    }

    reset = () => {
        this.setState({
        modalLocation : false,
        updateModal: false,
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
                value: this.props.shopLocation,
                valid: true
            }
        },
        focusedLocation:{
            latitude: this.props.shopLocation.latitude ,
            longitude:this.props.shopLocation.longitude ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
        })
    }

    componentDidMount(){
        //this.reset()
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
      // console.log(this.state.focusedLocation)

       let marker = null;

        if (this.state.focusedLocation){
            marker = <MapView.Marker coordinate= {this.state.focusedLocation}/>
        }

        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {() => this.updateHandler()}>
                  Update
            </DefaultButton>
        )

        let locationModal = null

       // let updateModal = null

        if(this.state.modalLocation){
            locationModal = <Modal isVisible={this.state.modalLocation}>
                            <TouchableHighlight>
                            <Card collapsable transparent={true} style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <CardItem header bordered style={{backgroundColor: '#6a3982'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}}>{this.props.shopName}</Text>
                            </CardItem>
                            <CardItem header bordered>
                            <Body>
                            <Text style={styles.shopDescription}>{this.props.shopDescription}</Text>                                
                                <MapView
                                initialRegion={this.state.focusedLocation}
                                style={styles.map}
                                >
                                {marker}
                                </MapView>  
                               
                            </Body>
                            </CardItem>
                            <CardItem footer bordered>
                            <View style={{flexDirecttion: 'row',justifyContent:'center', alignItems: 'center'}}>    
                            <DefaultButton color='black' onPress= {this.modalView}>
                                Close
                            </DefaultButton>
                            </View>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
                </Modal>
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
            <KeyboardAvoidingView>
                {locationModal}
                <Modal isVisible={this.state.updateModal}>
                            <TouchableHighlight>
                            <Card collapsable transparent={true} style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <CardItem bordered style={{backgroundColor: '#6a3982'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}} >Updating: </Text>
                                <Text style={styles.shopDescription} style={{color: 'white',fontStyle: 'italic', fontSize: 16,}}>{this.props.shopName}</Text>
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
                                <View style={{width: '100%', alignItems: 'center'}}>
                                <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => this.locationPicker = ref}
                                lat={this.props.shopLocation.latitude}
                                lng={this.props.shopLocation.longitude}
                                loactionChose = {true}
                                />
                                </View>
                            </Body>
                            </CardItem>
                            <CardItem footer bordered>
                            {updateButton}
                            <DefaultButton color='black' onPress= {this.updateModalView}>
                                Close
                            </DefaultButton>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
                </Modal>
        
                
            {/* <TouchableHighlight onPress={() => this.modalView()}>
                 */}
                 <TouchableHighlight>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        {content}
                    </View>  
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => this.modalView()}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="map-marker-alt"
                                color="black"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity> 
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
                        <TouchableOpacity onPress={() => this.updateModalView()}>
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
            </KeyboardAvoidingView>
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
    itemContainer: {
        //alignItems: 'center'
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
    },
    map:{
        width: '100%',
        height: 250,
        marginTop: 20,
        borderColor : 'black',
        borderWidth: 1

    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        searchShop: state.shops.searchShop
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteShop: (key) => dispatch(deleteShop(key)),
        onUpdateShop: (key, shopName, shopDescription, shopLocation) => dispatch(updateShop(key, shopName, shopDescription, shopLocation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(shopListItem);

