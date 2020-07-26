import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Thumbnail, Left, Body, Title, Right, Footer} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {authLogout, getLoggedUser} from '../../store/actions/index'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    SafeAreaView, 
  } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import panda from '../../assets/hello.jpg'
import Home from '../Home/Home';
import Products from '../Home/Products'
import Shops from '../Home/Shops'
import UtilityBills from '../Home/UtilityBills'
import ShoppingList from '../Home/ShoppingList'
import { TouchableOpacity } from 'react-native-gesture-handler';

  function MapIcon() {
    return (
      <Icon 
        size= {30}
        name="home"
        color='white'
    />
    );
}

function HomeLabel() {
  return (
    <Text style={{color:'white'}}>Home</Text>
  );
}

function CustomDrawerContent({ progress, ...rest }) {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(rest.children)
    const translateX = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
  
    return (
      <DrawerContentScrollView {...rest}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <TouchableOpacity style={styles.profileStyle} onPress={toggleModal}>
          <View style={{flexDirection:'row'}}>
          <Thumbnail large source={panda} />
            
            <Text style={styles.profileText}>Hello {rest.children[3]}</Text>
          </View>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.profileModal}>
            <Container>
            <Header span noLeft style={styles.header} androidStatusBarColor='black' backgroundColor='#6a3982'>
                
            <Left/>
            <Body>
              <Title>{rest.children[3]}</Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.content}>
          <Text>Hello!</Text>
            </View>
            <Button color='#6a3982' title="BACK" onPress={toggleModal} />
        </Container>
            
          </View>
        </Modal>
          <DrawerItem 
          label="LogOut" 
          onPress={() =>{rest.children[0](rest)}} 
          icon = {() => <Icon color='white' size={20} name='sign-out-alt' />}
          inactiveTintColor= 'white'
          />
          <DrawerItemList {...rest} />
        </Animated.View>
      </DrawerContentScrollView>
    );
  }

const Drawer = createDrawerNavigator();

function MyDrawer(data) {
  console.log('user',data.route.params.email)
  console.log(data)
  // useEffect(() => {
  //     data.onLogIn(data.route.params.email)
  // })
  
  return (
    <Drawer.Navigator initialRouteName="Feed" drawerContent={props => <CustomDrawerContent {...props} >
      {data.onLogOut}
      {data.email}
      {data.contactNumber}
      {data.userName}
    </CustomDrawerContent>  
      } 
    drawerContentOptions={{
        activeTintColor:'#6a3982',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'white',
        itemStyle: { marginVertical: 5 },
      }}
    drawerStyle={{
    backgroundColor: '#6a3982',
    activeTintColor:'purple',
    activeBackgroundColor: 'purple',
    fontColor: 'white',
    labelColor: 'white',
    contentOptions:{
      labelColor:'white'
    }
    
  }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ 
            drawerLabel:  'Home', 
            activeTintColor:'purple',
            drawerIcon: () => <Icon color='white' size={20} name='home' />,
            color: 'white',
            contentOptions:{
              labelStyle:{
              fontColor: 'white'
            }
            }
            
        }}
        

      />
      <Drawer.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={{ 
          drawerLabel: 'Shopping List',
          drawerIcon: () => <Icon color='white' size={20} name='file' />
       }}
      />
      <Drawer.Screen
        name="UtilityBills"
        component={UtilityBills}
        options={{ 
          drawerLabel: 'Utility Bills',
          drawerIcon: () => <Icon color='white' size={20} name='money-bill-alt' />
       }}
      />
      <Drawer.Screen
        name="Shops"
        component={Shops}
        options={{ 
          drawerLabel: 'Shops' ,
          drawerIcon: () => <Icon color='white' size={20} name='shopping-cart' />
        }}
      />
      <Drawer.Screen
        name="Products"
        //component={Products}
        options={{ 
          drawerLabel: 'Products',
          drawerIcon: () => <Icon color='white' size={20} name='shopping-basket' /> 
        }}
        
      >
        {props => <Products {...props} />}
        </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  profileModal: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '70%',
    //flex: 1,
    justifyContent: 'space-around',
    alignContent: 'flex-start'

  },
  content:{
    flex: 1
  },
  profileText: {
    padding: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    width: '60%',
    //height: 100
  }
})

const mapStateToProps = state => {
  return{
      email: state.users.loggedUserEmail,
      userName: state.users.loggedUserName,
      contactNumber: state.users.loggedUserContactNumber,
      
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogOut: (nav) => dispatch(authLogout(nav)),
      onLogIn: (email) => dispatch(getLoggedUser(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MyDrawer);
