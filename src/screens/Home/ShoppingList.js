import React, {Component}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle , Button, Tab, Tabs, ScrollableTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListForm from '../../components/ListForm/ListForm';
import ViewLists from '../ViewLists/ViewLists'

class ShoppingList extends Component {
    render(){
        return(
            <Container>
            <Header style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
          <Left>
            <Button transparent>
              <Icon name="file" size={30} color="white" />
            </Button>
          </Left>
          <Body>
            <Title>ShoppingList</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="bars" size={30} color="white" />
            </Button>
          </Right>
        </Header>
                {/* <ListForm/> */}
                <Tabs backgroundColor='#6a3982' renderTabBar={()=> <ScrollableTab tabsContainerStyle={{shadowColor:'#6a3982', borderColor:'#6a3982', backgroundColor:'#6a3982'}}/>}>
            <Tab heading="View" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <ViewLists />
              </Tab>
              <Tab heading="Add" tabStyle={{backgroundColor: '#6a3982'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#6a3982'}} activeTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                <ListForm/>
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

export default ShoppingList;