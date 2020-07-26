import React, {Component}  from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, } from 'react-native'
import {connect} from 'react-redux'

import {getUserLists, searchList, stopSearchList, getUsers} from '../../store/actions/index'
import ListList from '../../components/ListList/ListList'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton'

class ViewLists extends Component  {

    state ={
        listsLoaded: false ,
        removeAnimation: new Animated.Value(1),
        listsAnim: new Animated.Value(0),
        search: '',
        all: true,
        warn: false,
        overdue: false,
        done: false
     }
 
     componentDidMount(){
         console.log('loading')
         this.props.onLoadLists(this.props.email)
         this.props.onStopSearchLists()
        console.log('in list', this.props)  
        this.props.onLoadUsers() 
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

    allSelectHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                all: true,
                warn: false,
                overdue: false,
                done: false
            }
        })
    }

    doneSelectHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                all: false,
                warn: false,
                overdue: false,
                done: true
            }
        })
    }

    overDueSelectHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                all: false,
                warn: false,
                overdue: true,
                done: false
            }
        })
    }

    warnSelectHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                all: false,
                warn: true,
                overdue: false,
                done: false
            }
        })
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

        if(this.state.done){
            lists = lists.filter(item => item.done === true)
        }
        else if(this.state.overdue){
            lists = lists.filter(item => {
                let temp = item.dueDate
                return (!item.done && new Date(temp) < new Date())
            })
        }
        else if(this.state.warn){
            lists = lists.filter(item => {
                let temp = item.dueDate
                let tomorrow = new Date()
                tomorrow.setDate(new Date().getDate()+1)
                return (!item.done && new Date(temp) >= new Date() && new Date(temp) <= tomorrow)
              });   
        }
        else{
            lists = lists
        }

        let picker = <View style={styles.pickerContainer}>
            <DefaultButton 
            color={this.state.all? '#3d4fad': 'white'} 
            style={styles.pickerButtonAll}
            onPress={() => this.allSelectHandler()}
            >
                <Text style={{color: this.state.all? 'white': 'black', fontWeight: 'bold'}}>All</Text>
            </DefaultButton> 
            <DefaultButton 
            color={this.state.done? '#168c51': 'white'} 
            style={styles.pickerButtonAll}
            onPress={() => this.doneSelectHandler()}
            >
                <Text style={{color: this.state.done? 'white': 'black',fontWeight: 'bold'}}>Done</Text>
            </DefaultButton>  
            <DefaultButton 
            color={this.state.overdue? '#8c162e': 'white'} 
            style={styles.pickerButtonAll}
            onPress={() => this.overDueSelectHandler()}
            >
                <Text style={{color: this.state.overdue? 'white': 'black',fontWeight: 'bold'}}>OverDue</Text>
            </DefaultButton>  
            <DefaultButton 
            color={this.state.warn? '#ab531d': 'white'} 
            style={styles.pickerButtonAll}
            onPress={() => this.warnSelectHandler()}
            >
                <Text style={{color: this.state.warn? 'white': 'black',fontWeight: 'bold'}}>Warning</Text>
            </DefaultButton>     
            </View>

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
                    {picker}
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
     },
     pickerContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         width: '90%',
         alignContent: 'center',
         alignItems: 'center',
         height: 30
     },
     pickerButtonAll: {
        borderWidth: 2,
        //flex: 1,
        flexDirection: 'row',
        width: Dimensions.get("window").width* 0.22,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        margin: 1,
        //borderColor: '#6a3982'
        //color: this.state.all? 'green': 'green'
        //margin: 5
     },
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
         onStopSearchLists: () => dispatch(stopSearchList()),
         onLoadUsers: () => dispatch(getUsers())
     }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewLists);

//export default ViewLists;