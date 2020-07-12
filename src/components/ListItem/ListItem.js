import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Container, Header, DeckSwiper, Text ,Button, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import defaultImage from '../../assets/default.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'



class listItem  extends React.Component {

    placeDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        //this.props.onDeletePlace(this.props.route.params.selectedPlace.key);
        //this.props.navigation.dispatch(popAction);
    }

    render(){
        return(
            <TouchableHighlight>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        
                        <Image
                            //source={props.placeImage}
                            source={defaultImage}
                            style= {styles.placeImage}
                            resizeMode = "cover"
                        />
                        {/* <Text>{props.placeName}</Text> */}
                        <View style={styles.textContainer}>
                            <Text>Testing</Text>
                            <Text note>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facere a non neque quod odit nemo! Eum ullam maxime ducimus, magni nemo excepturi amet dignissimos nihil rem nam dolorem sapiente. 
                            </Text>
                        </View>
                        
                    </View>  
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
            </TouchableHighlight>
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
    placeImage: {
        marginRight: 10,
        height: 100,
        width: '30%'
    },
    textContainer: {
        width: '70%'
    }
});

export default listItem;