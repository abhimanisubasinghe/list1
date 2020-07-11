import React, {Component} from 'react';
import {View, Button,Text, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

import GeoLocation from '@react-native-community/geolocation'

class PickLocation extends Component{
    
    state= {
        focusedLocation:{
            latitude: 7.2906 ,
            longitude:80.6337 ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
        locationChose: false
    }

    reset = () => {
        this.setState({
            focusedLocation:{
                latitude: 7.2906 ,
                longitude:80.6337 ,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
            },
            locationChose: false
        })
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return{
                focusedLocation:{
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChose: true
            }
        })

        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    getLocationHandler = () => {
        GeoLocation.getCurrentPosition(pos => {
            const coordsEvent = { 
                nativeEvent: {
                    coordinate:{
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            //console.log(coordsEvent.nativeEvent.coordinate.latitude)
            this.pickLocationHandler(coordsEvent)
        }, err => {
            console.log(err)
            alert(`Fetching the Position failed,
             please pick one manually!`)
        })
    }

    render(){

        let marker = null;

        if (this.state.locationChose){
            marker = <MapView.Marker coordinate= {this.state.focusedLocation}/>
        }

        return(
            <View style={styles.container}>
                <MapView
                initialRegion={this.state.focusedLocation}
                //region={!this.state.locationChosen ? this.state.focusedLocation : null}
                style={styles.map}
                onPress={this.pickLocationHandler}
                ref={ref => this.map = ref}
                >
                {marker}
                </MapView>
                <View style={styles.button}>
                <Button title='Locate Me' color='black' onPress={this.getLocationHandler}/>
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({  
    container: {
        width: '90%',
        alignItems: 'center'
    },  
    placeholder:{
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: '#eee',
        width: '100%',
        height: 150,
        borderRadius: 15
    },
    button: {
        margin: 8
    },
    map:{
        width: '100%',
        height: 250
    }
})

export default PickLocation; 