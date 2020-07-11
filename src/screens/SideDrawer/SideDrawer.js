import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>    
          <DrawerItem 
          label="LogOut" 
          onPress={() => alert('Log out')} 
          />
          <MapIcon/>
          </TouchableOpacity>
          </View>
          <DrawerItemList {...rest} />
        </Animated.View>
      </DrawerContentScrollView>
    );
  }

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Feed" drawerContent={props => <CustomDrawerContent {...props} />} 
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
            drawerIcon: props => <MapIcon {... props}/>,
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
        options={{ drawerLabel: 'Groups' }}
      />
      <Drawer.Screen
        name="Shops"
        component={Shops}
        options={{ drawerLabel: 'Shops' }}
      />
      <Drawer.Screen
        name="Products"
        component={Products}
        options={{ drawerLabel: 'Products' }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
