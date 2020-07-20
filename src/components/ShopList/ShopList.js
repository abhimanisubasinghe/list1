import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ShopListItem from '../ShopListItem/ShopListItem';

import defaultImage from '../../assets/default.jpg'

const shopList = (props) => {
    console.log('p',props)
    return (
        <FlatList 
        style={styles.listContainer}
        data= {props.shops}
        renderItem={(info) => (
            <ShopListItem 
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

export default shopList;