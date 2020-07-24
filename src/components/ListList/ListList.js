import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import ListListItem from '../ListListItem/ListListItem';

import defaultImage from '../../assets/default.jpg'

const listList = (props) => {
    console.log('p',props)
    return (
        <FlatList 
        style={styles.listContainer}
        data= {props.lists}
        renderItem={(info) => (
            <ListListItem 
                listName={info.item.name} 
                listKey = {info.item.key}
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

export default listList;