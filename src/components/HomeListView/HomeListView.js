import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native'
import {connect} from 'react-redux'

import {getUserLists, searchList, stopSearchList} from '../../store/actions/index'
//import ListList from '../../components/ListListModal/ListListModal'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import ListList from '../HomeListList/ListList'

class HomeListView extends Component  {

    state ={
        listsLoaded: false ,
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadLists(this.props.email)
     }
 
     render() {
          
 
        let lists = this.props.lists
        //console.log('testing', this.state.search)
        console.log('loading lists', lists)
        //lists = [] 
         return ( 
            <ScrollView>
                <View style= {this.state.shopsLoaded ? styles.listContainer : styles.buttonContaier}>
                {lists.length>0? 
                <ListList
                lists={lists}
                onItemSelected={this.itemSelectedHandler}
           />    
            :<View style={styles.empty}>
            <Text style={styles.emptyText}>After you added lists they will appear here</Text>
            </View>
            }
                
                </View>
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
        paddingRight: 200
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
     },
     empty: {
        height: 180,
        justifyContent: 'center'
     },
     emptyText: {
         fontStyle: 'italic'
     }
 })
 
 const mapStateToProps = state => {
     return{
         lists: state.lists.lists,
         searchList: state.lists.searchList,
         email: state.users.loggedUserEmail,
        userName: state.users.loggedUserName,
        contactNumber: state.users.loggedUserContactNumber,
     }
 }
 
 const mapDispatchToProps = dispatch => {
     return {
         onLoadLists: (email) => dispatch(getUserLists(email)),
         onSearchLists: (val) => dispatch(searchList(val)),
         onStopSearchLists: () => dispatch(stopSearchList())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(HomeListView);

//export default ViewLists;