import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native'
import {connect} from 'react-redux'

import {getUsers, searchUser, stopSearchUser} from '../../store/actions/index'
import UserList from '../../components/UserListModal/UserListModal'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ViewUsersModal extends Component  {

    state ={
        usersLoaded: false ,
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadUsers()
         this.props.onStopSearchUsers()
         //this.props.onSearchUsers('0000000000')
        //console.log('in user', this.props)   
     }

     handleChange = (val) => {
        this.props.onSearchUsers(val);
      } 
 
 
     render() {
          
 
        let users = this.props.users
        console.log('loaded users ', users)
        console.log('testing', this.state.search)
        let sharedUsers = this.props.sharedUsers

        console.log('shared users', sharedUsers)

        let only = []

        let len = sharedUsers.length
        let i = 0

        users = users.filter((item) =>  {
            let count = 0
            return sharedUsers.filter((data)=> {
                console.log(data, item.email)
                let flag = (data != item.email)
                console.log(flag)
                if(flag){
                    // if(data.location != null){
                        
                    //     count ++
                    // }
                    count++
                }
                if(count == len){
                    let temp = only.concat(item)
                    only = temp
                }
                return data.key  == item.key
            })
          })

        console.log('only', only)

        if(sharedUsers.length != 0){
            users = only
        }

        

        let user = this.props.searchUser.trim();
        console.log('search user',user)
        if (user.length > 9 ) {
        users = users.filter(item => item.contactNumber.match(user));
        }
        else{
            users = []
        }

        console.log('loading users', users)
        

        
         return ( 
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <DefaultInput
                        placeholder = 'enter a 10 digit phone number 0712345678'
                        style = {{
                            borderColor: 'black',
                            width: '90%'
                        }}
                        value={this.props.searchUser}
                        onChangeText={this.handleChange}
                    />
                </View>
                <UserList
                     users={users}
                     onItemSelected={this.itemSelectedHandler}
                />
            </ScrollView>
         )
     }
 }
 
 const styles = StyleSheet.create({
     buttonContaier:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
     },
     listContainer: {
 
     },
     searchButton : {
         borderColor: 'purple',
         borderWidth: 3,
         borderRadius: 50,
         padding:20
     },
     searchButtonText:{
         color: 'purple',
         fontWeight: 'bold',
         fontSize: 26
     }
 })
 
 const mapStateToProps = state => {
     return{
         users: state.users.users,
         searchUser: state.users.searchUser,
         email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         onLoadUsers: () => dispatch(getUsers()),
         onSearchUsers: (val) => dispatch(searchUser(val)),
         onStopSearchUsers: () => dispatch(stopSearchUser())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersModal);

//export default ViewUsers;