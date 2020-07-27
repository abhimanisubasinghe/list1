import React, {Component}  from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux'
import {getUserBills, searchBill, stopSearchBill} from '../../store/actions/index'
import UtilityListItem from '../HomeUtilityListItem/UtilityListItem'
import { ScrollView } from 'react-native-gesture-handler';

class UtilityBillsView extends Component {

  state ={
    billsLoaded: true ,
  }

  componentDidMount(){
    console.log('loading')
    this.props.onLoadUserBills(this.props.email)
    this.props.onStopSearchBill()
   console.log('in bills', this.props)   
  }

    render(){
      let bills = this.props.bills

      //bills = []
        
      let content = null

        if(this.state.billsLoaded){
          content = (
             <KeyboardAvoidingView>
                 
                 <FlatList 
                  //ListHeaderComponent = {header}
                  style={styles.listContainer}
                  data= {bills}
                  horizontal= {true}
                  renderItem={(info) => (
                
                  <UtilityListItem 
                      billName={info.item.name} 
                      amount= {info.item.amount}
                      dueDate = {info.item.dueDate}
                      billKey = {info.item.key}
                      owner = {info.item.owner}
                      sharedUsers = {info.item.sharedUsers}
                      paid = {info.item.paid}
                  />
                )}
                />
              </KeyboardAvoidingView>    
          )
      }  

        return(
            <View>
                {/* <UtilityForm/>
                <Text> Your Bills </Text> */}
                {bills.length> 0? 
                content
                :
                <View style={styles.empty}> 
                <Text style={styles.emptyText}>After you added utility bills they will appear here</Text>
                </View>  
                }
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    header:{
        color: 'purple'
    },
    listContainer: {
      paddingRight: 250
    },
    empty: {
      height: 150,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
   },
   emptyText: {
       fontStyle: 'italic'
   }
})

const mapStateToProps = state => {
  return{
      bills: state.bills.bills,
      searchBill: state.bills.searchBill,
      email: state.users.loggedUserEmail,
      userName: state.users.loggedUserName,
      contactNumber: state.users.loggedUserContactNumber,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      //onLoadProducts: () => dispatch(getProducts()),
      onSearchBill: (val) => dispatch(searchBill(val)),
      onStopSearchBill: () => dispatch(stopSearchBill()),
      onLoadUserBills: (email) => dispatch(getUserBills(email))
  }
}

//export default UtilityBillsView;
export default connect(mapStateToProps, mapDispatchToProps)(UtilityBillsView);
