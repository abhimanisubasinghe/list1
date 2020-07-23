import React, {Component}  from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UtilityForm from '../../components/UtiltyForm/UtilityForm';
import {connect} from 'react-redux'
import {getUserBills, searchBill, stopSearchBill} from '../../store/actions/index'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import UtilityListItem from '../../components/UtilityListItem/UtilityListItem'
import { ScrollView } from 'react-native-gesture-handler';

class OverDueBills extends Component {

  state ={
    billsLoaded: true ,
    search: ''
  }

  componentDidMount(){
    console.log('loading')
    this.props.onLoadUserBills(this.props.email)
    this.props.onStopSearchBill()
   console.log('in bills', this.props)   
  }

  // componentDidUpdate(){
  //   this.props.onLoadUserBills(this.props.email)
  //   this.props.onStopSearchBill()
  //  console.log('in bills', this.props)   
  // }

  handleChange = (val) => {
    this.props.onSearchBill(val);
  } 
    render(){
      console.log('render ', this.props.bills)
      let bills = this.props.bills

      bills = bills.filter(item => {
        let temp = item.dueDate
        return (!item.paid && new Date(temp) < new Date())
        //item.name.toLowerCase().match(bill)
      });
      let bill = this.props.searchBill.trim().toLowerCase();

      if (bill.length > 0) {
        bills = bills.filter(item => item.name.toLowerCase().match(bill));
        }
       
      let header = (
        <View style={{alignItems: 'center'}}>
        <DefaultInput
            placeholder = 'search'
            style = {{
                borderColor: 'black',
                width: Dimensions.get("window").width* 0.9
            }}
            value={this.props.searchBill}
            onChangeText={this.handleChange}
        />
        </View>  
      )
        
      let content = null

        if(this.state.billsLoaded){
          content = (
             <KeyboardAvoidingView>
                 
                 <FlatList 
                  ListHeaderComponent = {header}
                  style={styles.listContainer}
                  data= {bills}
                  //horizontal= {true}
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
                {content}
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    header:{
        color: 'purple'
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

//export default OverDueBills;
export default connect(mapStateToProps, mapDispatchToProps)(OverDueBills);
