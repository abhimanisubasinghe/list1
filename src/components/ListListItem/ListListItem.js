import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image,Dimensions, TouchableOpacity, Text, TextInput, ActivityIndicator,ScrollView, KeyboardAvoidingView } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import Modal from 'react-native-modal';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MapView from 'react-native-maps'

import {deleteList, updateList } from '../../store/actions/index'

//import ListUpdate from '../ListUpdate/ListUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'
import PickLocation from '../PickLocation/PickLocation'

class listListItem  extends React.Component {

    state = {
        updateModal: false,
    }

    listDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.listKey)
        this.props.onDeleteList(this.props.listKey);
        //this.props.navigation.dispatch(popAction);
    }

    updateModalView = () => {
        // this.locationPicker.changeState(this.props.listLocation)
        //console.log(this.locationPicker)
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
        //this.listUpdateHandler()

    }

    updateHandler = () => {
        this.setState(prevState => {
            return{
                updateModal: prevState.updateModal ? false : true
            }
        })
        this.listUpdateHandler()
    }


    listUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        //console.log(this.props.listKey)
        const listName = (this.state.controls.listName.value?this.state.controls.listName.value: this.props.listName )
        const listDescription = (this.state.controls.listDetail.value?this.state.controls.listDetail.value: this.props.listDescription )
        const listLocation = (this.state.controls.location.value?this.state.controls.location.value: this.props.listLocation )
        //console.log(this.props.listName, this.props.listDescription, this.props.listLocation)
        //console.log(listName, listDescription, listLocation)
        //this.props.onUpdateList(this.props.listKey, listName, listDescription, listLocation);
        this.reset()
        //this.props.list.navigation.dispatch(popAction);
    }

    // reset = () => {
    //     this.setState({
    //     modalLocation : false,
    //     updateModal: false,
    //     controls: {
    //         listName: {
    //           value: this.props.listName,
    //           valid: false,
    //           touched: false,
    //           validationRules: {
    //             notEmpty: true
    //           }

    //         },
            
    //         listDetail: {
    //             value: this.props.listDescription,
    //             valid: false,
    //             touched: false,
    //             validationRules: {
    //               notEmpty: true
    //             }

    //           },
    //         location: {
    //             value: this.props.listLocation,
    //             valid: true
    //         }
    //     },
    //     focusedLocation:{
    //         latitude: this.props.listLocation.latitude ,
    //         longitude:this.props.listLocation.longitude ,
    //         latitudeDelta: 0.0122,
    //         longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
    //     },
    //     })
    // }

    componentDidMount(){
        //this.reset()
    }

    listNameChangedHandler = (val) => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                listName: {
                  ...prevState.controls.listName,
                  value: val,
                  valid: validate(val, prevState.controls.listName.validationRules),
                  touched: true
                }
              }
            };
          });
    }

    listDetailChangedHandler = (val) => {
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                listDetail: {
                  ...prevState.controls.listDetail,
                  value: val,
                  valid: validate(val, prevState.controls.listDetail.validationRules),
                  touched: true
                }
              }
            };
          });
    }

    render(){
      // console.log(this.state.focusedLocation)


        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {() => this.updateHandler()}>
                  Update
            </DefaultButton>
        )
        
        let content = <View style={styles.textContainer}>
                        <Text style={styles.listName}>{this.props.listName}</Text>
                        <Text style={styles.listDescription}>testing
                        </Text>
                    </View>
        
        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        return(
            <KeyboardAvoidingView>
                <Modal isVisible={this.state.updateModal}>
                            <TouchableHighlight>
                            <Card collapsable transparent={true} style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <CardItem bordered style={{backgroundColor: '#6a3982'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}} >Updating: </Text>
                                <Text style={styles.listDescription} style={{color: 'white',fontStyle: 'italic', fontSize: 16,}}>{this.props.listName}</Text>
                            </CardItem>
                            <CardItem bordered>
                            <Body>
                            {/* <DefaultInput
                                placeholder= {this.props.listName}
                                onChangeText= {this.listNameChangedHandler} 
                                value={this.state.controls.listName.value}
                                style={styles.inputField}
                                /> 
                                <DefaultInput
                                placeholder= {this.props.listDescription}
                                onChangeText= {this.listDetailChangedHandler} 
                                multiline = {true}
                                numberOfLines= {5}
                                value={this.state.controls.listDetail.value}
                                style={styles.inputField}
                                /> */}
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
                        <TouchableOpacity onPress={this.listDeletedHandler}>
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
    listImage: {
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
    listName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    listDescription: {
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
        searchList: state.lists.searchList
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteList: (key) => dispatch(deleteList(key)),
        //onUpdateList: (key, listName, listDescription, listLocation) => dispatch(updateList(key, listName, listDescription, listLocation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(listListItem);

