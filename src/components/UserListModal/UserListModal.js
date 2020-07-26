import React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';

import UserListItemModal from '../UserListItemModal/UserListItemModal';

import defaultImage from '../../assets/default.jpg'

const userListModal = (props) => {
    let temp = props.users
    return temp.map(
        (info) => {
            return <UserListItemModal
                    key = {info.key}
                    user = {info}
                    userName={info.name} 
                    //userLocation= {info.location}
                    //userDescription = {info.description}
                    userKey = {info.key}
                />
        }
    )
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default userListModal;