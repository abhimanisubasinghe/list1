import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {deleteProduct, updateProduct, selectProducts } from '../../store/actions/index'

import ProductUpdate from '../ProductUpdate/ProductUpdate'
import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class productListItemModal  extends React.Component {

    state = {
        productSelected : false
    }

    selectProductHandler = () => {
        let product = {
            ...this.props.product,
            quantity: 1
        }
        this.props.onSelectProduct(product)
        this.setState({
            productSelected: true
        })
    }


    componentDidMount(){
        //console.log(this.props.productSharedUsers)
    }

    render(){

        let content = <View style={styles.textContainer}>
                        <Text style={styles.productName}>{this.props.productName}</Text>
                        <Text style={styles.productDescription}>{this.props.productDescription}
                        </Text>
                    </View>
        
        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        let selectProduct = null

        if(!this.state.productSelected){
            selectProduct = <TouchableOpacity onPress={() => this.selectProductHandler()}>
                            <View style={styles.button}>
                            <Icon 
                                size= {30}
                                name="plus-circle"
                                color="#346da3"
                                textAlign= "center"
                            />
                            </View>
                        </TouchableOpacity> 
        }

        return(
            <View>
            <TouchableHighlight>
                <View style={styles.container}>
                    <View style={styles.listItem}>
                        
                        <Image
                            source={this.props.productImage}
                            style= {styles.productImage}
                            resizeMode = "cover"
                        />
                        {content}
                        
                    </View>
                    <View style={styles.buttonView}>
                         {selectProduct}
                        </View>  
                </View> 
            </TouchableHighlight>
            </View>
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        searchProduct: state.products.searchProduct,
        selectedProducts: state.products.selectedProducts,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteProduct: (key) => dispatch(deleteProduct(key)),
        onUpdateProduct: (key, productName, productDescription,owner, sharedUsers) => dispatch(updateProduct(key, productName, productDescription, owner, sharedUsers)),
        onSelectProduct: (product) => dispatch(selectProducts(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productListItemModal);