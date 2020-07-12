import React, {Component} from 'react'
import { Modal,View, Image, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import { StackActions } from '@react-navigation/native'
import MapView from 'react-native-maps';

import {deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component{

    state= {
        focusedLocation:{
            latitude: this.props.route.params.selectedPlace.location.latitude ,
            longitude:this.props.route.params.selectedPlace.location.longitude ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
    }

    placeDeletedHandler = () => {
        
        const popAction = StackActions.pop(1);
        this.props.onDeletePlace(this.props.route.params.selectedPlace.key);
        this.props.navigation.dispatch(popAction);
    }

    render(){
        let marker = null;

        if (this.state.focusedLocation){
            marker = <MapView.Marker coordinate= {this.state.focusedLocation}/>
        }
        return(
        
            <View styles={styles.container}>
                <View>
                    <View style={styles.itemContainer}>
                    <Image source={this.props.route.params.selectedPlace.image} style={styles.placeImage}/> 
                    </View>
                    <View style={styles.itemContainer}>
                        <MapView
                        initialRegion={this.state.focusedLocation}
                        style={styles.map}
                        >
                        {marker}
                        </MapView>
                    </View>
                    <Text style={styles.placeName}>{this.props.route.params.selectedPlace.name} </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteBtton}>
                        <Icon 
                            size= {30}
                            name="ios-trash"
                            color="red"
                            textAlign= "center"
                        />
                        </View>
                    </TouchableOpacity>
                </View>    
            </View>
                  
        )
    }
}

const styles = StyleSheet.create({
    container : {
        margin: 22,
        padding: 20
    },
    placeImage: {
        width: '100%',
        height: 200,
        //margin: 10
    },
    placeName : {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        margin: 10
    },
    deleteBtton: {
        alignItems: 'center'
    },
    itemContainer: {
        alignItems: 'center'
    },
    map:{
        width: '95%',
        height: 250,
        marginTop: 20,
        borderColor : 'black',
        borderWidth: 1

    }
})

const mapDispatchToProps = dispatch => {
    return{
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);