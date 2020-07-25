import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ShopListItemModal from '../ShopListItemModal/ShopListItemModal';

import defaultImage from '../../assets/default.jpg'

const shopListModal = (props) => {
    let temp = props.shops
    return temp.map(
        (info) => {
            return <ShopListItemModal
                    key = {info.key}
                    shop = {info}
                    shopName={info.name} 
                    shopLocation= {info.location}
                    shopDescription = {info.description}
                    shopKey = {info.key}
                />
        }
    )
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default shopListModal;