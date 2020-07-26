import React from 'react'
import { TouchableHighlight, View,  StyleSheet, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Body} from 'native-base';
import defaultImage from '../../assets/default.jpg'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {deleteUser, updateUser, selectUsers } from '../../store/actions/index'

import DefaultInput from '../UI/DefaultInput/DefaultInput'
import DefaultButton from '../UI/DefaultButton/DefaultButton'
import validate from '../../utils/validation'

class userListItemModal  extends React.Component {

    state = {
        userSelected : false
    }

    selectUserHandler = () => {
        this.props.onSelectUser(this.props.user.email)
        this.setState({
            userSelected: true
        })
    }


    componentDidMount(){
        //console.log(this.props.userSharedUsers)
    }

    render(){

        let content = <View style={styles.textContainer}>
                        <Text style={styles.userName}>{this.props.userName}</Text>
                        {/* <Text style={styles.userDescription}>{this.props.userDescription}
                        </Text> */}
                        <Text style={styles.userDescription}>{this.props.user.email}</Text>
                        <Text style={styles.userDescription}>{this.props.user.contactNumber}</Text>
                    </View>
        
        if(this.props.isLoading){
            content = <ActivityIndicator color='black'/>
        }

        let selectUser = null

        if(!this.state.userSelected){
            selectUser = <TouchableOpacity onPress={() => this.selectUserHandler()}>
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
                        
                        {/* <Image
                            source={this.props.userImage}
                            style= {styles.userImage}
                            resizeMode = "cover"
                        /> */}
                        {content}
                        {selectUser}
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
    userImage: {
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
    userName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'

    },
    userDescription: {
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
        searchUser: state.users.searchUser,
        selectedUsers: state.users.selectedUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDeleteUser: (key) => dispatch(deleteUser(key)),
        onUpdateUser: (key, userName, userDescription,owner, sharedUsers) => dispatch(updateUser(key, userName, userDescription, owner, sharedUsers)),
        onSelectUser: (user) => dispatch(selectUsers(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(userListItemModal);