import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import {connect} from 'react-redux'
import {getPlaces} from '../../store/actions/index'
import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlace extends Component {

    state ={
       placesLoaded: false ,
       removeAnimation: new Animated.Value(1),
       placesAnim: new Animated.Value(0)
    }

    componentDidMount(){
        //console.log('loading')
        this.props.onLoadPlaces()
        
    }

    // componentWillUpdate(){
    //     this.props.onLoadPlaces()
    // }

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler();
        });

    }

    itemSelectedHandler = key => {

        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        })

        this.props.navigation.navigate('PlaceDetails',{
            selectedPlace: selectedPlace,
            title: selectedPlace
        })
    }

    render() {
         
        let content = (
            <Animated.View
            style={{
                opacity: this.state.removeAnimation,
                transform:[
                    {
                        scale: this.state.removeAnimation.interpolate({
                            inputRange: [0,1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}
            >
            <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Find Places</Text>
                </View>
            </TouchableOpacity>
            </Animated.View>
        )

        if(this.state.placesLoaded){
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim
                }}>
                    <PlaceList 
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}/>
                </Animated.View>
            )
        }
        
        return ( 
            <View 
            style= {this.state.placesLoaded ? null : styles.buttonContaier}
            >
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContaier:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {

    },
    searchButton : {
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 50,
        padding:20
    },
    searchButtonText:{
        color: 'purple',
        fontWeight: 'bold',
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return{
        places: state.places.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);