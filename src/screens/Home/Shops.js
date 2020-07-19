import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, Tab, Tabs, ScrollableTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AddShop from '../AddShop/AddShop'
import ViewShops from '../ViewShops/ViewShops'
import Test from '../AddShop/test'

class Shops extends Component {
    render(){
        return(
            <Container>
            <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
          <Left>
            <Button transparent>
              <Icon name="shopping-cart" size={30} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>Shops</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="white" />
            </Button>
          </Right>
        </Header>
        <Tabs style={styles.header} backgroundColor='#6a3982' renderTabBar={()=> <ScrollableTab style={styles.header} tabsContainerStyle={{shadowColor:'#6a3982', borderColor:'#6a3982', backgroundColor:'#6a3982'}}/>}>
            <Tab heading="View" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <ViewShops/>
              </Tab>
              <Tab heading="Add" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <AddShop/>
              </Tab> 
              <Tab heading="Test" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <Test/>
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

export default Shops;