import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Container, Header, Left, Body, Right, Title, Subtitle , Button, Tab, Tabs, ScrollableTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UtilityBillsView from '../UtilityBillsView/UtilityBillsView';
import UtilityForm from '../../components/UtiltyForm/UtilityForm';
import {connect} from 'react-redux'
import {getUserBills, searchBill, stopSearchBill} from '../../store/actions/index'
import OverDueBills from '../Utility Bills/OverDueBills'
import PaidBills from '../Utility Bills/PaidBills'
import WarningBills from '../Utility Bills/WarningBills'

class UtilityBills extends Component {

  componentDidMount(){
    console.log('loading')
    this.props.onLoadUserBills(this.props.email)
    this.props.onStopSearchBill()
   console.log('in bills', this.props)   
  }

    render(){
        return(
            <Container>
            <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
          <Left>
            <Button transparent>
              <Icon name="money-bill-alt" size={30} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>Utility Bills</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="white" />
            </Button>
          </Right>
        </Header>
                {/* <UtilityBillsView/> */}
                {/* <OverDueBills/> */}
                <Tabs style={styles.header} backgroundColor='#6a3982' renderTabBar={()=> <ScrollableTab tabsContainerStyle={{shadowColor:'#6a3982', borderColor:'#6a3982', backgroundColor:'#6a3982'}}/>}>
            <Tab heading="General" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <UtilityBillsView/>
              </Tab>
              <Tab heading="Paid" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <PaidBills/>
              </Tab>
              <Tab heading="Warning" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <WarningBills/>
              </Tab>
              <Tab heading="OverDue" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <OverDueBills/>
              </Tab>         
            </Tabs>      
            </Container>    
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

//export default UtilityBills;
export default connect(mapStateToProps, mapDispatchToProps)(UtilityBills);
