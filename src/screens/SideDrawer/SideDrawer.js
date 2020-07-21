import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {connect} from 'react-redux';
import {authLogout} from '../../store/actions/index'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    SafeAreaView
  } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Home from '../Home/Home';
import Products from '../Home/Products'
import Shops from '../Home/Shops'
import Groups from '../Home/Groups'
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
    const translateX = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
  
    return (
      <DrawerContentScrollView {...rest}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <View>
            <Text>Hello Raven!</Text>
          </View>
          <DrawerItem 
          label="LogOut" 
          onPress={() =>{rest.children(rest)}} 
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
  console.log('user',data.route.params)
  return (
    <Drawer.Navigator initialRouteName="Feed" drawerContent={props => <CustomDrawerContent {...props} >
      {data.onLogOut}
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
        name="Groups"
        component={Groups}
        options={{ 
          drawerLabel: 'Groups',
          drawerIcon: () => <Icon color='white' size={20} name='users' />
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
        component={Products}
        options={{ 
          drawerLabel: 'Products',
          drawerIcon: () => <Icon color='white' size={20} name='shopping-basket' /> 
        }}
        
      />
    </Drawer.Navigator>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      onLogOut: (nav) => dispatch(authLogout(nav))
  }
}


export default connect(null, mapDispatchToProps) (MyDrawer);
