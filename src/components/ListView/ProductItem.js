import React, {Component}  from 'react'
import {View, Text, StyleSheet, Platform, TouchableHighlight, ScrollView, TouchableOpacity, Image} from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body, Left, Right, Button, Title, Separator} from 'native-base';
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import defaultImage from '../../assets/default.jpg'

class productItem extends Component{

    state = {
        productModal : false
    }

    productViewHandler = () =>{
        this.setState(prevState => {
            return {productModal: prevState.productModal ? false: true} 
        })
    }

    render(){
        console.log(this.props)
        //console.log(this.props.product.image)
        //let product = this.props.product
        let content = <View style={styles.textContainer}>
                        <Text style={styles.productName}>{this.props.productName}</Text>
                        <Text style={styles.productDescription}>{this.props.productDescription}
                        </Text>
                    </View>

        let productModal = <Modal isVisible={this.state.productModal}>
                            <TouchableHighlight>
                            <Card collapsable transparent={true} style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <CardItem bordered style={{backgroundColor: '#6a3982'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18,}} >Product: </Text>
                                <Text style={styles.listDescription} style={{color: 'white',fontStyle: 'italic', fontSize: 16,}}>{this.props.productName}</Text>
                            </CardItem>
                            <CardItem bordered>
                            <Body>
                            <TouchableHighlight>
                            <View style={styles.container}>
                                <View style={styles.listItem}>
                                    
                                    <Image
                                        source={this.props.product.image!==undefined?this.props.product.image: defaultImage }
                                        style= {styles.productImage}
                                        resizeMode = "cover"
                                    />
                                    {content}
                                </View>  
                            </View> 
                        </TouchableHighlight>
                            </Body>
                            </CardItem>
                            <CardItem footer bordered>
                            <DefaultButton color='black' onPress= {this.productViewHandler}>
                                Close
                            </DefaultButton>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
                    </Modal>
        return(
            
            <TouchableOpacity style={styles.productContainer}>
                {productModal}
                    <View style={{flexDirection: 'row', alignItems: 'center', width:'50%', justifyContent:'space-between', height: '100%'}}>
                        <Text style={styles.productContainerText}>{this.props.productName}</Text>
                        <Text style={styles.quantityText}>{this.props.quantity}</Text>
                    </View>   
                    <View style={{flexDirection: 'row',  width:'20%'}}> 
                    <TouchableOpacity onPress={() => this.productViewHandler()}>
                        <View style={styles.incrementButton}>
                        <Icon 
                            size= {28}
                            name="eye"
                            color="#346da3"
                            textAlign= "center"
                        />
                        
                        </View>
                        
                    </TouchableOpacity>
                    </View>
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
    productContainer: {
        backgroundColor: '#eee',
        //height: 50,
        padding: 10,
        paddingLeft: 30,
        margin: 10,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    button: {
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5
    },
    incrementButton: {
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row'
    },
    productContainerText: {
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
})

export default productItem;