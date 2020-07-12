import React, {Component}  from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

import ListItem from '../../components/ListItem/ListItem'

import ProductDetails from '../ProductDetails/ProductDetails'

class ViewProduct extends Component  {

    render (){
        return (
            <View>
                <Text>Your products</Text>
                <ListItem/>
                
            </View>    
        )
    }

}

export default ViewProduct;
