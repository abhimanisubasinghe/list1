import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  Container, Header, Content, Card, CardItem, Body, Left, Right, Button, Title, Separator} from 'native-base';
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import Modal from 'react-native-modal';
import MapView from 'react-native-maps';

class shopItem extends Component{

    state = {
        shopModal : false,
        shopSelected: false,
        modalLocation : false,
        focusedLocation:{
            latitude: this.props.shopLocation!==undefined?this.props.shopLocation.latitude:7.2906  ,
            longitude:this.props.shopLocation!==undefined?this.props.shopLocation.longitude:80.6337 ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
        locationChose: true
    }

    shopViewHandler = () =>{
        this.setState(prevState => {
            return {shopModal: prevState.shopModal ? false: true} 
        })
    }

    modalView = () => {
        //this.reset()
        this.setState(prevState => {
            return {
                modalLocation: prevState.modalLocation ? false : true,
                focusedLocation:{
                    latitude: this.props.shopLocation!==undefined?this.props.shopLocation.latitude:7.2906 ,
                    longitude:this.props.shopLocation!==undefined?this.props.shopLocation.longitude:80.6337 ,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
                },   
            }
        })
    }


    render(){
        console.log(this.props)
        console.log(this.props.shop)
        let shop = this.props.shop

        let marker = null;

        if (this.state.locationChose){
            marker = <MapView.Marker coordinate= {this.state.focusedLocation}/>
        }

        let shopModal = null

        if(this.props.shopLocation!=undefined){
            shopModal = <Modal isVisible={this.state.modalLocation}>
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

        

        return(
            <TouchableOpacity style={styles.shopContainer}>
                {shopModal}
                    <View style={{width:'70%'}}>
                        <Text style={styles.shopContainerText}>{this.props.shopName}</Text>
                    </View>    
                    {this.props.shopLocation!=undefined? 
                    <TouchableOpacity onPress={() => this.modalView()}>
                        <View style={styles.button}>
                        <Icon 
                            size= {28}
                            name="map-marker-alt"
                            color="black"
                            textAlign= "center"
                        />
                        </View>
                    </TouchableOpacity>
                    : null}
                    
                </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
    form: {
        width: '95%',
        //height: 250,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 10,
        paddingLeft: 20,
        flex: 1
    },
    header:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10
    },
    inputStyle: {
        borderColor: 'black',
        width: '95%'
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
        height: '100%',
        padding: 10,
        justifyContent: 'space-between'
      },
    shopContainer: {
        backgroundColor: '#eee',
        height: 50,
        padding: 10,
        paddingLeft: 30,
        margin: 10,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 2,
        paddingLeft: 10,
        paddingRight: 20
    },
    incrementButton: {
        padding: 2,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row'
    },
    shopContainerText: {
        fontWeight: 'bold'
    },
    quantityText:{
        fontStyle: 'italic',
        //color: 'green',
        //fontWeight: 'bold',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: 'center'
    },
    map:{
        width: '100%',
        height: 250,
        marginTop: 20,
        borderColor : 'black',
        borderWidth: 1

    }
})

export default shopItem;