import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, Tab, Tabs, ScrollableTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AddProduct from '../AddProduct/AddProduct';
import ViewProduct from '../ViewProduct/ViewProduct';


class Products extends Component {
    render(){
        return(
            <Container>
            <Header hasTabs style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
              <Left>
                <Button transparent>
                  <Icon name="shopping-bag" size={30} color="white" />
                </Button>
              </Left>
              <Body>
                <Title>Products</Title>
              </Body>
              <Right>
                <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                  <Icon name="bars" size={30} color="white" />
                </Button>
              </Right>
            </Header>
            <Tabs style={styles.header} backgroundColor='#6a3982' renderTabBar={()=> <ScrollableTab style={styles.header} tabsContainerStyle={{shadowColor:'#6a3982', borderColor:'#6a3982', backgroundColor:'#6a3982'}}/>}>
            <Tab heading="View" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <ViewProduct/>
              </Tab>
              <Tab heading="Add" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <AddProduct/>
              </Tab>        
            </Tabs>
          </Container>    
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'purple'
    }
})

export default Products;