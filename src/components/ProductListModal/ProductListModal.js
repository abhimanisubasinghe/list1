import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ProductListItemModal from '../ProductListItemModal/ProductListItemModal';

import defaultImage from '../../assets/default.jpg'

const productListModal = (props) => {
    let temp = props.products
    return temp.map(
        (info) => {
            return <ProductListItemModal
                        key = {info.key}
                        product = {info}
                        productName={info.name} 
                        productImage= {info.image}
                        productDescription = {info.description}
                        productKey = {info.key}
                        productOwner = {info.owner}
                        productSharedUsers = {info.sharedUsers}
                        //onItemPressed = {() => props.onItemSelected(info.key)}
                    />
        }
    )
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default productListModal;