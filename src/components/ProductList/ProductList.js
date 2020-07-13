import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ProductListItem from '../ProductListItem/ProductListItem';

import defaultImage from '../../assets/default.jpg'
import ProductDetails from '../../screens/ProductDetails/ProductDetails';

const productList = (props) => {
    console.log('p',props)
    return (
        <FlatList 
        style={styles.listContainer}
        data= {props.products}
        renderItem={(info) => (
            <ProductListItem 
                productName={info.item.name} 
                productImage= {info.item.image}
                productDescription = {info.item.description}
                productKey = {info.item.key}
                onItemPressed = {() => props.onItemSelected(info.item.key)}
            />
        )}
        /> 
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default productList;