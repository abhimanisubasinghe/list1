import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Container, Header, DeckSwiper, Text ,Button, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {deleteProduct } from '../../store/actions/index'

class productListItem  extends React.Component {

    productDeletedHandler = () => {   
        //const popAction = StackActions.pop(1);
        console.log(this.props.productKey)
        this.props.onDeleteProduct(this.props.productKey);
        //this.props.navigation.dispatch(popAction);
    }

    productUpdateHandler = () => {   
        //const popAction = StackActions.pop(1);
        this.props.onDeleteProduct(this.props.productKey);
        //this.props.navigation.dispatch(popAction);
    }

    render(){
       // console.log(this.props)
        return(
            <TouchableHighlight>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        
                        <Image
                            source={this.props.productImage}
                            //source={defaultImage}
                            style= {styles.productImage}
                            resizeMode = "cover"
                        />
                        {/* <Text>{props.productName}</Text> */}
                        <View style={styles.textContainer}>
                            <Text style={styles.productName}>{this.props.productName}</Text>
                            <Text style={styles.productDescription}>{this.props.productDescription}
                            </Text>
                            {/* <Text style={styles.productName}> Hello </Text>
                            <Text style={styles.productDescription}> Hello 123 </Text> */}
                        </View>
                        
                    </View>  
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this.productDeletedHandler}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="trash"
                                color="#b33434"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={this.productUpdateHandler}>
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
    productImage: {
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
    productName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    productDescription: {
        color: '#303030',
        fontSize: 15,
        fontStyle: 'italic',

    },
    button: {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
});

const mapDispatchToProps = dispatch => {
    return{
        onDeleteProduct: (key) => dispatch(deleteProduct(key))
    }
}

export default connect(null, mapDispatchToProps)(productListItem);