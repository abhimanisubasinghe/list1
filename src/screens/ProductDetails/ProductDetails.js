import React, {Component} from 'react'
import { Modal,View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Header, DeckSwiper, Button, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import { StackActions } from '@react-navigation/native'
//import MapView from 'react-native-maps';

import defaultImage from '../../assets/default.jpg'

//import {deletePlace } from '../../store/actions/index'

const cards = [
    {
      text: 'Card One',
      name: 'One',
      image: {defaultImage}
    },
  ];

class ProductDetails extends Component{

    placeDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        //this.props.onDeletePlace(this.props.route.params.selectedPlace.key);
        //this.props.navigation.dispatch(popAction);
    }

    render(){
        return(

            <View styles={styles.container}>
                <View>
                    <View style={styles.itemContainer}>
                    <Image 
                    //source={this.props.route.params.selectedPlace.image} 
                    source={defaultImage}
                    style={styles.placeImage}/> 
                    </View>
                    {/* <Text style={styles.placeName}>{this.props.route.params.selectedPlace.name} </Text> */}
                    <Text>Testing </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteBtton}>
                        <Icon 
                            size= {30}
                            name="trash"
                            color="red"
                            textAlign= "center"
                        />
                        </View>
                    </TouchableOpacity>
                </View>   
                <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={defaultImage} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <CardItem cardBody>
              <Image source={defaultImage} style={{height: 200,width: '100%'}}/>
            </CardItem>
              <View style={styles.itemContainer}>
                    <Image 
                    //source={this.props.route.params.selectedPlace.image} 
                    source={defaultImage}
                    style={styles.placeImage}/> 
                    </View>
                <Text>
                    
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

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

// const mapDispatchToProps = dispatch => {
//     return{
//         onDeletePlace: (key) => dispatch(deletePlace(key))
//     }
// }

//export default connect(null, mapDispatchToProps)(ProductDetails);

export default ProductDetails;