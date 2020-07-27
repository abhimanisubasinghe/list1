import React, {Component} from 'react';
import {View, Button,Text, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

import GeoLocation from '@react-native-community/geolocation'
import Alerts from '../Alerts/Alerts'

class PickLocation extends Component{
    
    state= {
        focusedLocation:{
            latitude: this.props.lat?this.props.lat:7.2906 ,
            longitude:this.props.lng?this.props.lng:80.6337 ,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
        },
        locationChose: this.props.loactionChose ? true: false,
        errorAlert: false,
        errorMsg: '',
        successAlert: false,
        successMsg: '',
        infoAlert:false,
        infoMsg: ''
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

    reset = () => {
        this.setState({
            focusedLocation:{
                latitude: 7.2906 ,
                longitude:80.6337 ,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width/ Dimensions.get("window").height * 0.0122
            },
            locationChose: false,
            errorAlert: false,
            errorMsg: '',
            successAlert: false,
            successMsg: '',
            infoAlert:false,
            infoMsg: ''
        })
    }

    // componentDidMount(){
    //     console.log('in pick',this.props)
    //     if(this.props.lat!== null){
    //         const location = {
    //             lat: this.props.lat ,
    //             lng:this.props.lng ,  
    //         }
    //         this.changeState(location)
    //     }
    // }

    // componentDidMount() {
    //     console.log(this.props.loactionChose)
    // }

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
            this.showErrorAlert('Fetching the Position failed,please pick one manually!')
        })
    }

    changeState = (location) => {
        //console.log('clat',this.props.lat)
        const coordsEvent = { 
            nativeEvent: {
                coordinate:{
                    latitude: location.lat,
                    longitude: location.lng
                }
            }
        }
        this.pickLocationHandler(coordsEvent)
    }

    render(){
        //console.log('map',this.props,'lat',this.state.focusedLocation.latitude)
        // if(this.props.lat !== this.state.focusedLocation.latitude && this.props.lat !== ''){
        //     this.changeState()
        // }
        
        let marker = null;

        if (this.state.locationChose){
            marker = <MapView.Marker coordinate= {this.state.focusedLocation}/>
        }

        return(
            <View style={styles.container}>
                <Alerts alert={this.state.successAlert} onHideAlert={() => this.hideSuccessAlert()} type='success' message={this.state.successMsg} title='Success!'/>
                <Alerts alert={this.state.errorAlert} onHideAlert={() => this.hideErrorAlert()} type='error' message={this.state.errorMsg} title='Error!'/>
                <Alerts alert={this.state.infoAlert} onHideAlert={() => this.hideInfoAlert()} type='error' message={this.state.infoMsg} title='Info!'/>
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