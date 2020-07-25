import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, } from 'react-native'
import {connect} from 'react-redux'

import {getUserLists, searchList, stopSearchList} from '../../store/actions/index'
import ListList from '../../components/ListList/ListList'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class ViewLists extends Component  {

    state ={
        listsLoaded: false ,
        removeAnimation: new Animated.Value(1),
        listsAnim: new Animated.Value(0),
        search: ''
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadLists(this.props.email)
         this.props.onStopSearchLists()
        console.log('in list', this.props)   
     }

     handleChange = (val) => {
        this.props.onSearchLists(val);
      } 

 
     listsLoadedHandler = () => {
         Animated.timing(this.state.listsAnim, {
             toValue: 1,
             duration: 500,
             useNativeDriver: true
         }).start();
     }
 
     listsSearchHandler = () => {
         Animated.timing(this.state.removeAnimation, {
             toValue: 0,
             duration: 500,
             useNativeDriver: true
         }).start(() => {
             this.setState({
                 listsLoaded: true
             })
             this.listsLoadedHandler();
         });
 
     }
 
 
     render() {
          
         let content = (
             <Animated.View
             style={{
                 opacity: this.state.removeAnimation,
                 transform:[
                     {
                         scale: this.state.removeAnimation.interpolate({
                             inputRange: [0,1],
                             outputRange: [12, 1]
                         })
                     }
                 ]
             }}
             >
             <TouchableOpacity onPress={this.listsSearchHandler}>
                 <View style={styles.searchButton}>
                     <Text style={styles.searchButtonText}>My Lists</Text>
                 </View>
             </TouchableOpacity>
             </Animated.View>
         )
 
         let lists = this.props.lists
        //console.log('testing', this.state.search)

        let list = this.props.searchList.trim().toLowerCase();
        //console.log('search list',list)
        if (list.length > 0) {
        lists = lists.filter(item => item.name.toLowerCase().match(list));
        }

        //console.log('loading lists', lists)

         if(this.state.listsLoaded){
             content = (
                 <Animated.View style={{
                     opacity: this.state.listsAnim
                 }}>
                     <View style={{alignItems: 'center'}}>
                    <DefaultInput
                        placeholder = 'search'
                        style = {{
                            borderColor: 'black',
                            width: Dimensions.get("window").width* 0.9
                        }}
                        value={this.props.searchList}
                        onChangeText={this.handleChange}
                    />
                    </View>
                     <ListList
                     lists={lists}
                     onItemSelected={this.itemSelectedHandler}
                     />
                 </Animated.View>
             )
         }
         
         return ( 
             <View 
             style= {this.state.listsLoaded ? styles.listContainer : styles.buttonContaier}
             >
                 {content}
             </View>
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
        paddingBottom: 100
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
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewLists);

//export default ViewLists;