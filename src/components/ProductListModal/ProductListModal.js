import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ProductListItemModal from '../ProductListItemModal/ProductListItemModal';

import defaultImage from '../../assets/default.jpg'

const productListModal = (props) => {
    console.log('p',props)
    return (
        <FlatList 
        style={styles.listContainer}
        data= {props.products}
        renderItem={(info) => (
            <ProductListItemModal 
                productName={info.item.name} 
                productImage= {info.item.image}
                productDescription = {info.item.description}
                productKey = {info.item.key}
                productOwner = {info.item.owner}
                productSharedUsers = {info.item.sharedUsers}
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