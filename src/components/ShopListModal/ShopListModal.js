import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ShopListItemModal from '../ShopListItemModal/ShopListItemModal';

import defaultImage from '../../assets/default.jpg'

const shopListModal = (props) => {
    console.log('p',props)
    return (
        <FlatList 
        style={styles.listContainer}
        data= {props.shops}
        renderItem={(info) => (
            <ShopListItemModal
                shopName={info.item.name} 
                shopLocation= {info.item.location}
                shopDescription = {info.item.description}
                shopKey = {info.item.key}
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

export default shopListModal;