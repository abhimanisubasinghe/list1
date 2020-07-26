import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image,Dimensions, TouchableOpacity, Text, TextInput, ActivityIndicator,ScrollView, KeyboardAvoidingView } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body, Left, Right, Button, Title, Separator} from 'native-base';
import Modal from 'react-native-modal';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MapView from 'react-native-maps'

import {deleteList, updateList, clearSelectedUsers } from '../../store/actions/index'

//import ListUpdate from '../ListUpdate/ListUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'
import PickLocation from '../PickLocation/PickLocation'

import ProductItem from '../ListView/ProductItem'
import ShopItem from '../ListView/ShopItem'

import ViewUser from '../../screens/ViewUsers/ViewUsersModal'

class listListItem  extends React.Component {

    state = {
        updateModal: false,
        listModal: false,
        productView: false,
        shopView: false,
        userModal: false,
        sharedUsers: this.props.list.sharedUsers
    }

    shopViewHandler = () =>{
        this.setState(prevState => {
            return {shopView: prevState.shopView ? false: true} 
        })
    }

    productViewHandler = () =>{
        this.setState(prevState => {
            return {productView: prevState.productView ? false: true} 
        })
        console.log(this.state.productView)
    }

    userViewHandler = async() =>{
        let temp = await this.state.sharedUsers.concat(this.props.selectedUsers)
        await this.setState(prevState => {
            return {
                userModal: prevState.userModal ? false: true,
                sharedUsers: temp
            } 
        })
        await console.log('selected',this.state.sharedUsers)
        await this.props.onClearSelectedUsers()
        await console.log('selected', this.state.sharedUsers, 'state', this.props.selectedUsers)
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

    listModalView = () => {
        this.setState(prevState => {
            return{
                listModal: prevState.listModal ? false : true,
                productView: false,
                shopView: false
            }
        })   
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
        console.log('shared with',this.state.sharedUsers)
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

    //   name: listName,
    //       products: products,
    //       shops: shops,
    //       dueDate: dueDate,
    //       owner: userEmail,
    //       sharedUsers: [userEmail],
    //       done: false

        let updateItem = null

        let updateButton = (
            <DefaultButton color='green' onPress= {() => this.updateHandler()}>
                  Update
            </DefaultButton>
        )

        console.log('list',this.props)


        let selectedShopsView = <Text style={styles.empty}>No shops have been assigned </Text>
        
        if(this.props.shops!= undefined && this.props.shops.length>0){
            selectedShopsView = this.props.shops.map((info) => {
                return <ShopItem 
                    shop = {info}
                    shopName={info.name} 
                    shopLocation= {info.location}
                    shopDescription = {info.description}
                    shopKey = {info.key}
                    key = {info.key}
                    onItemPressed = {() => props.onItemSelected(info.key)}
                    onDelete = {() => this.deleteShop(info)}
                />
            })
        }

        let selectedProductView = <Text style={styles.empty}>No products have been added </Text>

        if(this.props.list.products.length>0){
            selectedProductView = this.props.list.products.map((info) => {
                return <ProductItem 
                    product = {info}
                    productName={info.name} 
                    //shopLocation= {info.item.location}
                    productDescription = {info.description}
                    productKey = {info.key}
                    key = {info.key}
                    //onItemPressed = {() => props.onItemSelected(info.item.key)}
                    onDelete = {() => this.deleteProduct(info)}
                    onAdd = {() => this.incrementProduct(info)}
                    onReduce = {() => this.reduceProduct(info)}
                    quantity = {info.quantity}
                />
            })
        }

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        //console.log(today , tomorrow, this.props.dueDate)
        let temp = this.props.list.dueDate
        //console.log(new Date(temp))
        //let bill = null

        const year = new Date(temp).getFullYear()
        const month = new Date(temp).getMonth()
        const date = new Date(temp).getDate()
        
        let content = <View style={styles.textContainer}>
                        <Text style={styles.listName}>{this.props.list.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={styles.listDescription}>{this.props.shops? 'No of shops you have to visit : ' : 'You have not assigned any shops'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.shops? this.props.shops.length : null}
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={styles.listDescription}>{this.props.list.products ? 'No of products you have to buy : ' : 'You have not assigned any products'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.list.products? this.props.list.products.length : null}
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={styles.listDescription}>{this.props.list.dueDate ? 'Buy before : ' : 'You have not assigned a date'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.list.dueDate? year + '/' + month +'/' + date : null}
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={styles.listDescription}>{this.props.list.done != undefined ? 'Status : ' : 'Not recorded'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.list.done != undefined ? this.props.list.done ? 'done': 'have to visit shops' : null}
                        </Text>
                        </View>
                    </View>
        
        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        let listModal = <Modal isVisible={this.state.listModal} style={styles.modal} keyboardShouldPersistTaps='always'>
                        <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                        <Left>
                            <Button transparent>
                            <Icon name="map" size={30} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.props.list.name} </Title>
                        </Body>
                        <Right>
                        <TouchableOpacity>    
                        <Button transparent vertical onPress={this.listModalView}>
                            <Icon name="check-circle" size={30} color="white" />
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize:15}}>Done</Text>
                            </Button>
                        </TouchableOpacity>    
                        </Right>    
                        </Header>
                        <ScrollView>
                        <View style={{flexDirection: 'row', padding: 5}}>
                        <Text style={styles.listDescription}>{this.props.list.dueDate ? 'Buy before : ' : 'You have not assigned a date'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.list.dueDate? year + '/' + month +'/' + date : null}
                        </Text>
                        </View>
                        <View style={{flexDirection: 'row', padding: 5}}>
                        <Text style={styles.listDescription}>{this.props.list.done != undefined ? 'Status : ' : 'Not recorded'}
                        </Text>
                        <Text style={styles.shopDescription}>{this.props.list.done != undefined ? this.props.list.done ? 'done': 'have to visit shops' : null}
                        </Text>
                        </View>
                        <Separator bordered style={styles.separator}>
                        <TouchableOpacity onPress={this.shopViewHandler} style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.separatorHeader}>SHOPS</Text>
                        {/* <Text style={styles.separatorHeaderSub}>No of shops you are visiting: {this.props.shops.length}</Text>*/} 
                        <View style={{flexDirection: 'row', padding: 5, alignContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.separatorHeaderSub}>{this.props.shops? 'No of shops you have to visit : ' : 'You have not assigned any shops'}
                        </Text>
                        <Text style={styles.separatorHeaderSub}>{this.props.shops? this.props.shops.length : null}
                        </Text>
                        </View>   
                        
                        </TouchableOpacity>
                        </Separator>
                        <View style={{width: '100%'}}>
                            {this.state.shopView ? selectedShopsView: null}
                        </View>
                        <Separator bordered style={styles.separator}>
                            <TouchableOpacity onPress={this.productViewHandler} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.separatorHeader}>PRODUCTS</Text>
                            <Text style={styles.separatorHeaderSub}>No of products you added: {this.props.list.products.length}</Text>
                            </TouchableOpacity>
                        </Separator>
                        <View style={{width: '100%'}}>
                            {this.state.productView ? selectedProductView: null}
                        </View>
                        </ScrollView>
                        <DefaultButton  
                        color='green' 
                        onPress={this.listModalView}
                        >
                            Done
                        </DefaultButton>
                    </Modal>

            let userModal = <Modal isVisible={this.state.userModal} style={styles.modal} keyboardShouldPersistTaps='always'>
                <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                <Left>
                    <Button transparent>
                    <Icon name="users" size={30} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title>USERS </Title>
                </Body>
                <Right>
                <TouchableOpacity>    
                <Button transparent vertical onPress={this.userViewHandler}>
                    <Icon name="check-circle" size={30} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize:15}}>Done</Text>
                    </Button>
                </TouchableOpacity>    
                </Right>    
                </Header>
                <ScrollView>
                    <ViewUser sharedUsers = {this.props.list.sharedUsers}/>
                </ScrollView>
                <DefaultButton  
                color='green' 
                onPress={this.userViewHandler}
                >
                    Done
                </DefaultButton>
            </Modal>    

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
                 {listModal}
                 {userModal}
                 <TouchableOpacity onPress={() => this.listModalView()}>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        {content} 
                        <TouchableOpacity onPress={() => this.userViewHandler()}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="share"
                                color="#346da3"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.buttonView}>
                         
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
            </TouchableOpacity>
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
        //backgroundColor: "#eee",
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
    shopDescription: {
        color: '#303030',
        fontSize: 15,
        //fontStyle: 'italic',
        fontWeight: 'bold'
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

    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
        //height: 500,
        padding: 10,
        justifyContent: 'space-between'
      },
      empty:{
        fontStyle: 'italic',
        paddingLeft: 25,
        color: '#aaa'
    },
    separatorHeader:{
        fontWeight: 'bold',
    },
    separatorHeaderSub:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingRight: 5
    },
    separator: {
        padding: 5,
        margin: 5,
        backgroundColor: '#b997e8',
        borderRadius: 15
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        searchList: state.lists.searchList,
        selectedUsers: state.users.selectedUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteList: (key) => dispatch(deleteList(key)),
        onClearSelectedUsers: () => dispatch(clearSelectedUsers()),
        //onUpdateList: (key, listName, listDescription, listLocation) => dispatch(updateList(key, listName, listDescription, listLocation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(listListItem);

